# Base Power — Growth Product Case Study

Context handoff doc for continuing this work in Claude Code or anywhere else. Captures everything decided so far, plus everything a fresh session needs to keep going. Pair with `base-funnel-demo.html` (the interactive prototype).

---

## 0. TL;DR (read this first)

- **Interview:** 30-min interactive working session at Base Power for a Growth Product role. Audience = SpaceX/Anduril operators. Tony is the candidate.
- **Case prompt:** move "submitted full PII" from **3.5% → 8%** of unique TX visitors.
- **Real leak:** step 3 → step 4 in the funnel — **27,008 qualified visitors → only 7,660 leads. 19,348 dropped at one step.**
- **Thesis (deck opener):** Base is asking permission to install a battery in someone's backyard. That's a high-trust transaction, not a $19/mo subscription. The 3.5% → 8% gap is a **trust gap**, not a UX gap.
- **Framework:** every field gets scored on **recoverability × friction**. The unrecoverable fields (email, name) are at the back of the form; the high-friction one (phone + TCPA) is bundled with them. Fix the order.
- **Plan:** four candidate paths in the demo (A: Email-First, B: Radically Short, C: Smart Defaults, D: Trust-Building). We don't pick a winner in the room — we sequence them by **learning velocity**, not impact.
- **Math:** holding step 1-3 roughly flat and moving qualify→lead from **28% → ~58%** gets us to ~7.7%. That's where 100% of the lift comes from.
- **Resourcing:** 1 PM + 1 designer (PT) + 1-2 FE + a feature flag. First measurable lift in 2 weeks. 8% by week 9.
- **KPI discipline:** north star = lead rate; every metric ties to a customer feeling; quality guardrails (call-book rate, install-qual rate, **cost-per-install**) gate every ship.
- **Centerpiece:** the clickable HTML prototype — switch between Path 0 and A/B/C/D live. That's the working session.

---

## 1. The interview

- **Role:** Growth Product at Base Power Company
- **Format:** 30-min interactive working session with the growth team. Hard stop. Screen-share optional but recommended.
- **Framing from the prompt:** *"Think of it like a strategy meeting you've organized: your role is to lead the conversation and gather input from the group to shape your recommendation."* This is a working session, not a pitch. The deck should have deliberate gaps and discussion prompts.
- **Audience:** SpaceX and ex-Anduril folks. Operators. They will challenge assumptions in real time.
- **Tone preference (Tony):** Plain English, concise, BLUF, no over-complication. Product craft matters but don't be precious about it.

### The four required answers

1. Proposed plan with tactical examples
2. Resourcing and timeline
3. KPIs to evaluate success
4. Prioritization methodology

---

## 2. The case (verbatim from the prompt)

> In the last 30 days, 3.5% of all unique Texas webpage visitors, excluding "awareness" campaign traffic, end up providing their:
> - Full address, First/last name, Email, Phone, Home ownership, Home energy setup
>
> **Prompt:** Outline a strategy + execution plan to move this number from 3.5% to 8%.

### The funnel (from the prompt screenshot)

| Step | Description | Persons | % of pageviews | Drop-off |
|------|-------------|---------|----------------|----------|
| 1 | Pageview | 220,440 | 100% | — |
| 2 | User submits address | 34,668 | 15.73% | 84.27% |
| 3 | Address qualifies (sees sign-up form) | 27,008 | 12.25% | 22.10% from prev |
| 4 | **Finishes typeform, sees schedule call** | **7,660** | **3.47%** | **71.64% from prev** |
| 5 | Books sales call | 3,992 | 1.81% | 47.88% from prev |

**The 3.5% target = step 4** (lead with all PII captured). Goal: move to 8%.

**The big leak: step 3 → step 4.** 27,008 qualify but only 7,660 finish. **19,348 qualified visitors lost at one step.** Average time to convert at this step is 18m 13s — a smell.

---

## 3. Tony's POV / context

- PM at heart, joining a deeply operational company. Wants to lean into PM craft to differentiate.
- **Walked through Base's actual signup flow personally.** Has firsthand context on every screen.
- **Wants to demo, not just present.** Building a clickable prototype that shows current state vs. several candidate redesigns is the centerpiece of the working session.
- Believes in talking to the audience like adults — direct, focused, get to the point.

---

## 4. The thesis (deck opener)

