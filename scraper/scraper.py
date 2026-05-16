import asyncio
import re
import json
import csv
import os
import sys
import argparse
from datetime import datetime
from urllib.parse import urljoin, urlparse
from playwright.async_api import async_playwright, BrowserContext, Page

# ──────────────────────────────────────────────
# Patterns
# ──────────────────────────────────────────────

# CIS phone numbers: +7 / 8, various separators
PHONE_REGEX = re.compile(
    r'(?:\+7|8)[\s\-_]?\(?\d{3}\)?[\s\-_]?\d{3}[\s\-_]?\d{2}[\s\-_]?\d{2}'
)

# Keywords for contact sub-pages
CONTACT_KEYWORDS = {
    'ru': ['контакт', 'контакты', 'связь', 'о нас', 'обратная', 'реквизит'],
    'en': ['contact', 'contacts', 'about', 'reach', 'connect', 'get-in-touch'],
}
CONTACT_SLUG_RE = re.compile(
    r'contact|kontakt|contact-us|about|o-nas|svyaz|svyazatsya|rekvizit',
    re.IGNORECASE,
)

# Mobile operator prefixes for RU (79xx)
MOBILE_PREFIXES = {
    '9', '91', '92', '93', '94', '95', '96', '97', '98', '99',
}

EMAIL_REGEX = re.compile(r'[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}')


# ──────────────────────────────────────────────
# Helpers
# ──────────────────────────────────────────────

def normalize_phone(raw: str) -> str | None:
    digits = re.sub(r'\D', '', raw)
    if len(digits) != 11:
        return None
    if digits.startswith('8'):
        digits = '7' + digits[1:]
    if not digits.startswith('7'):
        return None
    return digits


def is_mobile(phone: str) -> bool:
    """True if RU mobile (79xx...). Filters out 800, 495, 812 etc."""
    if not phone.startswith('7'):
        return False
    prefix2 = phone[1:3]
    prefix1 = phone[1:2]
    return prefix1 == '9' or prefix2 in MOBILE_PREFIXES


async def find_contact_url(page: Page, base_url: str) -> str | None:
    """Return URL of contact/about sub-page if found, else None."""
    try:
        links = await page.locator('a[href]').all()
        for link in links[:200]:
            href = await link.get_attribute('href')
            if not href:
                continue
            text = (await link.inner_text()).strip().lower()
            abs_href = urljoin(base_url, href)
            # Only same-domain links
            if urlparse(abs_href).netloc != urlparse(base_url).netloc:
                continue
            if CONTACT_SLUG_RE.search(href) or any(kw in text for kw in CONTACT_KEYWORDS['ru']) or any(kw in text for kw in CONTACT_KEYWORDS['en']):
                return abs_href
    except Exception:
        pass
    return None


async def extract_from_page(page: Page) -> dict:
    """Pull phones and emails from visible text + tel: hrefs."""
    phones: set[str] = set()
    emails: set[str] = set()

    try:
        body_text = await page.locator('body').inner_text()
    except Exception:
        body_text = ''

    # Phones from visible text
    for raw in PHONE_REGEX.findall(body_text):
        norm = normalize_phone(raw)
        if norm:
            phones.add(norm)

    # Phones from tel: href attributes (handles hidden/icon buttons)
    try:
        tel_links = await page.locator("a[href^='tel:']").all()
        for link in tel_links:
            href = await link.get_attribute('href') or ''
            norm = normalize_phone(href.replace('tel:', '').strip())
            if norm:
                phones.add(norm)
    except Exception:
        pass

    # Emails from visible text
    for email in EMAIL_REGEX.findall(body_text):
        emails.add(email.lower())

    return {'phones': phones, 'emails': emails}


# ──────────────────────────────────────────────
# Core scraping function
# ──────────────────────────────────────────────

async def scrape_site(context: BrowserContext, url: str, mobile_only: bool = True) -> dict:
    url = url.strip()
    if not url.startswith('http'):
        url = 'https://' + url

    result = {
        'url': url,
        'phones': [],
        'emails': [],
        'contact_page': None,
        'status': 'ok',
        'error': None,
    }
    page = None

    try:
        print(f'[→] {url}')
        page = await context.new_page()

        # Block images/fonts/media for speed
        await page.route('**/*.{png,jpg,jpeg,gif,webp,svg,ico,woff,woff2,ttf,mp4,mp3}',
                         lambda r: r.abort())

        await page.goto(url, timeout=30_000, wait_until='domcontentloaded')

        data = await extract_from_page(page)
        all_phones: set[str] = data['phones']
        all_emails: set[str] = data['emails']

        # If no phones on main page — look for contact sub-page
        if not all_phones:
            contact_url = await find_contact_url(page, url)
            if contact_url:
                result['contact_page'] = contact_url
                try:
                    await page.goto(contact_url, timeout=20_000, wait_until='domcontentloaded')
                    extra = await extract_from_page(page)
                    all_phones |= extra['phones']
                    all_emails |= extra['emails']
                except Exception:
                    pass

        if mobile_only:
            all_phones = {p for p in all_phones if is_mobile(p)}

        result['phones'] = sorted(all_phones)
        result['emails'] = sorted(all_emails)

    except Exception as e:
        result['status'] = 'error'
        result['error'] = str(e)[:200]
        print(f'  [!] Error: {e}')
    finally:
        if page:
            try:
                await page.close()
            except Exception:
                pass

    found = len(result['phones']) + len(result['emails'])
    print(f'  [✓] phones={len(result["phones"])} emails={len(result["emails"])}' if found else f'  [-] nothing found')
    return result


