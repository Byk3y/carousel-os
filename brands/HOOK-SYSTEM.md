# Hook System — Instagram Carousel Hooks

This is a shared reference across all brands. When generating carousel content, pick the hook type that best fits the topic. The hook must stop the scroll in under 2 seconds.

## Rules
- Hook headline: 5-8 words max (largest text on slide)
- Must create a curiosity gap — the viewer NEEDS to swipe to get the answer
- Be specific, not vague ("5 tools" not "some tools", "$48k" not "a lot of money")
- Match the hook type to the emotion you want to trigger

---

## Hook Types

### 1. The Question Hook
**Triggers:** Curiosity, self-reflection
**Formula:** `[Provocative question about something they assume they know]?`
**Examples:**
- "Do you really need a college degree in 2026?"
- "Are you using Claude Code wrong?"
- "What do top developers do that you don't?"

**Best for:** Topics where the audience has assumptions you can challenge

---

### 2. The Shocking Stat Hook
**Triggers:** Disbelief, urgency
**Formula:** `[Surprising number/percentage] + [unexpected claim]`
**Examples:**
- "87% of side hustles fail in the first year. Here's the 13% that don't."
- "Instagram is hiding 70% of your posts from followers."
- "90% of AI startups will die by 2027."

**Best for:** Data-driven topics, industry news, trend pieces

---

### 3. The Promise Hook
**Triggers:** Desire, greed
**Formula:** `[Exact outcome] + [timeframe or method]`
**Examples:**
- "How I grew to 100k followers in 6 months without posting reels"
- "The exact morning routine that helped me lose 22 lbs"
- "5 AI tools that will save you 10 hours a week"

**Best for:** How-to content, tool recommendations, personal results

---

### 4. The Mistake/Myth Hook
**Triggers:** Fear, defensiveness
**Formula:** `[Thing they're doing wrong] + [consequence or correction]`
**Examples:**
- "The #1 reason your reels get zero views"
- "You've been using ChatGPT wrong. Here's the fix."
- "Stop doing this if you want your code to be readable"

**Best for:** Educational content, myth-busting, common errors

---

### 5. The List/Step Hook
**Triggers:** Clarity, completeness
**Formula:** `[Number] [things/steps/tools/ways] to [specific outcome]`
**Examples:**
- "7 AI tools replacing junior developers in 2026"
- "5 steps to build your first app with Claude Code"
- "10 Chrome extensions every developer needs"

**Best for:** Listicles, tutorials, tool roundups

---

### 6. The Curiosity/Cliffhanger Hook
**Triggers:** Suspense, FOMO
**Formula:** `[Dramatic setup]... + [incomplete reveal]`
**Examples:**
- "I got fired last week... here's what happened next"
- "Anthropic accidentally leaked their source code"
- "This one line of code crashed our entire production server"

**Best for:** Stories, breaking news, dramatic reveals

---

### 7. The Bold Claim Hook
**Triggers:** Controversy, engagement
**Formula:** `[Controversial or absolute statement]`
**Examples:**
- "College is the biggest scam of 2026"
- "React is dead. Here's what's replacing it."
- "You don't need to learn to code anymore"

**Best for:** Hot takes, opinion pieces, trend predictions

---

### 8. The Transformation Hook
**Triggers:** Aspiration, hope
**Formula:** `[Before state] → [After state] + [how]`
**Examples:**
- "From zero coding experience to full-stack developer in 90 days"
- "How I went from $0 to $10k/month with AI automation"
- "My portfolio before and after learning design systems"

**Best for:** Personal stories, case studies, before/after content

---

## Visual Hook System (Hook Images)

The headline stops a *literate* scroll. The hook image stops the scroll *before* anyone reads. On feed-discovery surfaces (Reels grid, IG explore, TikTok FYP), the image lands first — text gets ~0.4s of attention only if the image earns it.