> **Base isn't selling a $19/mo subscription. Base is asking permission to install a battery in a customer's backyard. That's a high-trust transaction. High-trust transactions are won by holding the customer's hand at every step.**
>
> The 3.5% → 8% gap is a trust gap, not a UX gap.

This frame elevates the work from "form optimization" to "trust architecture" and positions the candidate as customer-first in a room full of operators.

---

## 5. The diagnosis (Base's existing flow)

After address is submitted, the user sees 7+ qualifying screens before lead capture:

1. Available in your area! → own/rent
2. Main reason for considering Base
3. *Educational interstitial* — "Here's how Base works…"
4. How do you get electricity today?
5. Home energy setup (multi-select)
6. *Educational interstitial* — "Perfect, Base is a great place to start"
7. **Lead capture: name, phone (TCPA disclosure), email** ← 3.5% threshold
8. Video page: "What to expect with Base Power"
9. Photo review or talk to advisor

### Specific friction points observed

- **Address at front, name at back** — the two least-recoverable fields are at opposite ends of the form. If the user bails at step 5, Base has no way to reach them.
- **Phone is required** with heavy TCPA legalese as the visible top of the contact-info screen. Highest-friction ask, asked at the worst moment.
- **Two text-heavy educational interstitials** in the middle of the flow.
- **Numbered step chips communicate nothing** — user has no sense of how long this takes.
- **"Last step — save your progress"** copy is misleading; you can't actually save progress.
- **Mid-flow YouTube video** typically tanks completion.
- **Desktop-feeling layout** in a flow that's mostly mobile traffic.

---

## 6. The framework: recoverability × friction

For every field Base asks for, score it on two dimensions:

- **Recoverability** — if the user bails, can we get this another way?
- **Friction** — how much does asking it cost in drop-off?

```
                     LOW FRICTION                HIGH FRICTION
                ┌─────────────────────────┬────────────────────────┐
   LOW          │  ASK FIRST              │  ASK LATER             │
   RECOVERABLE  │  (you can never get     │  (after commitment,    │
                │   this back)            │   after value shown)   │
                ├─────────────────────────┼────────────────────────┤
   HIGH         │  DEFER / OPTIONAL       │  SKIP or POST-PURCHASE │
   RECOVERABLE  │  (ask later, or in      │  (rarely worth asking  │
                │   nurture, or auto-fill)│   in-flow)             │
                └─────────────────────────┴────────────────────────┘
```

### Base's fields plotted

| Field | Recoverable? | Friction | Quadrant | Where it is today |
|-------|--------------|----------|----------|-------------------|
| Address | No | Low | **Ask first** | ✅ Step 0 (correct) |
| Email | No | Low | **Ask first** | ❌ Step 5 |
| First/Last name | Hard | Very low | **Ask first** | ❌ Step 5 |
| Phone | No | **High** (TCPA, calls) | **Ask later** | ⚠️ Step 5 (too early) |
| Own/Rent | Verifiable | Low | Ask first (hard DQ) | ✅ Step 1 |
| Reason for Base | Easy via email | Low | Defer / optional | Step 2 (could move) |
| Electricity provider | Auto-fill from address | Med | Defer / auto-fill | Step 3 |
| Energy setup | Verified in photo review | Med | Defer / post-lead | Step 4 |

**Diagnosis writes itself:** the unrecoverable fields are scattered across the form. The high-friction one (phone) is bundled with the easy ones. Meanwhile we're spending steps 2-4 on things we could verify later or auto-fill.

---

## 7. The four candidate paths

We don't pick a winner in the room. We propose 4 paths, walk through each in the demo, and **sequence them by learning velocity.**

### Path A — Email-First (the recoverability bet)

- **Change:** After "Available in your area!", capture email immediately ("Where should we send your custom plan?"). Phone deferred until the schedule-a-call moment.
- **What we learn:** Does asking for low-friction PII upfront cost us anything? If no, we unlock the recovery channel for every bailer.
- **Risk:** Low.
- **Expected impact:** Qualify→lead 28% → ~50%, plus 5–10% of bailers recovered via email.

### Path B — Radically Short (the floor test)

- **Change:** Skip qualification entirely in-flow. Address → contact info → done. All qualification moves to sales call, email nurture, or photo review.
- **What we learn:** Do we actually need qualification before a human touches the lead?
- **Risk:** Medium-high. Needs strict quality guardrails (call-book and install-qual rate).
- **Expected impact:** Qualify→lead 28% → 65%+. But sales-call book may dip. TBD.

