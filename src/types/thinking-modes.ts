// Thinking Modes — cognitive frameworks applied to LLM system prompts

export type ThinkingMode =
  | 'standard'
  | 'triz'
  | 'lateral'
  | 'systems'
  | 'design'
  | 'first_principles'
  | 'critical'
  | 'divergent'
  | 'convergent'
  | 'bayesian'
  | 'six_hats'
  | 'quantum'
  | 'abductive'
  | 'metacognitive'
  | 'synectics'

export interface ThinkingModeConfig {
  id: ThinkingMode
  icon: string
  color: string
  nameEn: string
  nameRu: string
  shortEn: string
  shortRu: string
  systemPrompt: string
}

export const THINKING_MODES: ThinkingModeConfig[] = [
  {
    id: 'standard',
    icon: 'fa-brain',
    color: 'text-gray-400',
    nameEn: 'Standard',
    nameRu: 'Стандартное',
    shortEn: 'Default reasoning, no special framework applied.',
    shortRu: 'Обычное рассуждение без специального фреймворка.',
    systemPrompt: '',
  },
  {
    id: 'triz',
    icon: 'fa-cogs',
    color: 'text-blue-400',
    nameEn: 'TRIZ',
    nameRu: 'ТРИЗ',
    shortEn: 'Systematic invention: contradictions → inventive principles → ideal result.',
    shortRu: 'Системное изобретательство: противоречия → принципы → идеальный результат.',
    systemPrompt: `Apply TRIZ (Theory of Inventive Problem Solving) to this task.
1. Define the Ideal Final Result (IFR): what would the perfect solution look like?
2. Identify the core contradiction (technical or physical) preventing the IFR.
3. Apply relevant TRIZ inventive principles (segmentation, extraction, local quality, inversion, prior action, prior counteraction, compensation, separation, etc.) to resolve the contradiction.
4. Look for analogous solutions in other fields or nature (substance-field analysis).
5. Present a step-by-step solution that eliminates the contradiction.
Label each TRIZ principle you apply.`,
  },
  {
    id: 'lateral',
    icon: 'fa-random',
    color: 'text-purple-400',
    nameEn: 'Lateral Thinking',
    nameRu: 'Латеральное',
    shortEn: 'Edward de Bono: escape fixed patterns, provoke unexpected connections.',
    shortRu: 'Эдвард де Боно: разрыв шаблонов, неожиданные связи.',
    systemPrompt: `Use Lateral Thinking (Edward de Bono) to approach this problem.
1. Challenge all assumptions — ask "why must it be this way?" for every obvious element.
2. Use random entry: introduce an unrelated concept and force a connection to the problem.
3. Apply Po (provocation): state something deliberately illogical, then ask "what would that lead to?"
4. Generate at least 3 radically different framings of the problem before picking any direction.
5. Prioritize surprising, non-obvious solutions over the conventional answer.
Suspend judgment during generation. Novelty is the goal.`,
  },
  {
    id: 'systems',
    icon: 'fa-sitemap',
    color: 'text-cyan-400',
    nameEn: 'Systems Thinking',
    nameRu: 'Системное',
    shortEn: 'Feedback loops, leverage points, emergent behavior, root causes.',
    shortRu: 'Обратные связи, точки рычага, эмерджентность, первопричины.',
    systemPrompt: `Apply Systems Thinking to this problem.
1. Identify all system components and map their relationships and dependencies.
2. Find reinforcing (amplifying) and balancing (stabilizing) feedback loops.
3. Locate leverage points — where small changes produce large systemic effects.
4. Look for emergent properties: what arises from interactions that no single part produces?
5. Account for time delays and non-linear effects (small causes → large consequences).
6. Address root causes, not symptoms. Trace problems upstream through the causal chain.
Present your analysis as an interconnected whole, not isolated parts.`,
  },
  {
    id: 'design',
    icon: 'fa-drafting-compass',
    color: 'text-pink-400',
    nameEn: 'Design Thinking',
    nameRu: 'Дизайн-мышление',
    shortEn: 'Empathize → Define → Ideate → Prototype → Test (Stanford d.school).',
    shortRu: 'Эмпатия → Определение → Идеация → Прототип → Тест.',
    systemPrompt: `Use Design Thinking (Stanford d.school) for this task.
1. EMPATHIZE: Who are the users or stakeholders? What are their unmet needs, pains, and goals?
2. DEFINE: Write a clear, human-centered problem statement: "[User] needs [need] because [insight]."
3. IDEATE: Brainstorm multiple solutions without judgment. Aim for breadth and diversity.
4. PROTOTYPE: Describe the simplest testable version of the best solution.
5. TEST: Predict failure modes and how you would validate or falsify your solution.
Keep the human perspective central. Optimize for user outcomes, not technical elegance.`,
  },
  {
    id: 'first_principles',
    icon: 'fa-atom',
    color: 'text-green-400',
    nameEn: 'First Principles',
    nameRu: 'Первые принципы',
    shortEn: 'Strip all assumptions. Rebuild from indisputable facts only.',
    shortRu: 'Убрать все допущения. Строить только на неопровержимых фактах.',
    systemPrompt: `Reason from First Principles (Aristotle / Elon Musk approach).
1. State the core question or goal with maximum precision.
2. List every assumption embedded in the problem. Then question each: "Is this actually true, or merely conventional?"
3. Strip away all analogies, conventions, and "how things are done" until only bedrock facts remain.
4. Reason strictly upward from those verified fundamentals, building each step on provably true foundations.
5. Reconstruct the solution from scratch. Reject anything that cannot be derived from first principles.
6. State explicitly what you proved vs. what you assumed.
Do not accept anything at face value. Every claim must be earned from fundamentals.`,
  },
  {
    id: 'critical',
    icon: 'fa-balance-scale',
    color: 'text-yellow-400',
    nameEn: 'Critical Thinking',
    nameRu: 'Критическое',
    shortEn: 'Evidence quality, logical validity, bias detection, calibrated confidence.',
    shortRu: 'Качество доказательств, логика, предвзятость, уверенность.',
    systemPrompt: `Apply rigorous Critical Thinking.
1. Clarify the claim or question precisely. Eliminate ambiguity.
2. Identify all unstated assumptions and premises. Make them explicit.
3. Evaluate the evidence: sources, methodology, sample size, replicability, potential bias.
4. Test for logical fallacies (ad hominem, straw man, false dichotomy, appeal to authority, etc.).
5. Steelman the strongest counterarguments before addressing them.
6. Calibrate your conclusion: what can be firmly established vs. what remains uncertain? Express confidence levels.
Distinguish facts from opinions, correlation from causation, probability from certainty.`,
  },
  {
    id: 'divergent',
    icon: 'fa-lightbulb',
    color: 'text-orange-400',
    nameEn: 'Divergent',
    nameRu: 'Дивергентное',
    shortEn: 'Maximum idea variety. Quantity first, judgment suspended.',
    shortRu: 'Максимум разнообразия идей. Сначала количество, оценка потом.',
    systemPrompt: `Use Divergent Thinking to maximize creative output.
1. Brainstorm freely — quantity over quality. No filtering during generation.
2. Apply SCAMPER: Substitute, Combine, Adapt, Modify/Magnify, Put to other uses, Eliminate, Reverse/Rearrange.
3. Think from radically different perspectives: a child, a scientist, a poet, an alien, an engineer.
4. Explore edge cases, paradoxes, and extremes — often the best insights live there.
5. Generate at least 8 distinct approaches or ideas before evaluating any.
6. Use "Yes, and..." — build on every idea without rejecting.
Suspend all judgment. Novelty and diversity are the only goals at this stage.`,
  },
  {
    id: 'convergent',
    icon: 'fa-compress-arrows-alt',
    color: 'text-red-400',
    nameEn: 'Convergent',
    nameRu: 'Конвергентное',
    shortEn: 'Systematic evaluation → single best answer with clear rationale.',
    shortRu: 'Систематическая оценка → одно лучшее решение с обоснованием.',
    systemPrompt: `Apply Convergent Thinking to reach the optimal solution.
1. Enumerate all candidate solutions or explanations (be exhaustive).
2. Define explicit evaluation criteria: feasibility, impact, cost, risk, speed, scalability.
3. Score each option against every criterion. Build a decision matrix if needed.
4. Eliminate dominated alternatives (options worse than another on all criteria).
5. Select the single best answer and state clearly why it wins on the criteria that matter most.
6. Acknowledge the key assumptions your conclusion rests on.
Be decisive. The goal is one well-supported answer, not a survey of options.`,
  },
  {
    id: 'bayesian',
    icon: 'fa-chart-bar',
    color: 'text-indigo-400',
    nameEn: 'Bayesian',
    nameRu: 'Байесовское',
    shortEn: 'Prior beliefs + evidence → updated probability. Never binary yes/no.',
    shortRu: 'Априорные убеждения + данные → обновлённая вероятность.',
    systemPrompt: `Use Bayesian Reasoning throughout your response.
1. State your prior: "Before seeing the evidence, the probability of X was approximately Y% because..."
2. Identify all relevant evidence and estimate its likelihood ratio (how much more likely is this evidence under hypothesis A vs. hypothesis B?).
3. Update your belief: P(H|E) ∝ P(E|H) × P(H). Show the direction and magnitude of the update.
4. Express conclusions as probability ranges, not binary verdicts. "Given the evidence, the probability is approximately X%."
5. Identify the single piece of evidence that would most shift your posterior.
6. Acknowledge your base rates. Avoid base rate neglect.
Never assert certainties. Always communicate calibrated confidence.`,
  },
  {
    id: 'six_hats',
    icon: 'fa-hat-wizard',
    color: 'text-teal-400',
    nameEn: 'Six Thinking Hats',
    nameRu: 'Шесть шляп',
    shortEn: 'De Bono: six parallel perspectives — facts, emotion, caution, optimism, creativity, process.',
    shortRu: 'Де Боно: шесть перспектив — факты, эмоции, осторожность, оптимизм, творчество, процесс.',
    systemPrompt: `Apply Edward de Bono's Six Thinking Hats. Go through each hat in order, then synthesize.
🤍 WHITE HAT (Facts & Data): What do we know for certain? What information is missing?
🔴 RED HAT (Intuition & Emotion): What is the gut feeling? What emotional reactions does this trigger?
⬛ BLACK HAT (Caution & Risk): What could go wrong? What are the flaws, risks, and weaknesses?
💛 YELLOW HAT (Optimism & Value): What are the benefits? Why could this work? Best-case scenario?
💚 GREEN HAT (Creativity & Alternatives): What creative options exist? New possibilities, lateral moves?
💙 BLUE HAT (Meta & Synthesis): What is the overall conclusion? What process should we follow next?

Label each section with its hat. Close with the BLUE HAT synthesis.`,
  },
  {
    id: 'quantum',
    icon: 'fa-circle-notch',
    color: 'text-violet-400',
    nameEn: 'Quantum Thinking',
    nameRu: 'Квантовое',
    shortEn: 'Superposition of contradictions, observer effects, probability amplitudes.',
    shortRu: 'Суперпозиция противоречий, эффект наблюдателя, вероятностные амплитуды.',
    systemPrompt: `Apply Quantum Thinking — reasoning that embraces superposition and uncertainty.
1. SUPERPOSITION: Hold multiple contradictory hypotheses simultaneously without forcing premature collapse. List them all.
2. ENTANGLEMENT: Identify factors that are deeply coupled — where changing one instantly reshapes another regardless of apparent distance.
3. OBSERVER EFFECT: How does the very act of framing this question change the phenomenon being studied?
4. TUNNELING: Look for solutions that bypass conventional barriers — paths that seem impossible in classical thinking but exist in the full probability space.
5. COMPLEMENTARITY: Some truths are mutually exclusive yet both valid depending on the frame of reference (wave/particle). Name them.
6. COLLAPSE: Only after fully mapping the probability landscape, collapse to a definite answer. Explain what caused the collapse.
Treat ambiguity as rich information, not as a problem to eliminate.`,
  },
  {
    id: 'abductive',
    icon: 'fa-search',
    color: 'text-amber-400',
    nameEn: 'Abductive',
    nameRu: 'Абдуктивное',
    shortEn: 'Inference to the best explanation. Think like a detective.',
    shortRu: 'Вывод к лучшему объяснению. Мыслить как детектив.',
    systemPrompt: `Use Abductive Reasoning — inference to the best explanation.
1. Observe: State the surprising, puzzling, or incomplete facts precisely.
2. Generate hypotheses: List all possible explanations that could produce these observations.
3. Evaluate each hypothesis on: explanatory scope (how much it explains), explanatory power (how well it explains), simplicity (Occam's razor), and prior plausibility.
4. Eliminate hypotheses that require too many auxiliary assumptions.
5. Commit to the hypothesis that best explains the data. State what evidence would falsify it.
6. Clearly separate: what you observed / what you inferred / what you assumed.
Think like Sherlock Holmes: "When you have eliminated the impossible, whatever remains, however improbable, must be the truth."`,
  },
  {
    id: 'metacognitive',
    icon: 'fa-eye',
    color: 'text-slate-400',
    nameEn: 'Metacognitive',
    nameRu: 'Метакогнитивное',
    shortEn: 'Think about your thinking. Audit biases, strategy, and confidence calibration.',
    shortRu: 'Мышление о мышлении. Аудит стратегии, предвзятостей, калибровки.',
    systemPrompt: `Apply Metacognitive Thinking — explicit reasoning about your own reasoning process.
1. MONITOR: What cognitive strategy am I using? Is it appropriate for this type of problem?
2. EVALUATE LIMITS: Where is my knowledge thin or uncertain? What don't I know that I should?
3. BIAS AUDIT: What cognitive biases might distort my reasoning here? (Confirmation bias, anchoring, availability, Dunning-Kruger, etc.)
4. REGULATE: Should I decompose the problem differently? Use a different framework? Slow down?
5. CALIBRATE: How confident should I be in each claim? Assign rough probability ranges.
6. TRANSFER: What analogous problems inform this one? What analogies might mislead?
Make your reasoning process a visible object of scrutiny, not just a means to an end.`,
  },
  {
    id: 'synectics',
    icon: 'fa-link',
    color: 'text-lime-400',
    nameEn: 'Synectics',
    nameRu: 'Синектическое',
    shortEn: 'Solve through analogy: make the strange familiar and the familiar strange.',
    shortRu: 'Решение через аналогию: чужое сделать знакомым, знакомое — чужим.',
    systemPrompt: `Use Synectics (Gordon/Prince) — creative problem-solving through analogy.
1. DIRECT ANALOGY: How does nature or biology solve a structurally similar problem? What technological precedent exists?
2. PERSONAL ANALOGY: Imagine you ARE the object, system, or problem itself. Describe what you experience and need from the inside.
3. SYMBOLIC ANALOGY (Book Title): Compress the problem's essence into a paradoxical two-word title that captures its tension.
4. FANTASY ANALOGY: In a world with no physical or logical constraints, what would the ideal solution be? Describe it vividly.
5. FORCE-FIT: Take each analogy and forcibly connect it back to the actual problem. What mechanism transfers?
6. Extract actionable, concrete insights from the metaphors.
Make strange ideas familiar, and familiar problems strange. The goal is productive surprise.`,
  },
]

export const THINKING_MODE_MAP = new Map<ThinkingMode, ThinkingModeConfig>(
  THINKING_MODES.map(m => [m.id, m])
)

export function getThinkingModePrompt(mode: ThinkingMode): string {
  return THINKING_MODE_MAP.get(mode)?.systemPrompt ?? ''
}

export function applyThinkingMode(
  messages: Array<{ role: string; content: string }>,
  mode: ThinkingMode
): Array<{ role: string; content: string }> {
  const prompt = getThinkingModePrompt(mode)
  if (!prompt) return messages

  const systemIndex = messages.findIndex(m => m.role === 'system')
  if (systemIndex >= 0) {
    return messages.map((m, i) =>
      i === systemIndex
        ? { ...m, content: `${prompt}\n\n${m.content}` }
        : m
    )
  }

  return [{ role: 'system', content: prompt }, ...messages]
}