**A hook image is NOT a literal illustration of the topic.** It is a **visual pun on the most charged keyword in the headline**, executed as a cinematic scene with the brand baked into the composition.

### The Concept Hook Framework

Before writing any image prompt, run this 5-question brainstorm:

1. **What's the most charged keyword in the headline?**
   The noun or verb with the strongest pop-culture / mythological / iconic association. AGENTS, ARMY, BANK, FACTORY, RACE, HEIST, KING, GHOST, EXPLOSION, EMPIRE, PROPHET, GATEKEEPER, etc.

2. **What's the most iconic visual metaphor for that word?**
   Pull from movies, mythology, history, religion, sports, fairy tales. The viewer should recognize it in <1 second.

3. **Where does the brand logo go inside the scene?**
   Big and present, NOT a small corner badge. As the moon, the sun, on a flag, on a banner, projected on a wall, on a uniform, as a wax seal. The brand is part of the composition.

4. **What's the color grade?**
   Match or complement the brand accent. Either accent-dominant (logo as light source) or complementary contrast (e.g. teal/cyan-dominant with orange logo highlights — see the Matrix Agents reference).

5. **What's the "joke moment"?**
   The recognition the viewer gets in 1 second. If you can't articulate it in one sentence — *"Matrix Agents because the post is about Claude managed AGENTS"* — the concept isn't sharp enough. Brainstorm again.

### Visual Metaphor Library (starter — push beyond it)

| Keyword | Iconic visual |
|---|---|
| AGENTS | Matrix Agents, multiplied |
| ARMY / SCALE | Spartan phalanx, Roman legion, Stormtrooper formation |
| BANK / WEALTH | Scrooge McDuck vault, Wall Street trading floor, gold ingots raining |
| EXPLOSION / DISRUPTION | Mushroom cloud, dynamite plunger, shattered glass mid-air |
| RACE / SPEED | Ben Hur chariots, F1 starting grid, marathon at the gun |
| HEIST | Ocean's Eleven crew, vault door cracking, masked figures rappelling |
| KING / EMPIRE | Roman emperor on throne, coronation, iron throne |
| PROPHET / WIZARD | Gandalf, Doctor Strange, oracle with glowing eyes, spellbook |
| WAR | Trench warfare, knight on horseback, smoking battlefield |
| GHOST / DEAD | Day of the Dead, graveyard at dusk, skeleton in business suit |
| PRISONER / TRAPPED | Shawshank cell, ball and chain, gilded cage |
| SCIENTIST | Frankenstein lab, bubbling beakers, mad doctor in white coat |
| GATEKEEPER | Bouncer with clipboard, medieval portcullis, Saint Peter at gates |
| FACTORY / SCALE | Assembly line, smokestack city, steampunk machinery |
| FUTURE | Cyberpunk city, neon Tokyo, holograms floating above palms |
| BIRTH / LAUNCH | Greek goddess emerging from shell, dawn breaking, rocket lift-off |
| GATEKEEPER FALLS | Berlin Wall coming down, Bastille storm, broken throne |
| HUNGER / CHASE | Wolves in the forest, sharks circling, vultures on a branch |

The best hook images come from **pairing two metaphors no one has paired before**.

### Prompt Structure for Gemini 2.5 Flash Image

Always include all six elements, in this order:

1. **Subject + action** — who/what is in frame, what they're doing
   *e.g. "Three men in black suits and dark sunglasses standing in tight formation, lead figure stares directly at camera, slight wind moving coat tails"*

2. **Setting** — where, what time of day, atmosphere
   *e.g. "Empty New York brownstone street at dusk, faint fog rolling between buildings, cinematic depth, more identical figures fading into the background"*

3. **Style references** — film / art / era reference
   *e.g. "Matrix film aesthetic, Wachowski color grade, Roger Deakins lighting, anamorphic lens"*

4. **Brand integration** — where the logo lives in the scene
   *e.g. "Massive orange 12-point burst sun logo filling the upper third of the background like a rising sun behind the figures, the only warm element in the frame"*

