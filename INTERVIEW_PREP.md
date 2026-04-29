# Base Power Interview Prep — Growth PM (Marketing org)

**The day:** 4 hours. Working session at 10am, then 5×30-min 1:1s. Final interview is with the Marketing lead. **You are interviewing for the marketing org**, not the growth org — read every answer through that lens.

---

## What's actually strong in your deck

- The 19,000-qualified-visitors-lost framing is hard to argue with — leads with the leak.
- Recoverability × Friction is a real framework, not a vibe. Holds up under pushback.
- The "we don't pick one in this room" move pre-empts the obvious "but which one would you ship?" trap.
- Complexity × Dimensionality 2×2 lets you propose four paths without looking indecisive.
- Cost-per-install (not cost-per-lead) as the north star is the operator's answer.
- Strike team + 9 weeks is a confident, lean ask. Operators respect that.

---

## Real weak spots — pre-bake answers for these

These are the gaps a SpaceX/Anduril room will find. Don't get ambushed.

### 1. The 58% number is the most challenged thing in the deck

You wave at "short-form completion benchmarks 40-60%." Cole or Thejas will press: *whose benchmarks, what form length, what audience?*

**Better answer:** "Industry benchmarks (Formstack, Zuko) put 4-8 field forms at 50-65%. Cutting Base from 9 screens to ~6, removing the highest-friction field (phone) from that step, and adding email recovery puts us inside that band. I'm not promising a top-of-band number. If we hit 50% I'm happy. If we hit 40% I'm investigating Path B."

### 2. You don't show source-level breakdown anywhere

The 3.5% is a global average. Paid social, paid search, organic, and referral all behave differently. Gabriel (marketing) **will** ask this. Acknowledge upfront.

**Move:** add to slide 10's open questions, or pre-empt in slide 2 — *"This is a global rate. The first thing I'd ask the team for is the source-level breakdown. Paid social bailers may need a different fix than referral bailers."*

### 3. You haven't acknowledged the lead → call → install steps downstream

You say it's out of scope, but interviewers (especially Cooper from sales) will probe.

**Better positioning:** "I'm focused on lead-capture because the leak is biggest there. But I watch the downstream rates as guardrails. If lead capture goes up and call-book goes down by more than 10% relative, the test kills itself. We measure the whole journey — we just optimize one step at a time."

### 4. "Trust" as a thesis is an assertion — who validated it?

Victoria (design) or Gabriel (marketing) might ask: *"Did you talk to customers? Or is this your gut?"*

**Honest answer:** "I walked the flow myself, read your reviews, and reasoned about what 'install hardware in my backyard' implies. I haven't run customer interviews. The thesis is a hypothesis I'd validate in week 1 with 5 customer calls before locking the framing."

### 5. You don't show the qualifying-step time data

You note 18m13s avg time on step 4 as a smell, but you don't break it down. Could be people abandoning and returning, not actual on-task time.

**Defensible answer:** "Average is a weak signal. I'd want p50/p90 distribution. If p90 is 60+ minutes, we're seeing return visits and the real on-task time may be 2-3 min. I'd add that to the data ask before locking my reads."

### 6. You don't address rep capacity

If you 2.3x leads, sales staffing has to flex. Cooper will ask.

**Move:** "I assume there's an install-capacity ceiling and a rep-capacity ceiling. I'd want to know both before Wave 3 (Path B) — that's the lever that could overflow ops, and the kill criterion has to fire before that happens. Worst case, we ship behind a 10% traffic flag."

### 7. Path C's "auto-detect provider" hides real complexity

David (SWE) might press: *how do you actually do that?*

**Defensible answer:** "Texas has a public REP-by-zip dataset (PUCT). For grid-assigned cities/co-ops it's deterministic from address. For deregulated areas, the user picked their REP — we can't auto-detect with 100% accuracy. So Path C shows the *most likely* provider with a 'change' link. Worst case, we degrade to the provider question. The risk is wrong-defaults eroding trust, which is exactly why C is sequenced last — by then we know how much accuracy sales actually needs."

### 8. You haven't named the experimentation infra question

Does Base have a flag service today? Statsig, LaunchDarkly, GrowthBook? Custom? David will care.

**Move:** "I built the demo with a flag pattern that maps to any of them. First question to the team: what do we have? If nothing, the first 1-2 weeks of Wave 1 is partly about standing that up. The flag system is a precondition, not a deliverable."

### 9. You don't have a rollback story

