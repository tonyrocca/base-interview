# Slide-by-slide — Base Power Growth PM

**14 slides total** · 7 main + 7 appendix · For a 30-min working session.

Each slide: **what's on it** + **what to say**. Build script (`scripts/build-deck.mjs`) generates a `.pptx` from this content.

---

## 1. Thesis

**On slide:**
- Headline: *Every step in a funnel must earn its place.*
- Sub: *Today's funnel has tax.*
- Caption: *Especially when you're asking permission to install hardware in someone's backyard.*
- Photo: Base battery installed on a real Texas home

**Say (30s):** A funnel is sacred. Every step does work — qualify, capture, build trust, set up the next interaction. If a step doesn't *change a downstream action*, it's tax on the customer and on the business. Base sells trust, and trust transactions can't tolerate tax. So the question for every step is the same: **what is this step for, and what would it cost us to remove it?**

---

## 2. The leak

**On slide:**
- Headline: *19,000 qualified visitors lost at one step. Every month.*
- Funnel: 220,440 → 34,668 → 27,008 → **7,660** → 3,992
- The drop between Qualify (27k) → Lead (7.6k) highlighted red
- Annotation: *71% drop · 19,348 humans gone*

**Say (30s):** Twenty-seven thousand qualify each month. Seven-point-six thousand finish. Same step, every month. **That's the entire case.** Everything else in this deck is in service of this one number.

---

## 3. Today's funnel — graded ruthlessly

**On slide:**
- Headline: *Earns its place ✓ · earns it at the wrong time ⚠️ · doesn't earn it ❌*
- 9-box horizontal wireframe of today's flow:
  1. Address ✓ — verify deliverable
  2. Own/rent ✓ — hard DQ
  3. Reason ⚠️ — segments user (recoverable via email)
  4. Interstitial ❌ — fluff
  5. Provider ⚠️ — could auto-fill
  6. Setup ⚠️ — could defer to photo review
  7. Interstitial ❌ — fluff
  8. Lead capture ⚠️🔴 — earns it but at the worst moment
  9. Video + schedule ❌ — fluff (video kills completion)
- 🔴 *71% drop here · 19,000/mo* between #7 and #8

**LIVE:** Walk Path 0 in the prototype, anchor each screen to its grade. ~3 min.

**Say:** "I'm a customer. I just gave you my address. Now I'm answering 7 questions before you ask me my name. The form's job switched from *helping me* to *qualifying me* — and I notice. I'm not asking 'how do we make these steps better?' I'm asking *why does this step exist?* If the answer is fluffy, the step is fluff."

---

## 4. Diagnosis — the prioritization methodology

**On slide:**
- Headline: *Two questions for every field: can we recover it, and does it cost us conversion?*
- Sub: *That's the test for "earns its place." It's also my prioritization methodology — applied at three levels.*
- 2×2 (Recoverability × Friction):
  - Top-left (low recov / low fric — ASK FIRST): Address ✓ (step 1), Email ❌ (step 8), Name ❌ (step 8)
  - Top-right (low recov / high fric — ASK LATER): Phone ⚠️ (step 8)
  - Bottom-left (high recov / low fric — DEFER): Reason, Own/rent, Provider
  - Bottom-right (high recov / high fric — SKIP IN-FLOW): Energy setup
- 3 levels of prioritization called out:
  - **Field-level:** Recoverability × Friction (this 2×2)
  - **Path-level:** ICE + leak size as tiebreaker
  - **Wave-level:** Learning velocity, not impact
- 3 experiments compared (compounding, not parallel):
  - **A — Reorder ★** · 9 → 7 steps · the lever · email recovery upside · Wave 1
  - **B — Cut Overhead** · 7 → 6 steps · cuts motivation Q + collapses final ask · Wave 2
  - **C — Auto-fill Provider** · 6 → 5 steps · ZIP→provider via PUCT data · Wave 3