5. **Color/mood** — palette and lighting
   *e.g. "Desaturated teal and cyan color grade across the entire image, with the orange logo as the single warm accent, low-key dramatic lighting, rim light on the figures"*

6. **Composition** — frame, angle, headline-safe zone
   *e.g. "Wide cinematic 4:5 frame, low hero angle, bottom third dark and uncluttered for headline overlay, rule of thirds composition, photorealistic"*

### Anti-Patterns (what NOT to generate)

- **Single object on plain background** — "broken padlock on a keyboard," "stack of cash next to a laptop," "magnifying glass on documents"
- **Literal illustration of the topic** — if the headline says "vibe coding," do NOT show "a guy at a laptop"
- **Generic stock-photo aesthetics** — corporate-clean lighting, white backgrounds, smiling faces, hands typing
- **Brand logo missing or tiny** — the logo should be a *compositional element*, not a watermark in the corner
- **No color grade** — flat, washed-out, default lighting
- **Decorative without conceptual meaning** — pretty but says nothing about the topic

### The Test

Before generating, complete this sentence aloud:
> *"This image works because [keyword from the headline] looks like [iconic visual metaphor], with the [brand element] [where in the scene]."*

If you can't, you have a literal illustration, not a hook image. Brainstorm again.

The Matrix Agents / Claude Managed Agents reference is the bar. Until a hook image clears it, it's not done.

---

## Slide Structure (AIDA Framework)

This is a *menu*, not a checklist. Use only the slides your content needs. Padding kills carousels.

| Slide | Role | What It Does | Required? |
|-------|------|-------------|-----------|
| **1** | ATTENTION | Hook headline — stop the scroll | Always |
| **2** | REHOOK | Deepen the curiosity gap — tease the payoff without revealing it. | Optional |
| **3-4** | INTEREST | Name the problem, share sharp data points | Often |
| **5-7** | DESIRE | Steps, proof, methodology, the "how" | Depends |
| **Last-1** | TURNING POINT | The "aha moment" — the single insight that reframes everything. | Optional |
| **Last** | ACTION | CTA — follow, save, share | Always |

### Slide count guidelines
- **Data drops / single insights:** 4-5 slides
- **Save-bait listicles:** 7-9 slides (one per item + hook + CTA)
- **Story / case study:** 6-8 slides (needs narrative arc)
- **News breakdowns:** 5-7 slides
- **Tutorials:** 6-9 slides
- **Hot takes:** 5-7 slides

**The test:** Could you delete a slide without losing meaning? If yes, delete it.

### Rehook (Slide 2)
The rehook exists to convert a scroll-stop into a committed swipe. Don't give value yet — widen the curiosity gap.

**Techniques:**
- Tease the outcome: *"Here's what nobody is talking about."*
- Add stakes: *"This changes everything about how you build apps."*
- Create an open loop: *"But there's a catch..."*

**Rules:**
- 1-2 short lines max
- No lists, no data, no answers yet
- Should feel like a cliffhanger, not a summary
- Optional for short carousels (4 slides or fewer) — jump straight to content

### Turning Point (Second-to-Last Slide)
For carousels with 7+ slides, add a dedicated climax slide before the CTA. This is where the key insight crystallizes — the moment that makes someone hit save.

**Techniques:**
- Reframe the topic: *"So the real question isn't X — it's Y."*
- Deliver the non-obvious conclusion: *"The tools don't matter. The workflow does."*
- Connect back to the hook with a twist

**Rules:**
- Must feel like a payoff, not just another content slide
- One sentence or short paragraph — don't dilute it
- Skip for short listicles or news posts where there's no narrative arc

## Pre-Generation Checklist
- [ ] Does the hook promise something specific?
- [ ] Would YOU stop scrolling for this?
- [ ] Does each slide earn the next swipe?
- [ ] Is there one clear idea per slide?
- [ ] Does the CTA match the content type?