### Path C — Smart Defaults (the data play)

- **Change:** Use address to auto-fill what we can (utility provider lookup). Combine remaining soft questions onto one icon-based screen.
- **What we learn:** How much can smart auto-fill replace explicit asks?
- **Risk:** Low.
- **Expected impact:** Qualify→lead 28% → ~45%. Conservative but defensible.

### Path D — Trust-Building (the polish bet)

- **Change:** Zero structural changes. Same fields, same order. Add: real progress bar, "what happens next" preview, local social proof, collapsed TCPA, friendlier microcopy, mobile-first spacing.
- **What we learn:** Is the friction structural or emotional? If D moves the needle, the rebuild is less urgent. If it doesn't, we know we have to rebuild.
- **Risk:** Very low.
- **Expected impact:** Qualify→lead 28% → ~35%. Modest but ships in days.

### Quick comparison

| Path | Steps | Risk | Tests | Ship time |
|------|-------|------|-------|-----------|
| D — Trust-Building | 9 (same) | Very low | Friction emotional? | 1 week |
| A — Email-First | 7 | Low | Friction tolerance + recovery | 2-3 weeks |
| C — Smart Defaults | 6 | Low | Data needs of sales | 3 weeks |
| B — Radically Short | 4 | Medium-high | Floor on qualification | 4 weeks (with guardrails) |

---

## 8. The math

| Step | Today | Target | How |
|------|-------|--------|-----|
| Pageview → Address | 15.73% | 17% | Wave 1 polish (small) |
| Address → Qualify | 77.9% | 78% | Mostly geographic, no change |
| Qualify → Lead | 28.4% | **~58%** | Wave 2 progressive capture (the big lever) |
| **Pageview → Lead** | **3.47%** | **~7.7%** | Math works |

**100% of the heavy lifting comes from the qualify → lead step.** Honesty matters here: this is where the leak is, this is where we'll fix it, and short-form completion benchmarks (40-60%) plus removing the highest-friction ask (phone) plus recovery upside make ~58% defensible.

**Defensibility one-liner if pushed:** "We're not promising magic. Short-form completion benchmarks sit at 40–60%. We're cutting the form in half, deferring the highest-friction ask (phone), and adding an email recovery channel. ~58% is the middle of that band, not the ceiling."

---

## 9. Sequencing — by learning velocity, not just impact

We execute all four paths. Order matters because each test informs the next.

- **Wave 1 (Wks 1-2):** Path D ships. Lowest risk, fastest read. Quick polish wins while we build the rebuild.
- **Wave 2 (Wks 3-5):** Path A ships. The recoverability bet — unlocks the recovery channel for every future test.
- **Wave 3 (Wks 6-8):** Path B in low-volume A/B. The radical bet, with strict guardrails on call-book and install-qual rate.
- **Wave 4 (Wks 9-12):** Path C smart defaults; recovery flows; persona variants.

Every test has: hypothesis, expected learning, quality guardrail, kill criteria.

---

## 10. Resourcing — lean strike team

> *We don't need a growth team. We need a 3-person strike team and a feature flag.*

- 1 PM (you), 1 designer (part-time), 1-2 FE engineers
- Feature flag system (build minimal one if not present)
- AI-accelerated dev cycle
- 2-week sprints, ship behind flag, 50/50 A/B, quality guardrails always on

**Headline:** first measurable lift in 2 weeks. 8% by week 9.

---

## 11. KPIs — customer-centric

The differentiator: every metric ties to a customer feeling. If it doesn't, we don't optimize for it.

| What the customer feels | Leading signal we measure | Business outcome |
|-------------------------|---------------------------|------------------|
| "I don't know what Base even is" | Bounce rate; time before address submit; scroll depth | Submit-address rate ↑ |
| "I'm not ready to give my phone yet" | Drop-off at phone field specifically | Lead capture rate ↑ |
| "How much longer is this going to take?" | Step time + back-button clicks + return-visit rate | Form completion ↑ |
| "I had to leave but I'd come back" | Email-only lead count; recovery email CTR/conv | Recovered leads → install |
| "I'm overwhelmed by all this info" | Engagement with educational interstitials; rage clicks | Mid-funnel completion ↑ |
| "I want to feel safe with this company" | Deposit-step abandonment; refund rate; downstream NPS | Install completion ↑ |