When (not if) a test goes sideways, what's the kill switch?

**Add to slide 9:** kill criteria fire → flag flips to control → engineering verifies in <2 hr → post-mortem within 48 hr. Not just "guardrails" — actual operational SLA.

### 10. You haven't priced the data ask

If you ask Base for 6 things and they say "we don't track that," what's your fallback? Have a tiered ask.

**Tiered:** mobile share + source-level breakdown (must-have); existing flag infra + past experiments (high-value); p50/p90 step time + cost-per-install (helpful, can model around).

---

## Per-interviewer scouting — what each will probe

### 10:00 Working Session — all six in the room

You're "running a strategy meeting." This is performative as much as substantive. Cole and Gabriel are watching whether you can run a room. Everyone else is watching their domain.

- **Cole (Head of Growth):** can you frame a strategic problem clearly?
- **Gabriel (Marketing):** is this guy a marketer or a closet engineer?
- **Victoria (Design):** does he respect design or just decorate it?
- **David (SWE):** is the plan actually buildable?
- **Thejas (Growth):** is the math defensible?
- **Cooper (Sales):** is he going to flood my reps with garbage?

**Working session moves:**
- Open by acknowledging *this is your meeting, not theirs*. Set the agenda. ~3 min on framing, ~10 min on the demo (the hero), ~10 min on the plan, ~5 min for discussion.
- Use names. ("Cooper, how would you read a 30% lift in leads but a 5% drop in call-book?")
- When demoing, **switch to a different path mid-walk** when someone says something interesting — show that the prototype is the working artifact, not a stage prop.

### 10:30 Cole Jones — Head of Growth (this is essentially the hiring manager interview, even though you're in marketing)

**Likely zones:**
- Why Base, why now, why this role
- What did you *not* put in the deck and why
- 90-day plan if you got the job tomorrow
- How would you organize the growth org? Where does it report?
- What's contrarian in your view of Base's growth?
- "Walk me through your most ambiguous project."

**The hard one:** *"You're optimizing the bottom of the funnel. Why isn't the bigger lever paid acquisition cost? Or top-of-funnel quality?"*
- **Answer:** "Because I was given the case. If you handed me a CAC problem instead, my framework changes. Recoverability × friction is for a *form* — for an ad, it's audience-targeting × creative cost. The discipline of asking 'where does the leak get fixed cheapest' is the same."

**The other hard one:** *"What did you cut from your plan?"*
- A retention play, a referral motion (huge for a Texas-localized hardware product), a paid-social creative pass, a pricing-page test. "I cut them because the brief was the form. They're all on a longer roadmap — happy to walk through them."

### 11:00 Victoria Roux — Design

**Likely zones:**
- Critique the prototype hard. *Where's the design wrong?*
- How do you partner with designers — RACI, decision rights
- Mobile-first thinking
- Brand voice consistency
- Accessibility

**The hard one:** *"You shipped this prototype without a designer. What did you compromise?"*
- **Answer:** "Plenty. The hero photo is theirs, not mine. The screen-by-screen design is functional, not crafted. If we were shipping this, I'd want a designer on the rebuild within 48 hours of the green light. The prototype is meant to be obsolete the moment design touches it."

**The other hard one:** *"The 'Save your progress' framing in Path D — did you test it? Or is that your guess?"*
- "My guess. Tested only against my own walkthrough. The hypothesis is that it reframes a friction step (give us your data) as a value step (don't lose your work). Even if it's right in spirit, the exact words need a copy round. I'd run 2-3 microcopy variants in Wave 1."

**Be ready for:** *Path A's "Where should we send your custom plan?" — operator audiences may read that as a dark pattern.*
- "Real concern. The framing trades a small risk of feeling pre-committal for a real recovery channel. If 5% of users bounce because email-asked-too-early feels weird, but we recover 10% via email later, it's a net win. But yes — measure the bounce on step 2 directly, not just the lead rate at step 6."

### 11:30 David Zhang — Engineering

**Likely zones:**
- "How would you write the PRD for Path C?"
- "What's your tech literacy?"
- Estimate-the-effort questions
- Feature-flagging / experimentation infra
- Address validation, geocoding, Texas REP lookups

**The hard one:** *"How does Path C's auto-detect provider actually work?"*
- See answer above. PUCT data + best-guess + fallback. Don't bluff specifics — say "I'd validate that exact mapping with whoever owns this on the engineering side first."