**Say (60s):** "One framework. For every field — can we recover it, and does it cost us conversion. Plot Base's fields and the diagnosis writes itself. Same methodology applied to paths and waves. Three experiments — each compounds on the prior winner, not parallel. **Reorder wins Wave 1** because it's the cleanest one-to-one with the diagnosis and the only one with recovery upside. Cut Overhead and Auto-fill stack on top once Wave 1 is locked."

---

## 5. The fix — Path A: Email-First

**On slide:**
- Headline: *7 steps. Every one earns its place.*
- Sub: *Same data captured. Less form. Recovery channel as a free byproduct.*
- 7-box horizontal wireframe of proposed flow, ALL ✓:
  1. Address ✓ — unchanged (was #1)
  2. ★ Email ✓ — pulled from end (was bundled @ #8). Unlocks recovery for every bailer.
  3. Own/rent ✓ — unchanged position (was #2)
  4. 🔀 Reason + Provider ✓ — combined onto one screen (was #3 + #5). Interstitial #4 cut.
  5. Setup (optional) ✓ — skippable, verified in photo review (was #6)
  6. ★ Name + Pricing preview ✓ — unbundled from phone, value shown first (was bundled @ #8)
  7. ★ Phone + Schedule ✓ — phone deferred to schedule moment, TCPA collapsed (was #8 + #9)
- Cuts: ❌ 2 educational interstitials · ❌ Mid-flow YouTube video · ❌ "Last step — save your progress" copy lie
- Adds: ✓ Real progress bar with "~Ns left" · ✓ Local social proof · ✓ Email recovery channel

**LIVE:** Walk Path A in the prototype. Pause on the email moment. Pause on the pricing preview before phone. End on schedule-a-call screen. ~5 min.

**Say:** "Same data. Same fit-check rigor. The form just stops asking the customer to trust us before we've shown them anything."

---

## 6. Make it real

**On slide:**
- Headline: *3 people · 9 weeks · every test earns its place or it dies.*
- **The math** column:
  - 3.5% → 8% = move qualify→lead from **28% → ~58%**
  - Short-form completion benchmarks 40-60% → 58% is mid-band, not ceiling
  - **100% of the lift comes from the qualify→lead step** — this plan is honest about that
- **The waves** column — each compounds on the prior winner:
  - 0 · 0-1 · Setup · Flag system + event taxonomy in place
  - 1 · 1-3 · **A · Reorder ★** · Live behind 50/50 flag end of W2; locked read W3
  - 2 · 4-6 · **B · Cut Overhead** · Layered on Wave 1 winner · Cumulative read W6
  - 3 · 7-9 · **C · Auto-fill** · ZIP→provider lookup · 8% target confirmed W9
  - **Headline:** First lift end of W2 · 8% confirmed by W9
- **The team** column:
  - 1 PM (me), 1 designer (PT), 1-2 FE engineers, feature flag system
  - Cross-functional: design 4 hrs/wk, legal (TCPA review, 1-time), data eng (event taxonomy, 1 sprint)
- **Guardrails — kill on any breach:**
  - Install-qual rate ↓ > **5% absolute**
  - Sales-call book rate ↓ > **10% relative**
  - Cost-per-install ↑ > **5%** (north star — not cost-per-lead)
  - Install-completion ↓ at all (zero tolerance)

**Say (60s):** "We don't need a growth team. We need a strike team and a feature flag. First lift in 2 weeks. 8% by week 9. Cost-per-install is the north star, not cost-per-lead — we don't game the metric. Every test has a kill criterion before kickoff."

---

## 7. Discussion

**On slide:**
- Headline: *Tax or signal? You tell me.*
- Three questions:
  1. Which form fields actually change a sales script? Anything that doesn't is **tax** — first to cut.
  2. What's the lead-quality floor below which sales pushes back? I want a number, not a vibe — that's the kill criterion.
  3. What's your install-capacity ceiling per week? If Wave 1 2x's leads, can ops keep up?

**Say:** "I built this as a working session, not a pitch. The frame I'd love to leave with — every step in this funnel is either earning its place or it's tax on the customer. Help me grade what's tax. **Where am I wrong?**"

---

# Appendix

*Don't show unless asked. Tab them, ready.*

---

## A1 — The math, in detail

**For:** Thejas, Cole.

**On slide:**
- Funnel today vs. target table: pageview→address (15.7→17%), address→qualify (77.9→78%), qualify→lead (28.4→**~58%**), lead→callbook (52.1→52%), pageview→lead (3.47→**~7.7%**)
- Why 58% defensible: short-form benchmarks 50-65% · -2 interstitials, -1 video page · phone removed from same step · email recovery +5-10% on top
- Sample size + read time: 30k per arm for 15% relative MDE @ 95% conf · 9-day directional · 14-day locked read · Wave 1 (Wks 1-3) is comfortable
- Cost-per-install formula: (Mktg spend + amortized rep + amortized install team) / installs in window

**Say:** "58% isn't magic. Short-form benchmarks 40-60. We're in the middle. If we hit 50, I'm happy. If we hit 40, I dig into source-level data before locking Wave 2. Sample size: 30k per arm. Wave 1 reads in two weeks."

---

## A2 — All four paths compared

**For:** anyone.

**On slide:** Table — Path · One-line · Risk · Effort · Expected Q→L · Recovery upside · Wave order
- A — Reorder · Email upfront, phone deferred, 7 steps · Low · 2-3wk · ~50% · **+5-10% via email** · **Wave 1**
- D — Polish · Same fields, real progress + collapsed TCPA · Very low · 1wk · ~35% · None · Wave 2 (additive)
- C — Auto-fill · Provider auto-detected, 6 steps · Low (high data risk) · 3wk · ~45% · None · Wave 3
- B — Delete · Skip qualification, 2 steps · Med-high · 4wk · 65%+ · None · Wave 4 (kill-switch only)

**Say:** "A wins Wave 1 because it's the strongest mapping from the diagnosis, lowest data risk, only one with recovery upside. D doesn't fix structure. B is highest-impact but highest sales-risk — sequenced last with a kill switch. C benefits from going second."

---

## A3 — Sales risk + rollback

**For:** Cooper, Cole.

**On slide:**
- *Wave 1 (Path A) is NOT a sales risk.* Same fields, same qualification rigor. Only order changes.
- *Sales-risk lever is Wave 4 (Path B).* Ships at 10% traffic with these safeguards:
- Lead-quality definitions:
  - Lead = contact info captured
  - Qualified lead = passes photo review
  - Sales-qualified lead = books a call (today: 52.1%)
- Hard kill thresholds (any one fires → flag flips to control in 2 hrs):
  - Sales-call book rate ↓ > 10% relative
  - Photo-review pass rate ↓ > 5% absolute
  - Call-to-deposit rate ↓ > 5% absolute
  - Cost-per-install ↑ > 5%
- Rollback SLA: detection → flag flip in 2 hrs · engineering verification 30 min · post-mortem 48 hrs
- Sales staffing flex: Wave 1 expected +50% leads. Confirm rep capacity pre-launch; throttle to 25% traffic if needed.

**Say:** "Wave 1 is Path A — same fields, just reordered. Sales gets the same lead quality, more of them. The sales-risk lever is Wave 4, and that ships at 10% traffic with kill criteria armed."

---

## A4 — Source-level segmentation

**For:** Gabriel.

**On slide:**
- *3.5% is a global average. Different sources need different fixes.*
- Hypothesized best-fit by source:
  - Paid social (low-impulse) → Path B (radically short)
  - Paid search (high-intent) → Path D + A reorder
  - Organic + referral (mid-high intent) → **Path A** (the recommendation)
  - Awareness — out of scope per prompt
- Recommendation: Wave 1 single-variant for clean read; Waves 2-4 segment in analysis (per-source variants if scale supports)
- Marketing handoff: every form change is creative-team feedback (*what ad drove the bailers we recovered via email?*)
- Data ask: source-level breakdown of the 27k → 7.6k step

**Say:** "Right concern. The 3.5% is a global rate. Wave 1 reads cleanly across sources, then we segment for Waves 2-4. The form fix is also a marketing signal — what creative drove the bailers we now recover by email?"

---

## A5 — Technical implementation

**For:** David.

**On slide:**
- Feature flag layer (Wave 0): compatible with Statsig / LaunchDarkly / GrowthBook / Vercel Edge Config. The prototype's `useFlags()` abstraction maps directly.
- Path A plumbing:
  - Email captured @ step 2 → `qualifying_email_captured` event
  - Recovery email at T+24h via marketing automation (Customer.io / Iterable / Braze)
  - Pricing preview needs server-side rate lookup by ZIP, <300ms latency
- Path C provider auto-detect:
  - Co-ops/municipal: deterministic from ZIP
  - Deregulated areas (~85% TX): suggested + `change` link, fallback to question
  - Source: PUCT public dataset, refreshed quarterly
- Event taxonomy additions: step_view, step_complete, step_abandon (per qualifying step), qualifying_email_captured, pricing_previewed, recovery_email_*
- Wave 0 first sprint: standing up step-granular event taxonomy if not present

**Say:** "Flag system is precondition, not deliverable. Path C provider lookup uses PUCT public data — deterministic for co-ops, suggested for deregulated. Event taxonomy probably needs work. I'd plan W0 around standing it up."

---

## A6 — Brand voice + copy variants

**For:** Victoria, Gabriel.

**On slide:**
- Voice observations from Base's site + reviews: "Membership" not "subscription" · plain English · warmth without sentimentality · TCPA legalese intentionally heavy
- Path A copy choices + 2 alternatives per step (microcopy A/B in Wave 1):
  - Step 2 (email): "Where should we send your custom plan?" / "Save your spot — we'll email your plan." / "Get your personalized estimate."
  - Step 6 (pricing reveal): "Your plan, [Name]." / "Here's what Base looks like at [Address]." / "Your custom membership."
  - Step 7 (phone): "What's the best number to text?" / "How should we reach you?" / "Where do we text your photo-review link?"
- TCPA: collapsed-by-default with "Why we ask for your phone" expander · **legal review pre-launch**
- Brand consistency: every copy choice runs past brand owner before ship

**Say:** "Read the site, read the reviews. The framing I defend; the exact words are negotiable. Microcopy A/B in Wave 1 — 3 variants per step, 2-day reads. TCPA collapsed needs legal sign-off."

---

## A7 — What I cut from the plan

**For:** Cole.

**On slide:**
- Considered, deferred (table — Lever · Why):
  - Top-of-funnel (homepage, pricing page) — different surface, not in brief
  - Referral motion — high opportunity, 3-month build, Wave 5+
  - Pricing-page A/B — separate workstream
  - Lead → call-book optimization — downstream of the case; watched as guardrail
  - Post-purchase / install onboarding — 90+ day journey, out of scope
  - Localization (Spanish) — Texas demographic justifies, not Wave 1
  - Mobile app push — post-install, not in this funnel
  - Source-level creative pass — reverse order; form fix unblocks the test
- "If you gave me 1 week instead of 9": ship half of Path D — progress bar + collapsed TCPA + "what's next" hints. 3 days. Read in 5.
- "If 8% in 4 weeks not 9": drop Wave 4. Waves 1-3 ≈ 7.5%, within margin.

**Say:** "These are the ones I considered and pulled. None are wrong — they're sequenced. Form leak gets fixed first because it's where every other dollar dies. I'd cut Wave 4 before I'd cut Wave 1."

---

# Pacing reference

| Time | Slide | What's happening |
|------|-------|------------------|
| 0:00-3:00 | 1-2 | Frame, the leak |
| 3:00-9:00 | 3 | Today's wireframe + LIVE Path 0 |
| 9:00-13:00 | 4 | Diagnosis + paths comparison |
| 13:00-22:00 | 5 | Path A wireframe + LIVE Path A |
| 22:00-26:00 | 6 | Make it real |
| 26:00-30:00 | 7 | Discussion |

---

*Source: this file. Build script: `scripts/build-deck.mjs`. Generates `dist/base-deck.pptx` for Google Slides import.*
