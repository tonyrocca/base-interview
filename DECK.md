# Deck — Base Power Growth PM

**8 slides · 30 min.** Wireframes are the spine. Two live-demo stops. One recommended fix; two compounding experiments after it.

**Three experiments + Control:**
- **Control** (today, 9 steps) — baseline
- **Reorder** (Path A, 7 steps) — the recommendation
- **Cut Overhead** (Path B, 6 steps) — compounds on Reorder
- **Auto-fill Provider** (Path C, 5 steps) — compounds on Cut Overhead

> Pair with [`CONTEXT.md`](./CONTEXT.md) (full strategy) and the live demo at `/onboarding`.

---

## 1. Thesis

**Title:** *"Every step in a funnel must earn its place. Today's funnel has tax."*

**Sub:** *Especially when you're asking permission to install hardware in someone's backyard.*

**Visual:** One photo — a Base battery installed on a real Texas home (`/img/outsidehome.avif`).

**Say (30s):** A funnel is sacred. Every step has to do work — qualify, capture, build trust, set up the next interaction. If a step doesn't *change a downstream action*, it's tax on the customer and on the business. Base sells trust, and trust transactions can't tolerate tax. So the question for every step is the same: **what is this step for, and what would it cost us to remove it?**

---

## 2. The leak

**Title:** *"19,000 qualified visitors lost at one step. Every month."*

**Visual:** Funnel waterfall — five bars descending. The drop between step 3 and step 4 in red.

```
Pageview         Address         Qualify         Lead capture     Sales call
220,440  ──▶    34,668   ──▶    27,008   ──▶    7,660    ──▶    3,992
100%             15.7%           12.3%           3.5%             1.8%
                                          ↓
                                     🔴 71% drop
                                  19,348 humans gone
```

**Say:** Twenty-seven thousand qualify. Seven-point-six thousand finish. Same step, every month. **That's the entire case.**

---

## 3. Today's funnel — graded ruthlessly

**Title:** *"Earns its place ✓ · earns it at the wrong time ⚠️ · doesn't earn it ❌"*

**Visual: a 9-box wireframe of today's flow, left-to-right.** Each box has 4 lines: STEP, ASKED, PURPOSE, **GRADE**. The grade is the headline of this slide.

```
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│  1       │  │  2       │  │  3       │  │  4       │  │  5       │  │  6       │  │  7       │  │  8       │  │  9       │
│ ADDRESS  │─▶│ OWN/RENT │─▶│  REASON  │─▶│ INTRSTL  │─▶│ PROVIDER │─▶│  SETUP   │─▶│ INTRSTL  │─▶│   LEAD   │─▶│ VIDEO +  │
│          │  │          │  │          │  │  (text)  │  │          │  │          │  │  (text)  │  │ CAPTURE  │  │ SCHEDULE │
│          │  │          │  │          │  │          │  │          │  │          │  │          │  │          │  │          │
│ Address  │  │ Own/rent │  │ Why Base │  │   none   │  │ Utility  │  │ Solar /  │  │   none   │  │ Name +   │  │  Photo   │
│          │  │          │  │          │  │          │  │          │  │ gen etc  │  │          │  │ Phone +  │  │ review   │
│          │  │          │  │          │  │          │  │          │  │          │  │          │  │ Email +  │  │ choice   │
│          │  │          │  │          │  │          │  │          │  │          │  │          │  │  TCPA    │  │          │
│ Verify   │  │  Hard    │  │ Segment  │  │ "Educate"│  │  Verify  │  │ Compat   │  │ "Educate"│  │ Capture  │  │ Schedule │
│ deliv-   │  │   DQ     │  │  user    │  │          │  │ provider │  │  check   │  │          │  │ contact  │  │  consult │
│ erable   │  │          │  │          │  │          │  │          │  │          │  │          │  │          │  │          │
│          │  │          │  │          │  │          │  │          │  │          │  │          │  │          │  │          │
│   ✓      │  │    ✓     │  │   ⚠️    │  │    ❌    │  │    ⚠️   │  │    ⚠️   │  │    ❌    │  │ ⚠️🔴    │  │    ❌   │
│  earns   │  │  earns   │  │  recov-  │  │   fluff  │  │  could   │  │  could   │  │   fluff  │  │  earns,  │  │  fluff  │
│  place   │  │  place   │  │  erable  │  │          │  │  auto-   │  │  defer   │  │          │  │  but at  │  │ +video  │
│          │  │          │  │  via    │  │          │  │  fill    │  │  to photo│  │          │  │  worst   │  │  kills  │
│          │  │          │  │  email   │  │          │  │          │  │  review  │  │          │  │  moment  │  │  comp.  │
└──────────┘  └──────────┘  └──────────┘  └──────────┘  └──────────┘  └──────────┘  └──────────┘  └──────────┘  └──────────┘
                                                                                                       🔴
                                                                                                  71% drop here
                                                                                                  19,000 / mo
```

