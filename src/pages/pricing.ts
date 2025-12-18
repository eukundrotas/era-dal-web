import { head, navbar, footer } from '../components/layout'

export const pricingPage = () => `
<!DOCTYPE html>
<html lang="en">
<head>
  ${head('Pricing', 'Choose the right ERA DAL plan for your needs. Free tier available.')}
</head>
<body class="bg-gray-950 text-white">
  ${navbar()}
  
  <main class="pt-20 min-h-screen">
    <div class="max-w-6xl mx-auto px-4 py-16">
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">
          Simple, <span class="gradient-text">Transparent</span> Pricing
        </h1>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto">
          Start free, scale as you grow. No hidden fees, no surprises.
        </p>
      </div>

      <!-- Toggle -->
      <div class="flex items-center justify-center space-x-4 mb-12">
        <span class="text-gray-400" id="monthly-label">Monthly</span>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" id="billing-toggle" class="sr-only peer" onchange="toggleBilling()">
          <div class="w-14 h-7 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
        <span class="text-gray-400" id="yearly-label">
          Yearly <span class="text-green-400 text-sm ml-1">Save 20%</span>
        </span>
      </div>

      <!-- Pricing Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Free Plan -->
        <div class="glass rounded-2xl p-8 relative">
          <h3 class="text-xl font-semibold mb-2">Free</h3>
          <p class="text-gray-400 text-sm mb-6">Perfect for trying out ERA DAL</p>
          
          <div class="mb-8">
            <span class="text-5xl font-bold">$0</span>
            <span class="text-gray-400">/month</span>
          </div>

          <ul class="space-y-4 mb-8">
            <li class="flex items-center space-x-3">
              <i class="fas fa-check text-green-500"></i>
              <span>100 API calls/month</span>
            </li>
            <li class="flex items-center space-x-3">
              <i class="fas fa-check text-green-500"></i>
              <span>3 models per query</span>
            </li>
            <li class="flex items-center space-x-3">
              <i class="fas fa-check text-green-500"></i>
              <span>Science domain only</span>
            </li>
            <li class="flex items-center space-x-3">
              <i class="fas fa-check text-green-500"></i>
              <span>Basic stability metrics</span>
            </li>
            <li class="flex items-center space-x-3 text-gray-500">
              <i class="fas fa-times"></i>
              <span>No rebuttal rounds</span>
            </li>
            <li class="flex items-center space-x-3 text-gray-500">
              <i class="fas fa-times"></i>
              <span>No priority support</span>
            </li>
          </ul>

          <a href="/playground" class="block w-full text-center glass hover:bg-white/10 py-3 rounded-xl transition">
            Get Started Free
          </a>
        </div>

        <!-- Pro Plan -->
        <div class="glass rounded-2xl p-8 relative border-2 border-blue-500 transform scale-105">
          <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span class="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
              Most Popular
            </span>
          </div>
          
          <h3 class="text-xl font-semibold mb-2">Pro</h3>
          <p class="text-gray-400 text-sm mb-6">For professionals and small teams</p>
          
          <div class="mb-8">
            <span class="text-5xl font-bold" id="pro-price">$49</span>
            <span class="text-gray-400" id="pro-period">/month</span>
          </div>

          <ul class="space-y-4 mb-8">
            <li class="flex items-center space-x-3">
              <i class="fas fa-check text-green-500"></i>
              <span>10,000 API calls/month</span>
            </li>
            <li class="flex items-center space-x-3">
              <i class="fas fa-check text-green-500"></i>
              <span>All 12+ models</span>
            </li>
            <li class="flex items-center space-x-3">
              <i class="fas fa-check text-green-500"></i>
              <span>All 4 domains</span>
            </li>
            <li class="flex items-center space-x-3">
              <i class="fas fa-check text-green-500"></i>
              <span>Full stability analysis</span>
            </li>
            <li class="flex items-center space-x-3">
              <i class="fas fa-check text-green-500"></i>
              <span>Rebuttal rounds</span>
            </li>
            <li class="flex items-center space-x-3">
              <i class="fas fa-check text-green-500"></i>
              <span>Priority support</span>
            </li>
          </ul>

          <a href="/playground" class="block w-full text-center bg-blue-600 hover:bg-blue-700 py-3 rounded-xl transition font-medium">
            Start Pro Trial
          </a>
        </div>

        <!-- Enterprise Plan -->
        <div class="glass rounded-2xl p-8 relative">
          <h3 class="text-xl font-semibold mb-2">Enterprise</h3>
          <p class="text-gray-400 text-sm mb-6">For large organizations</p>
          
          <div class="mb-8">
            <span class="text-5xl font-bold">Custom</span>
          </div>

          <ul class="space-y-4 mb-8">
            <li class="flex items-center space-x-3">
              <i class="fas fa-check text-green-500"></i>
              <span>Unlimited API calls</span>
            </li>
            <li class="flex items-center space-x-3">
              <i class="fas fa-check text-green-500"></i>
              <span>Custom model pools</span>
            </li>
            <li class="flex items-center space-x-3">
              <i class="fas fa-check text-green-500"></i>
              <span>Custom domains</span>
            </li>
            <li class="flex items-center space-x-3">
              <i class="fas fa-check text-green-500"></i>
              <span>Self-hosted option</span>
            </li>
            <li class="flex items-center space-x-3">
              <i class="fas fa-check text-green-500"></i>
              <span>SLA guarantee</span>
            </li>
            <li class="flex items-center space-x-3">
              <i class="fas fa-check text-green-500"></i>
              <span>Dedicated support</span>
            </li>
          </ul>

          <a href="mailto:enterprise@era-dal.com" class="block w-full text-center glass hover:bg-white/10 py-3 rounded-xl transition">
            Contact Sales
          </a>
        </div>
      </div>

      <!-- Features Comparison -->
      <div class="mt-20">
        <h2 class="text-2xl font-bold text-center mb-12">Compare Plans</h2>
        
        <div class="glass rounded-2xl overflow-hidden">
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-800">
                <th class="text-left p-6 text-gray-400">Feature</th>
                <th class="p-6 text-center">Free</th>
                <th class="p-6 text-center bg-blue-500/10">Pro</th>
                <th class="p-6 text-center">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-gray-800">
                <td class="p-6">API Calls / Month</td>
                <td class="p-6 text-center">100</td>
                <td class="p-6 text-center bg-blue-500/10 font-semibold">10,000</td>
                <td class="p-6 text-center">Unlimited</td>
              </tr>
              <tr class="border-b border-gray-800">
                <td class="p-6">Models Available</td>
                <td class="p-6 text-center">3</td>
                <td class="p-6 text-center bg-blue-500/10 font-semibold">12+</td>
                <td class="p-6 text-center">Custom</td>
              </tr>
              <tr class="border-b border-gray-800">
                <td class="p-6">Domains</td>
                <td class="p-6 text-center">1</td>
                <td class="p-6 text-center bg-blue-500/10 font-semibold">4</td>
                <td class="p-6 text-center">Custom</td>
              </tr>
              <tr class="border-b border-gray-800">
                <td class="p-6">Rebuttal Rounds</td>
                <td class="p-6 text-center"><i class="fas fa-times text-red-500"></i></td>
                <td class="p-6 text-center bg-blue-500/10"><i class="fas fa-check text-green-500"></i></td>
                <td class="p-6 text-center"><i class="fas fa-check text-green-500"></i></td>
              </tr>
              <tr class="border-b border-gray-800">
                <td class="p-6">Wilson CI Analysis</td>
                <td class="p-6 text-center">Basic</td>
                <td class="p-6 text-center bg-blue-500/10 font-semibold">Full</td>
                <td class="p-6 text-center">Full + Custom</td>
              </tr>
              <tr class="border-b border-gray-800">
                <td class="p-6">Model Memory</td>
                <td class="p-6 text-center"><i class="fas fa-times text-red-500"></i></td>
                <td class="p-6 text-center bg-blue-500/10"><i class="fas fa-check text-green-500"></i></td>
                <td class="p-6 text-center"><i class="fas fa-check text-green-500"></i></td>
              </tr>
              <tr class="border-b border-gray-800">
                <td class="p-6">API Access</td>
                <td class="p-6 text-center"><i class="fas fa-check text-green-500"></i></td>
                <td class="p-6 text-center bg-blue-500/10"><i class="fas fa-check text-green-500"></i></td>
                <td class="p-6 text-center"><i class="fas fa-check text-green-500"></i></td>
              </tr>
              <tr class="border-b border-gray-800">
                <td class="p-6">Dashboard Access</td>
                <td class="p-6 text-center">Basic</td>
                <td class="p-6 text-center bg-blue-500/10 font-semibold">Full</td>
                <td class="p-6 text-center">Full + Analytics</td>
              </tr>
              <tr class="border-b border-gray-800">
                <td class="p-6">Support</td>
                <td class="p-6 text-center">Community</td>
                <td class="p-6 text-center bg-blue-500/10 font-semibold">Priority Email</td>
                <td class="p-6 text-center">Dedicated</td>
              </tr>
              <tr>
                <td class="p-6">Self-Hosted</td>
                <td class="p-6 text-center"><i class="fas fa-times text-red-500"></i></td>
                <td class="p-6 text-center bg-blue-500/10"><i class="fas fa-times text-red-500"></i></td>
                <td class="p-6 text-center"><i class="fas fa-check text-green-500"></i></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- FAQ -->
      <div class="mt-20">
        <h2 class="text-2xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        
        <div class="max-w-3xl mx-auto space-y-4">
          <div class="glass rounded-xl p-6">
            <button class="flex items-center justify-between w-full text-left" onclick="toggleFaq(this)">
              <span class="font-semibold">What counts as an API call?</span>
              <i class="fas fa-chevron-down transition-transform"></i>
            </button>
            <div class="hidden mt-4 text-gray-400">
              Each query submission counts as one API call, regardless of how many models are used in the ensemble. Running multiple repeats for stability analysis does not increase your API call count.
            </div>
          </div>

          <div class="glass rounded-xl p-6">
            <button class="flex items-center justify-between w-full text-left" onclick="toggleFaq(this)">
              <span class="font-semibold">Can I upgrade or downgrade anytime?</span>
              <i class="fas fa-chevron-down transition-transform"></i>
            </button>
            <div class="hidden mt-4 text-gray-400">
              Yes! You can upgrade or downgrade your plan at any time. When upgrading, you'll be charged the prorated difference. When downgrading, the change takes effect at the next billing cycle.
            </div>
          </div>

          <div class="glass rounded-xl p-6">
            <button class="flex items-center justify-between w-full text-left" onclick="toggleFaq(this)">
              <span class="font-semibold">Do you offer refunds?</span>
              <i class="fas fa-chevron-down transition-transform"></i>
            </button>
            <div class="hidden mt-4 text-gray-400">
              We offer a 14-day money-back guarantee for all paid plans. If you're not satisfied, contact us within 14 days of your purchase for a full refund.
            </div>
          </div>

          <div class="glass rounded-xl p-6">
            <button class="flex items-center justify-between w-full text-left" onclick="toggleFaq(this)">
              <span class="font-semibold">What happens if I exceed my API limit?</span>
              <i class="fas fa-chevron-down transition-transform"></i>
            </button>
            <div class="hidden mt-4 text-gray-400">
              You'll receive a notification at 80% usage. If you exceed your limit, you can either upgrade your plan or purchase additional API calls as needed. We won't cut off your access without warning.
            </div>
          </div>

          <div class="glass rounded-xl p-6">
            <button class="flex items-center justify-between w-full text-left" onclick="toggleFaq(this)">
              <span class="font-semibold">Is my data secure?</span>
              <i class="fas fa-chevron-down transition-transform"></i>
            </button>
            <div class="hidden mt-4 text-gray-400">
              Yes. We use industry-standard encryption for all data in transit and at rest. Your queries are processed through secure APIs and are not stored longer than necessary. Enterprise customers can also opt for self-hosted deployments.
            </div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="mt-20 text-center">
        <h2 class="text-2xl font-bold mb-4">Ready to get started?</h2>
        <p class="text-gray-400 mb-8">Join thousands of professionals making better decisions with ERA DAL.</p>
        <div class="flex items-center justify-center space-x-4">
          <a href="/playground" class="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-medium transition">
            Start Free Trial
          </a>
          <a href="mailto:sales@era-dal.com" class="glass hover:bg-white/10 px-8 py-3 rounded-xl transition">
            Talk to Sales
          </a>
        </div>
      </div>
    </div>
  </main>

  ${footer()}

  <script>
    function toggleBilling() {
      const isYearly = document.getElementById('billing-toggle').checked;
      const proPrice = document.getElementById('pro-price');
      const proPeriod = document.getElementById('pro-period');
      
      if (isYearly) {
        proPrice.textContent = '$39';
        proPeriod.textContent = '/month (billed yearly)';
      } else {
        proPrice.textContent = '$49';
        proPeriod.textContent = '/month';
      }
    }

    function toggleFaq(button) {
      const content = button.nextElementSibling;
      const icon = button.querySelector('i');
      
      content.classList.toggle('hidden');
      icon.style.transform = content.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
    }
  </script>
</body>
</html>
`