### North star + quality guardrails (with thresholds)

- **North star:** Lead rate (3.5% → 8%)
- **Hard guardrails — kill the test if any breach:**
  - Sales-call book rate drops > **10% relative** vs. control
  - Install-qualification rate (after photo review) drops > **5% absolute**
  - Install-completion rate drops at all (zero tolerance — this is the revenue floor)
  - Cost-per-install rises > **5%** vs. control
- **Soft watch (investigate, don't auto-kill):** downstream NPS, refund rate, deposit-step abandonment.
- **Discipline:** **cost-per-install, not cost-per-lead** — we don't game the metric. Cheaper leads that don't install are worse than fewer better leads.

---

## 12. Prioritization methodology

- **Primary:** the recoverability × friction matrix, applied to every field.
- **Secondary:** ICE scoring for experiments (Impact × Confidence × Ease).
- **Discipline:** every experiment has a quality guardrail. We don't ship if downstream call-book or install-qual rate degrades.
- **Tiebreaker:** leak size — fix the biggest hole first.

---

## 13. Deck outline — 10 slides, BLUF titles + speaking notes

Each slide has a BLUF title (the title is the takeaway), the visual content, and a 30-second narration to actually say.

| # | Title (BLUF) | Visual / content | 30-sec narration |
|---|--------------|------------------|------------------|
| 1 | *"Base sells trust, not power. The funnel doesn't reflect that yet."* | Thesis card, photo of a battery being installed | "Before we look at numbers — Base isn't selling a subscription. You're asking permission to bolt hardware onto someone's house. That's a trust transaction. Read the funnel through that lens and the answer changes." |
| 2 | *"We lose 19,000 qualified visitors a month at one step."* | Funnel waterfall, step 3→4 highlighted in red | "I want to focus you on one number. 27k people qualify each month. 7.6k convert. Nineteen thousand qualified humans walk out the door at the same step. That's the case." |
| 3 | *"Two questions for every field: can we recover it, and does it cost us conversion?"* | The 2×2, fields plotted | "I'm using one framework. For every field on the form — how recoverable is it, and how much friction does it add. Once you plot Base's fields, the answer is obvious: you're asking the unrecoverable stuff last and the highest-friction stuff at the worst moment." |
| 4 | *"We don't pick the answer in this room. We test four paths and learn from each."* | Four-card grid of A/B/C/D, one sentence each | "I don't think one of you should walk out of this room with the answer. I don't either. So I built four. Each one tests a different hypothesis." |
| 5 | *"[Live] Path 0 today, then A, B, C, D."* | Open the prototype, switch paths live | DEMO. Switch paths from the topbar. Walk Path 0 first (the gauntlet), then A (recoverability), then B (the floor), then C (data play), then D (just the polish). Solicit reactions between paths. |
| 6 | *"Ship them in an order that compounds learning, not just impact."* | Wave 1-4 timeline, each with hypothesis + guardrail + kill criteria | "We don't ship the highest-impact one first. We ship the one that teaches us the most for the least risk first, because every test informs the next. D first, A second, B third under guardrails, C last." |
| 7 | *"3.5% → 8% means moving one step from 28% to 58%. That's it."* | Math waterfall | "I want to be honest about the math. 100% of the lift comes from one step. Short-form completion benchmarks sit at 40–60%. Cut the form in half, defer phone, add a recovery channel — 58% is the middle of that band." |
| 8 | *"3 people, 9 weeks, feature flags. We don't need a growth team."* | Strike team org chart, sprint cadence, week 2 / week 9 milestones | "This doesn't need a growth org. It needs a PM, a designer, two engineers, and a feature flag. First lift in 2 weeks. 8% by week 9." |
| 9 | *"Every metric ties to a customer feeling. If it doesn't, we don't optimize for it."* | Customer-feeling table + north star + guardrails | "One discipline: every metric I'd track is something a real customer is feeling. Cost-per-install is the guardrail, not cost-per-lead — we don't game the metric." |
| 10 | *"Here's what I'd want from the team to make this real."* | Open questions list | OPEN — turn it back to them. Lead-quality floor? Install capacity ceiling? Source-level conversion data? Existing experimentation infra? Mobile traffic share? |

---

## 14. The demo — `base-funnel-demo.html`

Self-contained HTML file. No build step. Drop in any browser.

### Structure

- Top bar: 5 path buttons (0 / A / B / C / D)
- Center: phone-frame mockup of the active path
- Right side panel: tag, title, what's different, what we learn, current step
- "Restart path" button
- Tap green button in phone to advance, `‹` to go back

### Path step counts (gut check on simplification)

| Path | Screens to lead capture |
|------|--------------------------|
| 0 — Today | 8 (then 3 more after) |
| A — Email-First | 7 (email captured at step 2) |
| B — Radically Short | 2 (then a confirmation) |
| C — Smart Defaults | 5 |
| D — Trust-Building | 7 (same fields, more polish) |

### Screen-by-screen reference

So a future session doesn't have to re-read 1000 lines of JS. Each path's screens, in order:

**Path 0 — Today (baseline, 11 screens incl. confirmation)**
1. Homepage (hero + address box)
2. Own/rent
3. Reason for Base
4. Interstitial: "Here's how Base works"
5. Electricity provider today
6. Energy setup (multi-select)
7. Interstitial: "Perfect — Base is a great place to start"
8. **Lead capture** (name, phone w/ TCPA, email) ← the 3.5% threshold
9. YouTube video — "What to expect with Base Power"
10. Schedule choice (photo review vs. advisor)
11. Confirmation

**Path A — Email-First (9 screens incl. confirmation)**
1. Homepage
2. Qualify + email ("Where should we send your custom plan?")
3. Own/rent
4. Combined: reason + electricity provider on one screen
5. Energy setup (icon-pick, optional, skip-able)
6. Name only
7. Pricing preview ⚠️ functional lead-capture moment (email + name + address all captured)
8. Phone capture ("best number to text" — TCPA collapsed)
9. Confirmation

**Path B — Radically Short (3 screens incl. confirmation)**
1. Homepage
2. One-screen capture: name + email + phone (text-only framing, TCPA collapsed)
3. Confirmation + plan teaser

**Path C — Smart Defaults (7 screens incl. confirmation)**
1. Homepage
2. Qualify + email
3. Own/rent (only hard DQ)
4. Smart-defaults screen ("we filled what we could" — provider auto-detected, plan type pre-set, plus one icon-pick)
5. Name + plan preview
6. Phone-for-text (schedule call)
7. Confirmation

**Path D — Trust-Building (8 screens incl. confirmation)**
1. Homepage
2. Own/rent (with neighbor chip + "what's next" preview)
3. Reason
4. Electricity provider
5. Energy setup
6. **Save your progress** (same fields as Path 0 — name + email + phone, but reframed as "save your progress so you can come back" with TCPA collapsed)
7. Schedule choice
8. Confirmation

### Open questions on the demo (not yet decided)

1. Path A's "Where should we send your custom plan?" framing — value-receiving vs. transactional?
2. Path B's single contact-info screen — feels too aggressive, or actually what an operator audience prefers?
3. Path C's "we filled what we could" auto-fill chip — magic moment or gimmicky?
4. Path D vs. Path 0 — is the polish materially different visually?

---

## 15. Anticipated objections + responses

This is an operator-heavy room. Pre-bake answers to the obvious pushback.

| Objection | One-line response |
|-----------|-------------------|
| *"You're going to flood sales with low-quality leads."* | That's why install-qual rate is a hard guardrail and Path B ships at low traffic share with a kill switch. We measure cost-per-install, not cost-per-lead. |
| *"58% qualify→lead is a huge jump. Why should I believe it?"* | Short-form completion benchmarks sit 40–60%. Cutting form length, removing the phone field, and adding email recovery puts us in the middle of the band — not the top. |
| *"We need that qualifying data to price plans / route to the right rep."* | Most of it can be inferred (provider from address) or confirmed in the photo-review step. Path C tests exactly this. If sales says they need it in-flow, that's a Path C kill signal. |
| *"Phone is required for TCPA / regulated outreach."* | We're not removing phone — we're moving it. Phone gets captured at the schedule-call moment, which is when it's actually needed. |
| *"Why four paths instead of just shipping the best one?"* | Because we don't know which is best. Each path tests a different hypothesis. Sequencing them compounds learning. |
| *"Email-first feels like a dark pattern."* | The framing is "where should we send your custom plan" — value-receiving, not commitment-extracting. We measure the bear case (ToFu drop) directly. |
| *"What if our problem is traffic quality, not the funnel?"* | Then Wave 1 (D) won't move the needle and we'll know in 2 weeks. The plan diagnoses that for free. |
| *"Do you actually need a PM for this? Just have an engineer ship it."* | Engineers can ship variants. The PM job is sequencing, guardrails, kill criteria, and saying no to the eight other things this team will want to test. |
| *"Why aren't you running a heatmap / session replay first?"* | Already know where the leak is — step 3→4. Replay confirms what we know; it doesn't change the plan. We can run it in parallel with Wave 1. |

---

## 16. Discussion prompts for the working session

Deliberate gaps in the deck. Questions to throw to the room and actually listen.

1. *"Which of the four paths makes you most uncomfortable, and why?"* — surfaces the operating constraints they're carrying that I don't see.
2. *"What's your install-capacity ceiling per week? If we double leads, can ops keep up?"* — separates a funnel problem from a downstream constraint.
3. *"What's the lead-quality floor below which sales would push back?"* — turns Path B's guardrail from a guess into a number.
4. *"Is there a field on this form that you actually use to prioritize follow-up? Which one?"* — tells us what we can defer vs. what's load-bearing.
5. *"Have you tested any of this before? What killed it?"* — past-experiment scar tissue is the highest-signal thing they own.
6. *"If you had to defend the 18-minute-13-second average time on the qualifying step, what would you say?"* — invites them to either confirm the smell or tell me something I'm missing.
7. *"Where's the rest of the leakage you care about — the 3.5% → 1.8% step (lead → call) or post-install retention?"* — checks whether this is even the right battle to pick.

---

## 17. Data we'd ask Base for ahead of the meeting

If we get a chance to send a list before the session, this is the ask:

- **Mobile vs. desktop split** of the funnel (we're assuming mobile-heavy; need confirmation).
- **Source-level breakdown** of the 3.5% — paid search vs. paid social vs. organic vs. referral. (A funnel that's broken on paid social may not be broken on organic.)
- **Step-time distribution** at the qualifying step (we have the average — what's p50/p90?).
- **Existing experimentation infrastructure** — feature flags, A/B framework, event taxonomy.
- **Sales-call book rate by lead source / persona** — to know what variance is normal before declaring a guardrail breach.
- **Install-qualification rate** post-photo-review (how often does a lead actually become installable).
- **Cost-per-install today** (the real north star).
- **Any past experiments on this funnel** + their results, especially anything that died.

---

## 18. What's explicitly NOT in scope

Stated upfront so we don't get nerd-sniped in the room.

- **Awareness / top-of-funnel marketing.** The prompt excludes awareness traffic.
- **The pageview → address-submit step** beyond Wave 1 polish. It's a homepage problem, not a funnel problem. Different team, different bet.
- **Lead → sales-call book rate.** Real, but downstream of where this case lives. We watch it as a guardrail, we don't optimize it here.
- **Pricing, plan structure, deposit amount, financing.** Not the brief.
- **Brand redesign.** Not the brief, and Path D shows you can move the needle without it.
- **A "redesign the whole site" recommendation.** That's the wrong scope for a 9-week, 3-person plan.

---

## 19. What's still open

- Refine the four paths' specific copy and transitions (Tony said: refine as we get into details)
- Build the actual deck (PPTX or Slides)
- Decide if all four paths stay as-is or if we collapse / add a fifth based on more thinking
- Lock the math: validate ~58% qualify→lead is achievable based on real benchmarks for short-form completion
- Identify what data we'd actually want from Base before the meeting (see §17 — first pass done)
- Write the actual 30-sec narrations into speaker notes in the deck file (first pass in §13)

---

## 20. Suggested next moves in Claude Code

1. **Iterate on the demo** — refine copy, polish visuals, maybe split into separate JS modules per path
2. **Draft the deck** — start with PPTX or a tool of your choice; the 10-slide outline + narrations in §13 is the spine
3. **Sharpen the speaking notes** — §13 is a first pass; tighten each to what Tony would actually say out loud
4. **Pressure-test the framework** — try to break recoverability × friction; what if Base genuinely needs energy-setup info before pricing?
5. **Prep for objections** — §15 is the first list; rehearse the 2-3 most likely ones until they're reflex
6. **Send the data ask** (§17) to Base if there's a pre-meeting channel

---

*Generated during a working session with Claude in Cowork mode. All assumptions, math, and recommendations are starting points — pressure-test before the interview.*