**The grades, said out loud:**
- **9 steps. Only 2 fully earn their place.** Address (1) and own/rent (2) — both required, both unrecoverable, both early.
- **2 steps shouldn't exist** — the educational interstitials. Their job is to reassure the customer mid-flow, but reassurance is a *reaction* to friction, not a fix for it. Cut the friction, you don't need the interstitial.
- **1 step (the video) is actively hostile** — a YouTube embed in the middle of a form is a known completion-killer. It exists to set expectations, but expectations get set by the *experience*, not a video about the experience.
- **The lead-capture step (8) earns its purpose but at the worst possible moment** — name + phone + email + TCPA bundled together, after 7 questions. The unrecoverable fields are at the end and the highest-friction one (phone) is bundled with the easy ones.
- **The "save your progress" copy is a lie.** There's no save.

**LIVE:** Walk Path 0 in the prototype. Anchor each screen to its grade.

**Say (during walk):** "I'm a customer. I just gave you my address. Now I'm answering 7 questions before you ask me my name. The form's job switched from *helping me* to *qualifying me* — and I notice. I'm not asking 'how do we make these steps better?' I'm asking 'why does this step exist?' If the answer is fluffy, the step is fluff."

---

## 4. Diagnosis — and the prioritization methodology

**Title:** *"Two questions for every field: can we recover it, and does it cost us conversion?"*

**Sub:** *That's the test for "earns its place." It's also my prioritization methodology — applied at three levels.*

**Visual:** Recoverability × Friction 2×2. Plot Base's fields.

```
                     LOW FRICTION                HIGH FRICTION
                ┌─────────────────────────┬────────────────────────┐
   LOW          │  ASK FIRST              │  ASK LATER             │
   RECOVERABLE  │  • Address ✓ (step 0)   │  • Phone ⚠️ (step 5)    │
                │  • Email ❌ (step 5)     │                        │
                │  • Name  ❌ (step 5)     │                        │
                ├─────────────────────────┼────────────────────────┤
   HIGH         │  DEFER / OPTIONAL       │  SKIP or POST-LEAD     │
   RECOVERABLE  │  • Reason   (step 2)    │  • Energy setup        │
                │  • Own/rent (step 1)    │    (verify in photo    │
                │  • Provider             │     review)            │
                │    (auto-fill)          │                        │
                └─────────────────────────┴────────────────────────┘
```

**The diagnosis writes itself:** the unrecoverable fields are scattered across the form. The highest-friction one (phone) is bundled with the easy ones. We're spending the middle of the funnel on things we could verify later or auto-fill.

**Same methodology, three levels of prioritization:**
- **Field-level:** Recoverability × Friction (this 2×2).
- **Path-level:** **ICE** scoring (Impact × Confidence × Ease), with **leak size** as the tiebreaker.
- **Wave-level:** **Learning velocity** — sequence the test that *informs the next* one first, not the one with the biggest expected lift.