**The other hard one:** *"What's the dumbest thing PMs do to engineers?"*
- Honest answer: ship a feature without telling them what success looks like, or move guardrails after the test starts. "I write the kill criteria into the PRD before kickoff. If they need to change, that's a new ticket and a new conversation."

**Be ready for:** *"How long did you spend building the prototype?"* — be specific. "About 6 hours, mostly typography and tokens. Two hours on the flag system. The path screens were ports of code I'd already written."

### 12:30 Thejas Suvarna — Growth IC/peer

**Likely zones:**
- Sample size, MDE, statistical rigor
- A/B test design
- "Walk me through how you'd interpret X result"
- Cohort / retention thinking
- Your past growth work

**The hard one:** *"How long does Wave 1 (Path D) need to run to read?"*
- **Answer:** Today's lead rate is 3.47% on ~220k pageviews/month → ~7,600 leads. To detect a 15% relative lift (3.47% → 4%) at 95% confidence, 80% power, you need ~30k visitors per arm. At ~110k/month per arm in 50/50 A/B, that's ~10 days. Two-week wave is comfortable. *Have this math written down before the meeting.*

**The other hard one:** *"You're running 4 paths. Multiple comparisons inflate false positives. What's your correction?"*
- "I'm not running them simultaneously — they're sequenced. Each wave is a single test against control, so no multi-comparison. The risk shifts to time-effects: if Path A ships and the seasonality changes, I have to re-measure control. The kill criteria are absolute (e.g., install-qual ↓ >5%), not relative to a moving baseline."

**Be ready for:** *"Cost-per-install — what's the formula?"*
- (Marketing spend in window + sales rep cost amortized + install-team cost amortized) ÷ installs completed in same window. Not just CAC. The point of measuring CPI is that cheaper leads that don't install are worse than fewer better leads.

### 1:00 Cooper Johnson — Sales

**Likely zones:**
- Will Path B break the sales motion?
- Lead-quality floor
- Rep capacity / capacity planning
- What context reps need from the form
- Compensation / quota implications

**The hard one:** *"My reps use the energy-setup answer to pre-bake the call. If you remove it, the call gets harder. What do you say?"*
- **Answer:** "Tell me which answer drives which script. If 'has solar' changes the pitch by 30 seconds, fine — keep it. If it's a 'good to know', it can move to the photo review or the call. The discipline is: every field has to *change a downstream action* or it's tax. Let's pull the list together and rank."

**The other hard one:** *"What if you ship Path B and call-book drops 30%?"*
- "Hard kill. Path B is the highest-risk lever. It ships at low traffic share — 10% — and the kill threshold is 10% relative drop in call-book. We catch a 30% drop in 3 days, not 3 weeks. The whole point of sequencing B late and small is so this doesn't blow up the funnel."

**Be ready for:** *"How are you tracking install-qual rate?"*
- "Photo-review pass rate is the proxy I'm using. If sales has a different definition (e.g., depositable lead), I want to align. Whichever definition you use, I'll wire it as the guardrail."

### 1:30 Gabriel Federman — Marketing (your hiring manager?)

**Likely zones:**
- Brand voice
- Channel mix / source-level thinking
- Will you fit in marketing
- Why marketing org and not growth org for this role?
- Working with creative / paid teams

**The hard one:** *"This is a marketing role, but you've focused entirely on the form. What's the marketing read of this work?"*
- **Answer:** "The form is where marketing's investment goes to die. Every dollar spent on paid acquisition that drives a qualified visitor who then bails is wasted CAC. Fixing the form is *defending* every other marketing dollar. Plus — every test we run gives us learnings about what messaging resonates, which feeds back upstream into ads. The form is the receiver. I treat it as the marketing surface area where the campaign actually lands."

**The other hard one:** *"How would your plan differ for paid social vs paid search vs organic?"*
- "Paid social is impulse + low intent — Path B (radically short) probably wins there. Paid search is high intent — Path D (polish) probably wins. Organic is mid-intent and probably the closest to the existing baseline. I'd want to A/B per source if traffic supports it. If not, I segment in analysis."

**Be ready for:** *"Brand voice — did you research it?"*
- "I tried — read your reviews, walked the site, saw 'membership' (not 'subscription'), saw the warmth of the customer testimonials. The Path A copy I wrote is intentionally quiet and value-receiving, not transactional. But I'd defer to whoever owns voice. The framing is what I'd defend; the exact words are negotiable."

---

## Hardest questions you might get (any 1:1)