# ──────────────────────────────────────────────
# Main runner
# ──────────────────────────────────────────────

async def run(
    urls: list[str],
    proxy: dict | None = None,
    concurrency: int = 5,
    mobile_only: bool = True,
    output_csv: str = 'parsed_contacts.csv',
    output_json: str = 'parsed_contacts.json',
):
    results: list[dict] = []

    async with async_playwright() as pw:
        launch_kwargs: dict = {'headless': True}
        if proxy:
            launch_kwargs['proxy'] = proxy

        browser = await pw.chromium.launch(**launch_kwargs)

        context = await browser.new_context(
            user_agent=(
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
                'AppleWebKit/537.36 (KHTML, like Gecko) '
                'Chrome/124.0.0.0 Safari/537.36'
            ),
            locale='ru-RU',
        )

        semaphore = asyncio.Semaphore(concurrency)

        async def worker(url: str):
            async with semaphore:
                r = await scrape_site(context, url, mobile_only=mobile_only)
                results.append(r)

        await asyncio.gather(*[worker(u) for u in urls])
        await browser.close()

    # ── Save CSV ──
    rows: list[dict] = []
    for r in results:
        if r['phones'] or r['emails']:
            for phone in r['phones'] or ['']:
                for email in r['emails'] or ['']:
                    rows.append({
                        'URL': r['url'],
                        'Phone': phone,
                        'Email': email,
                        'ContactPage': r['contact_page'] or '',
                        'Status': r['status'],
                    })
            if not r['phones'] and not r['emails']:
                rows.append({
                    'URL': r['url'], 'Phone': '', 'Email': '',
                    'ContactPage': r['contact_page'] or '', 'Status': r['status'],
                })

    if rows:
        with open(output_csv, 'w', newline='', encoding='utf-8-sig') as f:
            writer = csv.DictWriter(f, fieldnames=['URL', 'Phone', 'Email', 'ContactPage', 'Status'])
            writer.writeheader()
            writer.writerows(rows)
        print(f'\n[✓] CSV saved → {output_csv}  ({len(rows)} rows)')

    # ── Save JSON ──
    with open(output_json, 'w', encoding='utf-8') as f:
        json.dump({
            'scraped_at': datetime.utcnow().isoformat() + 'Z',
            'total_sites': len(results),
            'sites_with_contacts': sum(1 for r in results if r['phones'] or r['emails']),
            'results': results,
        }, f, ensure_ascii=False, indent=2)
    print(f'[✓] JSON saved → {output_json}')

    return results


# ──────────────────────────────────────────────
# CLI entry-point
# ──────────────────────────────────────────────

def build_proxy(proxy_str: str | None) -> dict | None:
    if not proxy_str:
        return None
    # Expected: http://user:pass@host:port  or  http://host:port
    return {'server': proxy_str}


def main():
    parser = argparse.ArgumentParser(description='CIS contact scraper (phones + emails)')
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument('--urls', nargs='+', help='Space-separated list of URLs')
    group.add_argument('--file', help='Text file with one URL per line')
    parser.add_argument('--proxy', default=os.getenv('SCRAPER_PROXY'), help='Proxy URL (or set SCRAPER_PROXY env var)')
    parser.add_argument('--concurrency', type=int, default=5, help='Max parallel tabs (default 5)')
    parser.add_argument('--all-phones', action='store_true', help='Include landlines, not just mobile')
    parser.add_argument('--csv', default='parsed_contacts.csv')
    parser.add_argument('--json', default='parsed_contacts.json')
    args = parser.parse_args()

    if args.file:
        with open(args.file) as f:
            urls = [l.strip() for l in f if l.strip() and not l.startswith('#')]
    else:
        urls = args.urls

    if not urls:
        print('No URLs provided.', file=sys.stderr)
        sys.exit(1)

    proxy = build_proxy(args.proxy)
    asyncio.run(run(
        urls=urls,
        proxy=proxy,
        concurrency=args.concurrency,
        mobile_only=not args.all_phones,
        output_csv=args.csv,
        output_json=args.json,
    ))


if __name__ == '__main__':
    main()