**Three experiments — they compound** *(detail in [appendix A2](#a2--all-three-experiments-compared))*:

| # | Experiment | Steps | What it changes | Compounds on |
|---|------------|-------|-----------------|--------------|
| **1** | **A — Reorder** ★ | 9 → **7** | Email up to step 2, phone deferred, Why+Provider combined, interstitials cut | — (the lever) |
| **2** | **B — Cut Overhead** | 7 → **6** | Cut motivation Q. Combine name+pricing+phone+schedule. | Reorder |
| **3** | **C — Auto-fill Provider** | 6 → **5** | Provider auto-detected from ZIP (PUCT data). | Cut Overhead |

**Why A first:** cleanest one-to-one with the diagnosis. The unrecoverable fields stop being scattered. The high-friction one stops being bundled. Email recovery is a free byproduct — every Wave 2 and 3 test inherits it. **Each subsequent experiment compounds** on the prior winner — we're not running parallel bets, we're stacking confirmed wins.

---

## 5. The fix — Path A: Email-First (the wireframe)

**Title:** *"7 steps. Every one earns its place."*

**Sub:** *Same data captured. Less form. Recovery channel as a free byproduct.*

**Visual: 7-box wireframe of the proposed flow, left-to-right.** Same template as slide 3. Highlight what *moved* and why.

```
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│  1       │  │  2 ★     │  │  3       │  │  4 🔀    │  │  5       │  │  6 ★     │  │  7 ★     │
│ ADDRESS  │─▶│ EMAIL    │─▶│ OWN/RENT │─▶│ COMBINED │─▶│  SETUP   │─▶│  NAME +  │─▶│  PHONE   │
│          │  │          │  │          │  │  REASON  │  │ (icons,  │  │  PRICING │  │ + sched. │
│          │  │          │  │          │  │  + PROV. │  │  skip-   │  │  PREVIEW │  │   call   │
│          │  │          │  │          │  │          │  │  able)   │  │          │  │          │
│ Address  │  │ Email    │  │ Own/rent │  │ Why Base │  │ Solar /  │  │ Name +   │  │ Phone +  │
│          │  │          │  │          │  │ + utility│  │ gen etc. │  │ price    │  │  TCPA    │
│          │  │          │  │          │  │          │  │          │  │ shown    │  │ (collap.)│
│          │  │          │  │          │  │          │  │          │  │          │  │          │
│ Verify   │  │ Unlock   │  │  Hard    │  │ Segment  │  │ Verify   │  │  Build   │  │  Phone   │
│ deliv-   │  │ recovery │  │   DQ     │  │ + verify │  │ in photo │  │ trust by │  │  asked   │
│ erable   │  │ channel  │  │          │  │ provider │  │  review  │  │ showing  │  │  when    │
│          │  │ for      │  │          │  │ — one    │  │ if user  │  │  value   │  │ needed   │
│          │  │ every    │  │          │  │  screen  │  │ ignores  │  │ FIRST    │  │ for      │
│          │  │ bailer   │  │          │  │          │  │          │  │          │  │ scheduling│
│          │  │          │  │          │  │          │  │          │  │          │  │          │
│   ✓      │  │    ✓     │  │    ✓     │  │    ✓     │  │    ✓     │  │    ✓     │  │    ✓     │
│ unrecov, │  │  unrecov,│  │  unrecov,│  │  recover-│  │ optional │  │ unrecov, │  │  unrecov,│
│  low fr. │  │  low fr. │  │  low fr. │  │  able    │  │ skippable│  │  low fr. │  │  high fr.│
│ asked    │  │  asked   │  │  hard DQ │  │ but      │  │ verified │  │ asked    │  │ asked at │
│ first    │  │  early   │  │          │  │ kept for │  │ in photo │  │ AFTER    │  │ schedule │
│          │  │          │  │          │  │ sales    │  │ review   │  │ value    │  │ moment   │
└──────────┘  └──────────┘  └──────────┘  └──────────┘  └──────────┘  └──────────┘  └──────────┘
  unchanged       NEW       (was #2)     (was #3 + #5)   (was #6,     ★ (name was   ★ (phone was
                ★ pulled                     🔀 +       optional)     bundled in    bundled @ #8;
                from end                  ❌ interstitial #4 cut      old #8)       schedule was
                                          ❌ interstitial #7 cut                    old #9)
                                                                                    ❌ video page cut
```

*(Step numbers reference today's flow on slide 3.)*

**What moved and why — read step-by-step (vs. today's slide-3 numbering):**

| New | Was | What changed | Why |
|-----|-----|--------------|-----|
| **1** Address | #1 Address | Unchanged | Only field we have to ask first. |
| **2** ★ Email | (was bundled @ **#8**) | **Pulled from the end to the front.** Value framing: "Where should we send your custom plan?" | Email is the only recovery channel. Capturing it before the user can bail makes every Wave 2-4 test better. |
| **3** Own/rent | #2 Own/rent | Unchanged position | Hard DQ. Stays early. |
| **4** 🔀 Reason + Provider | #3 Reason + #5 Provider | **Two screens combined into one.** Interstitial #4 cut. | Less perceived form length, same data. Reassurance is a *reaction* to friction — fix the friction, you don't need the interstitial. |
| **5** Setup (optional) | #6 Setup | **Made skippable.** Verified in photo review. | Don't gate the lead on data we can confirm visually later. |
| **6** ★ Name + Pricing preview | (name was bundled @ **#8**) | **Name unbundled from phone+TCPA. Pricing rendered before name is asked.** | Trust comes from showing value, not asserting it. Show the plan first, then collect identity. |
| **7** ★ Phone + Schedule | (phone was bundled @ **#8**, schedule was **#9**) | **Phone deferred to the schedule moment.** TCPA collapsed by default. Video cut. | Phone earns its place when it's *for* a callback — not as a gate to seeing pricing. |

**Cuts:**
- ❌ Two educational interstitials
- ❌ Mid-flow YouTube video
- ❌ "Last step — save your progress" copy lie

**Adds:**
- ✓ Real progress bar with "~Ns left"
- ✓ Local social proof on key steps ("400 neighbors in Pflugerville already joined")
- ✓ Email recovery channel (every bailer after step 2 is now reachable)

**LIVE:** Walk Path A in the prototype. Pause on the email moment. Pause on the pricing preview before phone. End on the schedule-a-call screen.

**Say:** "Same data. Same fit-check rigor. The form just stops asking the customer to trust us before we've shown them anything."

---

## 6. Make it real — same discipline applied to the plan

**Title:** *"3 people · 9 weeks · every test earns its place or it dies."*

**Visual:** 3 columns.

**The math:**
- 3.5% → 8% = move qualify→lead from **28% → ~58%**.
- Short-form completion benchmarks sit 40–60%. Cutting the form, deferring phone, and adding email recovery puts us inside the band — middle, not ceiling.
- **100% of the lift comes from the qualify→lead step.** This plan is honest about that.

**The waves + milestones — each one compounds on the prior winner:**
| Wave | Wks | Experiment | Milestone | Read |
|------|-----|------------|-----------|------|
| **0** | 0-1 | Setup | Flag system + event taxonomy in place | — |
| **1** | 1-3 | **A · Reorder** ★ | Live behind 50/50 flag end of W2 | First read W2.5; locked W3 |
| **2** | 4-6 | **B · Cut Overhead** | Layered on Wave 1 winner | Cumulative read W6 |
| **3** | 7-9 | **C · Auto-fill** | ZIP→provider lookup, layered | Read W9; **8% target confirmed** |

**Headline milestone:** First measurable lift end of week 2. **8% confirmed by week 9** (cumulative across all three experiments).

**The team:** 1 PM (me), 1 designer (part-time), 1–2 FE engineers, feature flag system. Cross-functional dependencies: design (4 hrs/wk), legal (TCPA review, 1-time), data eng (event taxonomy, 1 sprint).

**Guardrails — kill the test if any breach:**
- Install-qualification rate ↓ > **5% absolute**
- Sales-call book rate ↓ > **10% relative**
- Cost-per-install ↑ > **5%** *(north star — not cost-per-lead)*
- Install-completion ↓ **at all** (zero tolerance)

**Say:** We don't need a growth team. We need a strike team and a feature flag.

---

## 7. Discussion

**Title:** *"Tax or signal? You tell me."*

**Visual:** Three questions. That's it.

1. **Which form fields actually change a sales script?** Anything that doesn't is **tax**, and it's the first thing I'd cut. Walk me through it field by field.
2. **What's the lead-quality floor below which sales pushes back?** I want a number, not a vibe — that becomes the kill criterion.
3. **What's your install-capacity ceiling per week?** If Wave 1 2x's leads, can ops keep up, or do we throttle?

**Say:** I built this as a working session, not a pitch. The frame I'd love to leave with is — every step in this funnel is either earning its place or it's tax on the customer. Help me grade what's tax. **Where am I wrong?**

---

## Speaking notes

### Pacing (30 min, hard stop)

- **0:00-3:00 · Slides 1-2 (thesis + leak).** Set the frame. One number lands.
- **3:00-9:00 · Slide 3 (today's wireframe + LIVE Path 0).** Walk it, don't read it.
- **9:00-13:00 · Slide 4 (diagnosis + path comparison).** Anchor the prioritization methodology here.
- **13:00-22:00 · Slide 5 (Path A wireframe + LIVE Path A).** This is the centerpiece — give it the time.
- **22:00-26:00 · Slide 6 (make it real).** Three columns, one breath each.
- **26:00-30:00 · Slide 7 (discussion).** Three questions, zip it, listen.

### Demo discipline

- **The wireframes are doing the heavy lifting.** Don't read them — point. Let the audience see the rearrangement before you narrate it.
- **When demoing Path A, switch to it via the Experiments panel mid-explanation.** Operator audiences respect the prototype as the artifact.

### Pre-loaded objection answers (1 line each — go to appendix slide if pressed)

| Objection | Short answer | Backup |
|-----------|--------------|--------|
| "Why 58%? Show me the math." | Short-form benchmarks 40-60%; phone removed from worst moment; recovery upside. 58% is mid-band. | **A1** |
| "Why Path A, not D?" | A fixes the structure. D polishes the wrong shape. D layers on A in Wave 2. | **A2** |
| "You'll flood sales with bad leads." | Wave 1 is **A, not B.** Same fields captured, same qualification. Just reordered. | **A3** |
| "What's your sample size / how long to read?" | ~30k visitors per arm → ~9 day directional read, ~14 day locked. | **A1** |
| "3.5% is a global average — different sources behave differently." | Right. Wave 1 is single-variant for clean read; Waves 2-4 segment in analysis. | **A4** |
| "How does Path C provider auto-detect actually work?" | PUCT public dataset by ZIP. Deterministic for co-ops; suggested with `change` link for deregulated. | **A5** |
| "Did you research our brand voice?" | Read the site + reviews. "Membership" not "subscription." Microcopy variants for W1. | **A6** |
| "What did you NOT include?" | Top-of-funnel polish, referral motion, pricing-page A/B, lead→call-book opt. Sequenced after the leak is fixed. | **A7** |
| "If I gave you 1 week, what would you ship?" | Half of Reorder's polish — progress bar, collapsed TCPA, "what's next" hints. 3 days. Directional read in 5. | **A7** |
| "Would A break TCPA compliance?" | Phone is still captured before any call; we just collapse the disclosure. Legal review pre-launch. | **A6** |

### Energy management

- **Use names** when answering objections. "Cooper, that's the right pushback — appendix three." Operators notice when you've read the room.
- **When you don't know:** *"I don't have that data. What I'd do is X. What does the team see?"* Never bluff.
- **At minute 22, time-check verbally.** "I want to leave 5 min for discussion — moving to the plan."

---

# Appendix — backup slides for likely questions

These don't get shown unless asked. Each is one-screen, one-question. Have them tabbed and ready.

---

## A1 — The math, in detail

*"Why 58%, and how long to read it?"* — Thejas, Cole

**Funnel today vs. target:**

| Step | Today | Target | Lever |
|------|-------|--------|-------|
| Pageview → Address | 15.7% | 17% | Wave 2 polish (D) — small |
| Address → Qualify | 77.9% | 78% | Geographic, no change |
| **Qualify → Lead** | **28.4%** | **~58%** | **Wave 1 (A) — the lever** |
| Lead → Call book | 52.1% | 52% | Watched as guardrail, not optimized |
| **Pageview → Lead** | **3.47%** | **~7.7%** | Math works |

**Why ~58% is defensible (not magic):**
- Industry short-form completion benchmarks (Formstack, Zuko): **50-65%** for 4-8 field forms.
- Path A cuts 2 educational interstitials + 1 video page. Effective form length goes from **9 screens to 7 screens** with one of those being optional.
- Removing phone from the same screen as name+email removes the highest-friction ask from the highest-friction moment.
- Email recovery channel adds **+5-10% recovered leads** on top of the in-flow rate (modeled separately).
- **58% is the middle of the band, not the ceiling.** If we hit 50%, I'm happy. If we hit 40%, I dig into the source-level data before locking the next wave.

**Sample size + read time (Wave 1):**
- Today's monthly volume: ~220k pageviews → ~27k qualifying-step entries.
- 50/50 A/B split: ~13.5k per arm per month → ~3,400 per arm per week.
- To detect a 15% relative lift (28.4% → 32.7%) at 95% confidence, 80% power: **~30k per arm**.
- **~9 days to a directional read · ~14 days to a locked read.** Wave 1 budget (Wks 1-3) is comfortable.
- Multi-comparison risk: **none for Wave 1** (single test vs. control). Risk shifts to time effects across waves — handled by re-baselining each new wave against current control.

**Cost-per-install (the north star):**
```
CPI = (Marketing spend + Amortized sales rep cost + Amortized install team cost) / Installs in window
```
Why CPI not CPL: cheaper leads that don't install are *worse* than fewer better leads. The metric prevents us from gaming the funnel for vanity.

---

## A2 — All three experiments compared

*"Why these three? Why this order?"* — anyone

| # | Experiment | Steps | Risk | Effort | Expected Q→L | What it adds | Compounds on |
|---|------------|-------|------|--------|--------------|--------------|--------------|
| **1** | **A · Reorder** ★ | 9 → 7 | Low | 2-3 wk | 28% → ~50% | Email recovery channel | — (the lever) |
| **2** | **B · Cut Overhead** | 7 → 6 | Low | 3 wk | ~50% → ~55% | Cut motivation Q + collapse final ask | Reorder |
| **3** | **C · Auto-fill Provider** | 6 → 5 | Low (data risk) | 3-4 wk | ~55% → ~60% | Replace provider Q with ZIP lookup | Cut Overhead |

**Decision rationale — they compound, not parallel:** each experiment ships on top of the prior winner, so gains stack rather than competing. A wins Wave 1 because it has the strongest mapping from the diagnosis and the only recovery upside. B builds on it by removing the motivation Q (moved to lifecycle survey) and compressing the final ask. C completes the stack by replacing the provider question with ZIP-deterministic lookup — sequenced last because we need Wave 1+2 data on what sales actually requires.

**Why these three (and not, say, "ship the radically short version"):** every cut earns its place. Each experiment removes something specifically because we have evidence it isn't earning. We don't cut for cutting's sake.

---

## A3 — Sales risk + rollback (the Cooper slide)

*"What if you flood my reps with garbage?"* — Cooper, Cole

**Wave 1 (Reorder) is NOT a sales risk.** Same fields captured, same qualification rigor. Only the order changes. Lead quality should be equivalent or slightly better (users who reach contact-info step have invested more — email upfront acts as a soft commitment).

**Wave 2 (Cut Overhead) is the only one with notable sales risk** — we cut the motivation question. That data was nice-to-have for sales scripts; we move it to a lifecycle survey post-lead. Validate this with sales pre-launch: which fields actually change a script?

**Lead-quality definitions (need alignment with sales pre-launch):**
- **Lead** — has provided contact info (email + phone if applicable).
- **Qualified lead** — passes photo review (deposit-eligible).
- **Sales-qualified lead** — books a call. Today's rate: 52.1%.

**Hard kill thresholds (any wave, any one fires → flag flips to control in 2 hours):**
- Sales-call book rate ↓ > **10% relative** vs. control
- Photo-review pass rate ↓ > **5% absolute**
- Call-to-deposit rate ↓ > **5% absolute**
- Cost-per-install ↑ > **5%**

**Rollback SLA:**
1. Guardrail breach detected (auto-monitor on event stream, not weekly review).
2. Flag flipped to 100% control within **2 hours**.
3. Engineering verifies traffic is on control within **30 min** of flip.
4. Post-mortem: root cause + variant decision within **48 hours**.

**Sales staffing flex:** Wave 1 expected to add ~50% more leads. Rep capacity ceiling needs to be confirmed pre-launch. If unavailable, throttle Wave 1 to 25% traffic until staffing flexes.

---

## A4 — Source-level segmentation (the Gabriel slide)

*"3.5% is a global average. Different sources need different fixes."* — Gabriel, marketing

**The problem with one global rate:** different traffic sources behave differently. Treating all of them the same hides the real story.

**Hypotheses by source (to validate W1):**

| Source | Intent | Likely best-fit path | Why |
|--------|--------|---------------------|-----|
| **Paid social** (Meta, TikTok) | Low-impulse | **C — Auto-fill Provider** | Low intent + impulse → wants the shortest possible path. Auto-fill compresses the form most. |
| **Paid search** (Google, Bing) | High-intent | **A — Reorder** + **B — Cut Overhead** | User typed "battery backup Texas" — they want to convert. Reorder + Cut Overhead compounds. |
| **Organic + referral** | Mid/high-intent | **A — Reorder** (the recommendation) | Currently the closest to today's baseline. A's reordering should lift it most cleanly. |
| **Awareness campaigns** | (Excluded from the 3.5%) | — | Out of scope per the prompt. |

**Recommendation:**
- Wave 1: Path A across **all sources** (single-variant for clean read).
- Wave 2 onward: **segment in analysis.** If traffic supports it (>3k visitors/source/week), run per-source variants in Waves 3-4.
- Coordinate with paid acquisition team: every form change is a creative-team feedback loop. *What ad creative drove the bailers we now recover via email?* That's a marketing signal we don't have today.

**Data ask for Gabriel:** source-level breakdown of the 27k qualifying step entries → 7.6k leads. Which source is driving the leak?

---

## A5 — Technical implementation (the David slide)

*"How does this actually get built?"* — David, engineering

**Feature flag layer (Wave 0):**
- Compatible with **Statsig, LaunchDarkly, GrowthBook, Vercel Edge Config** — whichever Base uses.
- The prototype's `FlagsProvider` abstraction maps directly: replace the `useFlags()` body with a fetch to your flag service.
- Per-user assignment by anonymous ID, persisted across sessions for consistent experience.

**Path A — implementation notes:**
- Email captured at step 2 → fires `qualifying_email_captured` event with anonymous ID, source, UTM.
- Recovery flow: scheduled email at T+24h if user bailed before lead capture. Plumbing: marketing automation tool (Customer.io, Iterable, or Braze).
- Pricing preview at step 6 needs server-side rate lookup by ZIP. Latency budget: <300ms (TTI critical on this step).

**Path C — provider auto-detection:**
- **Texas REP-by-ZIP** is partially deterministic:
  - Co-op / municipal cities (Austin Energy, GVEC, etc.): **deterministic** from ZIP.
  - Deregulated areas (~85% of Texas market): user picked their REP, can't auto-detect with certainty.
- **Implementation:** ZIP → "most likely REP" with `change` link. Fallback: keep the question, mark as "auto-suggested."
- Data source: **PUCT public dataset** (refreshed quarterly, free) + Base's own customer base for accuracy improvements over time.
- Risk: wrong defaults erode trust. Why C is sequenced after A — by then we know the accuracy threshold sales actually needs.

**Event taxonomy additions:**
- `step_view`, `step_complete`, `step_abandon` per qualifying step (with timestamps).
- `qualifying_email_captured` (Path A specific).
- `pricing_previewed` (Path A step 6).
- `recovery_email_sent`, `recovery_email_clicked`, `recovery_lead_captured` (Path A recovery flow).

**Existing data ask:** event taxonomy today. If `step_abandon` doesn't exist with step granularity, that's the first sprint of Wave 0.

---

## A6 — Brand voice + copy variants (the Victoria slide)

*"Did you research our voice? What if 'plan' isn't right?"* — Victoria, Gabriel

**Voice observations from Base's site + reviews:**
- "Membership," not "subscription." Captured.
- Plain English, low-jargon. ("Power your home your way." "Save money. Stay powered.")
- Warmth without sentimentality — operator-friendly.
- TCPA legalese is intentionally heavy (compliance) but visually buried in their actual marketing copy.

**Path A copy choices — and their alternatives:**

| Step | My choice | Alt 1 | Alt 2 | Risk |
|------|-----------|-------|-------|------|
| 2 — Email | "Where should we send your custom plan?" | "Save your spot — we'll email your plan." | "Get your personalized estimate." | "Plan" feels promotional vs. "estimate." Test all three in W1 microcopy A/B. |
| 6 — Pricing reveal | "Your plan, [Name]." | "Here's what Base looks like at [Address]." | "Your custom membership." | Personalization vs. address-anchoring. |
| 7 — Phone | "What's the best number to text?" | "How should we reach you?" | "Where do we text your photo-review link?" | "Text" framing reduces phone-call anxiety. |

**Microcopy A/B rounds in Wave 1:** 3 variants per step, 2-day reads, ship the winner. Estimated impact: 5-15% on step-completion at the boundary.

**TCPA note:** legal review pre-launch. Collapsed-by-default with a "Why we ask for your phone" expander preserves disclosure but reduces visual friction. Defer to legal on whether collapsed is compliant.

**Brand consistency check:** every copy choice runs past brand owner before ship. The framework is what I defend; the exact words are negotiable.

---

## A7 — What I cut from the plan (the Cole slide)

*"What did you NOT include, and why?"* — Cole

**Considered, deferred:**

| Lever | Why deferred |
|-------|--------------|
| **Top-of-funnel polish** (homepage, pricing page) | Different team / different surface area. Not in the brief. The 84% drop from pageview to address is a homepage problem, not a funnel-flow problem. |
| **Referral motion** | Texas-localized hardware = high-referral category. Real opportunity but a 3-month build. Wave 5+. |
| **Pricing-page A/B** | Major lever for high-intent traffic but separate workstream. Coordinate with whoever owns pricing. |
| **Lead → call-book optimization** | The 47.9% drop here is real but downstream of the case. Watch as a guardrail; optimize after Wave 3. |
| **Post-purchase / onboarding flow** | 90+ day journey from signup to install. Out of scope; LTV implications. |
| **Localization (Spanish)** | Texas demographic justifies it. Not a Wave 1 lever. |
| **Mobile app push** | The Base app is post-install. Not in this funnel. |
| **Source-level creative pass** (paid social) | Coordinated with paid team. The form fix unblocks the creative test; reverse order would be wasteful. |

**Cut by tier — what would I cut if Cole gave me 1 week instead of 9?**
- Half of Reorder's polish: real progress bar, collapsed TCPA, "what's next" hints. 3 days of work. Ships behind a flag. Directional read in 5 days. **Then** decide whether to invest in the full reorder.

**Cut by tier — what would I cut if Cole said "ship 8% in 4 weeks not 9"?**
- Ship Reorder (Wave 1) and Cut Overhead (Wave 2) only. ~55% qualify→lead = ~6.7% pageview→lead. Within striking distance of 8% but doesn't quite get there. Trade some certainty for speed.

---

*Pair with [`CONTEXT.md`](./CONTEXT.md), [`INTERVIEW_PREP.md`](./INTERVIEW_PREP.md), and the live demo at [`localhost:3000/onboarding`](http://localhost:3000/onboarding).*