| # | Question | Short answer |
|---|----------|--------------|
| 1 | "Why are you applying for a marketing role with a product background?" | Because growth at hardware companies is a marketing problem dressed as a product one. The funnel is where my craft lives, and at Base it sits in marketing. |
| 2 | "Convince me 8% is the right target, not 6% or 10%." | 8% is the brief. I think 7-8% is plausible in 9 weeks. 10% would require structural changes I haven't proven. 6% is a softball that doesn't justify the resourcing. |
| 3 | "What's a hypothesis you held too long?" | Specific real example. Don't fake it. |
| 4 | "What's the worst part of your plan?" | Path B is the riskiest and most likely to be killed. Worst case it costs us 4 weeks of a small traffic share with no learning. Best case it's a step change. The risk/reward justifies the test, not the ship. |
| 5 | "If I gave you 1 week instead of 9, what would you ship?" | Path D, half of it: real progress bar + collapsed TCPA + 'what's next' previews. 3 days of work, ships behind a flag, gives a directional read in 5 days. |
| 6 | "Where does this team report?" | Doesn't matter to me as long as the strike team has decision rights to ship behind a flag without a steering committee. If it reports to marketing I work upstream into creative; to product, I work upstream into the platform team. The work is the same. |
| 7 | "What if leadership says 'just ship Path B'?" | I push back once, with the install-qual risk. If they still say ship, I ship Path B at 10% traffic with kill criteria armed. I don't die on this hill — it's a low-cost, high-info test. |
| 8 | "How do you handle a result you don't like?" | Re-read the data, check the segments, run the cohort. If the result holds, kill the variant. Don't argue with the test. |
| 9 | "What's your biggest concern about joining?" | Specific, honest, and forward-looking. e.g., "Hardware companies have a different cadence than software. I want to understand how install ops constrains growth before I scale anything." |
| 10 | "Sell me on you in 60 seconds." | Have this rehearsed. PM-at-heart, growth-curious, ship-fast, customer-first, honest about uncertainty. Don't be modest, don't be a salesperson. |

---

## Things not in the deck that will come up

- **App downloads** — does the user need the Base app post-signup? Where does that fit?
- **Referral program** — Texas-localized hardware = high-referral category. Mentioned anywhere?
- **Pricing-page conversion** — separate from the form. Have you looked?
- **HOA approval mention** — that's a real DQ for some leads. Where?
- **Texas market saturation** — when do they expand to next state? How does the funnel change?
- **Localization / Spanish** — Texas, sizable Hispanic population. Is the funnel translated?
- **TCPA compliance review** — collapsing the disclosure has legal implications.
- **Cookie/consent banner** — anything you reorder might trigger a re-accept.
- **GA4 / FB pixel events** — reordering steps changes funnel-event mapping.

You don't need answers for all of these. You need to **acknowledge the ones that come up and have a 1-line response** that says "good catch, here's how I'd think about it."

---

## Working-session execution notes

- **Don't read the slides.** Talk to the room.
- **Use the prototype early.** Slide 3 is the demo — don't get to it 20 minutes in.
- **When someone says something good, say their name and reflect it back.** "Cooper just said something important — let's pause on that."
- **When you don't know:** *"I don't have that data. What I'd do to find out is X. What does the team see?"*
- **Time check at minute 20.** "Ten minutes left — I want to make sure we get to the discussion section."
- **Close strong.** Slide 10 isn't a Q&A dump — it's "here are 5 things I want to leave the meeting unsure about. Tell me which one to chase first."

---

## Things to literally do this week

- [ ] Run the lead-rate sample-size math (Thejas will ask).
- [ ] Draft the Path C provider-detection mechanism (David will ask).
- [ ] Read 10 Base Google reviews and pull 3 quotes for the brand-voice question (Gabriel/Victoria).
- [ ] Look up Octopus Energy / Tesla Powerwall / SunRun's signup flows for the "competitive" question.
- [ ] Memorize the cost-per-install formula.
- [ ] Pre-write the 3 hardest-to-answer pushbacks (58% number, sales-call book risk, "why marketing not growth role"). Out loud, not on paper.
- [ ] Walk the prototype 5 times. Know exactly which path to switch to when which person speaks.
- [ ] Have one personal Base-related anecdote ready (a power outage you had, a generator story, etc.). Operator audiences eat that up.

---

*Pair with [`DECK.md`](./DECK.md), [`CONTEXT.md`](./CONTEXT.md), and the live demo.*
