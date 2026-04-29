// =============================================================================
// Base Power Growth PM — deck generator
// =============================================================================
// Generates dist/base-deck.pptx from the SLIDES.md outline.
// Upload the .pptx to Google Drive, right-click → Open with → Google Slides.
// Speaker notes import automatically.
// =============================================================================

import pptxgen from "pptxgenjs";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const IMG = (name) =>
  resolve(__dirname, "..", "public", "img", "slides", name);

// ---------- brand tokens (from Base's live stylesheet) -----------------------
const C = {
  ink: "292826",
  greenDeep: "102A17",
  greenDark: "1E4D2B",
  green: "77A45A",
  greenMid: "B2DD79",
  greenLight: "D6F0B4",
  cream: "F0EEEB",
  bg: "F7F6F3",
  white: "FFFFFF",
  red: "B83A2C",
  amber: "C68A2E",
  muted: "7F7D7A",
  line: "D8D7D5",
};

const FONT = "Inter"; // safe fallback; Tony can swap to "PP Neue Montreal" in Slides

// ---------- pres setup --------------------------------------------------------
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.33 × 7.5 in
pres.title = "Base Power — Growth PM Working Session";
pres.author = "Tony Rocca";
pres.company = "Base Power Company";

// =============================================================================
// HELPERS
// =============================================================================

function addEyebrow(slide, text, color = C.muted) {
  slide.addText(text.toUpperCase(), {
    x: 0.6, y: 0.4, w: 12, h: 0.3,
    fontFace: FONT, fontSize: 11, bold: true, color,
    charSpacing: 4,
  });
}

function addSlideNumber(slide, n, total) {
  slide.addText(`${n} / ${total}`, {
    x: 12.0, y: 7.0, w: 0.8, h: 0.3,
    fontFace: FONT, fontSize: 9, color: C.muted, align: "right",
  });
}

function addFooter(slide, text) {
  slide.addText(text, {
    x: 0.6, y: 7.0, w: 11, h: 0.3,
    fontFace: FONT, fontSize: 9, color: C.muted,
  });
}

// Wireframe step box. Each box is a stacked composition of:
//   - colored grade strip on top
//   - step number + name
//   - asked field
//   - purpose
function addStepBox(slide, x, y, w, h, opts) {
  const {
    n, name, asked, purpose, grade, gradeNote, accent, fillColor = C.white,
    borderColor = C.line, textColor = C.ink,
  } = opts;

  // accent strip
  slide.addShape(pres.ShapeType.rect, {
    x, y, w, h: 0.15, fill: { color: accent || C.line }, line: { type: "none" },
  });

  // body
  slide.addShape(pres.ShapeType.rect, {
    x, y: y + 0.15, w, h: h - 0.15,
    fill: { color: fillColor },
    line: { color: borderColor, width: 1 },
  });

  // step number
  slide.addText(`${n}`, {
    x: x + 0.1, y: y + 0.22, w: 0.5, h: 0.3,
    fontFace: FONT, fontSize: 10, bold: true, color: C.muted,
  });

  // step name
  slide.addText(name, {
    x: x + 0.1, y: y + 0.5, w: w - 0.2, h: 0.4,
    fontFace: FONT, fontSize: 11, bold: true, color: textColor,
    valign: "top",
  });

  // asked
  slide.addText(asked, {
    x: x + 0.1, y: y + 1.05, w: w - 0.2, h: 0.4,
    fontFace: FONT, fontSize: 9, color: textColor, italic: true,
    valign: "top",
  });

  // purpose
  slide.addText(purpose, {
    x: x + 0.1, y: y + 1.55, w: w - 0.2, h: 0.6,
    fontFace: FONT, fontSize: 9, color: C.muted, valign: "top",
  });

  // grade
  if (grade) {
    slide.addText(grade, {
      x: x + 0.1, y: y + h - 0.7, w: w - 0.2, h: 0.3,
      fontFace: FONT, fontSize: 18, bold: true, color: accent || textColor,
      align: "center",
    });
  }
  if (gradeNote) {
    slide.addText(gradeNote, {
      x: x + 0.1, y: y + h - 0.4, w: w - 0.2, h: 0.3,
      fontFace: FONT, fontSize: 8, color: C.muted, align: "center", italic: true,
    });
  }
}

function addArrow(slide, x, y) {
  slide.addText("→", {
    x, y, w: 0.4, h: 0.3,
    fontFace: FONT, fontSize: 18, color: C.muted, align: "center",
  });
}

const TOTAL = 16; // 7 main + 1 comparison + 1 divider + 7 appendix

// =============================================================================
// SLIDE 1 — THESIS (with hero photo)
// =============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  // Hero photo on right half (full bleed top-to-bottom)
  s.addImage({
    path: IMG("hero-house.png"),
    x: 6.7, y: 0, w: 6.63, h: 7.5,
    sizing: { type: "cover", w: 6.63, h: 7.5 },
  });

  // Soft gradient panel over the left side of the photo for a clean text edge
  s.addShape(pres.ShapeType.rect, {
    x: 6.4, y: 0, w: 0.5, h: 7.5,
    fill: { color: C.cream, transparency: 30 },
    line: { type: "none" },
  });

  s.addText("THESIS · 1 / 8", {
    x: 0.6, y: 0.6, w: 6, h: 0.3,
    fontFace: FONT, fontSize: 11, bold: true, color: C.green, charSpacing: 4,
  });

  s.addText("Every step in a funnel must earn its place.", {
    x: 0.6, y: 1.4, w: 5.9, h: 2.0,
    fontFace: FONT, fontSize: 42, bold: true, color: C.ink,
  });

  s.addText("Today's funnel has tax.", {
    x: 0.6, y: 3.7, w: 5.9, h: 0.7,
    fontFace: FONT, fontSize: 24, color: C.greenDark, italic: true,
  });

  s.addText(
    "Especially when you're asking permission to install hardware in someone's backyard.",
    {
      x: 0.6, y: 4.6, w: 5.7, h: 0.9,
      fontFace: FONT, fontSize: 14, color: C.muted,
    },
  );

  // accent line
  s.addShape(pres.ShapeType.rect, {
    x: 0.6, y: 6.0, w: 1.2, h: 0.04, fill: { color: C.green }, line: { type: "none" },
  });

  s.addText("Tony Rocca · Growth PM working session", {
    x: 0.6, y: 6.15, w: 6, h: 0.3,
    fontFace: FONT, fontSize: 10, color: C.muted, charSpacing: 2,
  });

  s.addNotes(
    `30s open. A funnel is sacred. Every step has to do work — qualify, capture, build trust, set up the next interaction. If a step doesn't change a downstream action, it's tax on the customer and on the business. Base sells trust, and trust transactions can't tolerate tax. So the question for every step is the same: what is this step for, and what would it cost us to remove it?`,
  );

  addSlideNumber(s, 1, TOTAL);
}

// =============================================================================
// SLIDE 2 — THE LEAK
// =============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.white };

  addEyebrow(s, "The leak · 2 / 8");

  s.addText("19,000 qualified visitors lost at one step. Every month.", {
    x: 0.6, y: 0.9, w: 12, h: 1.2,
    fontFace: FONT, fontSize: 36, bold: true, color: C.ink,
  });

  // funnel bars
  const funnel = [
    { label: "Pageview",    n: "220,440", pct: "100%",  w: 11, color: C.greenDeep },
    { label: "Address",     n: "34,668",  pct: "15.7%", w: 7.5, color: C.greenDark },
    { label: "Qualify",     n: "27,008",  pct: "12.3%", w: 6.5, color: C.greenDark },
    { label: "Lead",        n: "7,660",   pct: "3.5%",  w: 2.0, color: C.red },
    { label: "Sales call",  n: "3,992",   pct: "1.8%",  w: 1.0, color: C.greenDark },
  ];

  let y = 2.6;
  funnel.forEach((f, i) => {
    s.addShape(pres.ShapeType.rect, {
      x: 0.6, y, w: f.w, h: 0.55,
      fill: { color: f.color }, line: { type: "none" },
    });
    s.addText(`${f.label} · ${f.n}  (${f.pct})`, {
      x: 0.7, y, w: f.w - 0.2, h: 0.55,
      fontFace: FONT, fontSize: 14, bold: true, color: C.white, valign: "middle",
    });

    if (f.label === "Lead") {
      s.addText("🔴 71% drop · 19,348 humans gone", {
        x: 2.7, y, w: 7, h: 0.55,
        fontFace: FONT, fontSize: 13, bold: true, color: C.red, valign: "middle",
      });
    }
    y += 0.7;
  });

  s.addText("That's the entire case.", {
    x: 0.6, y: 6.5, w: 12, h: 0.5,
    fontFace: FONT, fontSize: 18, italic: true, color: C.greenDark,
  });

  s.addNotes(
    `Twenty-seven thousand qualify each month. Seven-point-six thousand finish and give us their info. Same step, every month. That's the entire case. Everything else in this deck is in service of this one number.`,
  );

  addSlideNumber(s, 2, TOTAL);
}

// =============================================================================
// SLIDE 3 — TODAY'S FUNNEL, GRADED
// =============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  addEyebrow(s, "Today's funnel · graded ruthlessly · 3 / 8");

  s.addText("Earns its place ✓ · earns it at the wrong time ⚠ · doesn't earn it ✗", {
    x: 0.6, y: 0.85, w: 12.2, h: 0.7,
    fontFace: FONT, fontSize: 22, bold: true, color: C.ink,
  });

  // 9 step boxes — wireframe row
  const boxes = [
    { n: 1, name: "Address",   asked: "Address",        purpose: "Verify deliverable", grade: "✓",  gradeNote: "earns place",    accent: C.green },
    { n: 2, name: "Own/rent",  asked: "Own/rent",       purpose: "Hard DQ",            grade: "✓",  gradeNote: "earns place",    accent: C.green },
    { n: 3, name: "Reason",    asked: "Why Base?",      purpose: "Segment user",       grade: "⚠",  gradeNote: "recoverable",    accent: C.amber },
    { n: 4, name: "Interstitial", asked: "(none)",      purpose: "\"Educate\"",        grade: "✗",  gradeNote: "fluff",          accent: C.red },
    { n: 5, name: "Provider",  asked: "Utility",        purpose: "Verify provider",    grade: "⚠",  gradeNote: "auto-fillable",  accent: C.amber },
    { n: 6, name: "Setup",     asked: "Solar/gen/etc.", purpose: "Compatibility",      grade: "⚠",  gradeNote: "deferable",      accent: C.amber },
    { n: 7, name: "Interstitial", asked: "(none)",      purpose: "\"Educate\"",        grade: "✗",  gradeNote: "fluff",          accent: C.red },
    { n: 8, name: "Lead capture", asked: "Name+Phone+Email+TCPA", purpose: "Capture", grade: "⚠",  gradeNote: "wrong moment 🔴", accent: C.red },
    { n: 9, name: "Video+Sched.", asked: "Photo review", purpose: "Schedule",         grade: "✗",  gradeNote: "kills comp.",    accent: C.red },
  ];

  const startX = 0.4;
  const boxW = 1.36;
  const gap = 0.07;
  const boxY = 1.85;
  const boxH = 4.4;

  boxes.forEach((b, i) => {
    addStepBox(s, startX + i * (boxW + gap), boxY, boxW, boxH, b);
  });

  // 71% drop annotation arrow under the leak
  s.addShape(pres.ShapeType.rect, {
    x: 9.7, y: 6.45, w: 1.36, h: 0.4,
    fill: { color: C.red }, line: { type: "none" },
  });
  s.addText("🔴 71% DROP · 19,000/mo", {
    x: 9.7, y: 6.45, w: 1.36, h: 0.4,
    fontFace: FONT, fontSize: 10, bold: true, color: C.white, align: "center", valign: "middle",
  });

  addFooter(
    s,
    "9 steps · only 2 fully earn their place · 2 shouldn't exist (interstitials) · 1 is actively hostile (video) · lead capture earns it but at the worst moment.",
  );

  s.addNotes(
    `LIVE walkthrough Path 0 in the prototype, ~3 minutes. Anchor each screen to its grade.

Say: "I'm a customer. I just gave you my address. Now I'm answering 7 questions before you ask me my name. The form's job switched from helping me to qualifying me — and I notice. I'm not asking 'how do we make these steps better?' I'm asking why does this step exist? If the answer is fluffy, the step is fluff."

Don't read the wireframe — point and walk.`,
  );

  addSlideNumber(s, 3, TOTAL);
}

// =============================================================================
// SLIDE 4 — DIAGNOSIS + PRIORITIZATION + 4 PATHS
// =============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.white };

  addEyebrow(s, "Diagnosis · prioritization methodology · 4 / 8");

  s.addText(
    "Two questions for every field: can we recover it, and does it cost us conversion?",
    {
      x: 0.6, y: 0.85, w: 12.2, h: 1.0,
      fontFace: FONT, fontSize: 22, bold: true, color: C.ink,
    },
  );

  s.addText("That's how a step earns its place. Same methodology, three levels.", {
    x: 0.6, y: 1.85, w: 12, h: 0.4,
    fontFace: FONT, fontSize: 13, italic: true, color: C.muted,
  });

  // 2x2 grid (left half)
  const gridX = 0.6, gridY = 2.5, cellW = 3.0, cellH = 2.0;

  s.addShape(pres.ShapeType.rect, { x: gridX,           y: gridY,          w: cellW, h: cellH, fill: { color: C.cream }, line: { color: C.line } });
  s.addShape(pres.ShapeType.rect, { x: gridX + cellW,   y: gridY,          w: cellW, h: cellH, fill: { color: C.cream }, line: { color: C.line } });
  s.addShape(pres.ShapeType.rect, { x: gridX,           y: gridY + cellH,  w: cellW, h: cellH, fill: { color: C.cream }, line: { color: C.line } });
  s.addShape(pres.ShapeType.rect, { x: gridX + cellW,   y: gridY + cellH,  w: cellW, h: cellH, fill: { color: C.cream }, line: { color: C.line } });

  // axis labels
  s.addText("LOW FRICTION",  { x: gridX,         y: gridY - 0.4, w: cellW, h: 0.3, fontFace: FONT, fontSize: 10, bold: true, color: C.muted, align: "center", charSpacing: 2 });
  s.addText("HIGH FRICTION", { x: gridX + cellW, y: gridY - 0.4, w: cellW, h: 0.3, fontFace: FONT, fontSize: 10, bold: true, color: C.muted, align: "center", charSpacing: 2 });
  s.addText("LOW\nRECOV.",   { x: gridX - 0.7,   y: gridY,       w: 0.7, h: cellH, fontFace: FONT, fontSize: 10, bold: true, color: C.muted, align: "center", valign: "middle", charSpacing: 1 });
  s.addText("HIGH\nRECOV.",  { x: gridX - 0.7,   y: gridY + cellH, w: 0.7, h: cellH, fontFace: FONT, fontSize: 10, bold: true, color: C.muted, align: "center", valign: "middle", charSpacing: 1 });

  // cell content
  s.addText("ASK FIRST\n• Address ✓ (s1)\n• Email ✗ (s8)\n• Name ✗ (s8)", {
    x: gridX + 0.15, y: gridY + 0.1, w: cellW - 0.3, h: cellH - 0.2,
    fontFace: FONT, fontSize: 11, color: C.ink, valign: "top",
  });
  s.addText("ASK LATER\n• Phone ⚠ (s8)\n  high-friction,\n  asked too early", {
    x: gridX + cellW + 0.15, y: gridY + 0.1, w: cellW - 0.3, h: cellH - 0.2,
    fontFace: FONT, fontSize: 11, color: C.ink, valign: "top",
  });
  s.addText("DEFER / OPTIONAL\n• Reason\n• Own/rent\n• Provider (auto-fill)", {
    x: gridX + 0.15, y: gridY + cellH + 0.1, w: cellW - 0.3, h: cellH - 0.2,
    fontFace: FONT, fontSize: 11, color: C.ink, valign: "top",
  });
  s.addText("SKIP / POST-LEAD\n• Energy setup\n  (verify in photo\n   review)", {
    x: gridX + cellW + 0.15, y: gridY + cellH + 0.1, w: cellW - 0.3, h: cellH - 0.2,
    fontFace: FONT, fontSize: 11, color: C.ink, valign: "top",
  });

  // right half — three levels of prioritization + paths table
  const rightX = 7.4;

  s.addText("Three levels of prioritization", {
    x: rightX, y: 2.3, w: 5.5, h: 0.4,
    fontFace: FONT, fontSize: 14, bold: true, color: C.ink,
  });

  s.addText(
    "▸ Field-level: Recoverability × Friction (this 2×2)\n" +
    "▸ Path-level: ICE + leak size as tiebreaker\n" +
    "▸ Wave-level: learning velocity, not impact",
    {
      x: rightX, y: 2.7, w: 5.5, h: 1.1,
      fontFace: FONT, fontSize: 11, color: C.ink, lineSpacingMultiple: 1.4,
    },
  );

  s.addText("Four paths evaluated", {
    x: rightX, y: 3.95, w: 5.5, h: 0.4,
    fontFace: FONT, fontSize: 14, bold: true, color: C.ink,
  });

  const pathsTable = [
    [
      { text: "Path", options: { bold: true, color: C.muted, fontSize: 10 } },
      { text: "Risk", options: { bold: true, color: C.muted, fontSize: 10 } },
      { text: "Effort", options: { bold: true, color: C.muted, fontSize: 10 } },
      { text: "Why not first", options: { bold: true, color: C.muted, fontSize: 10 } },
    ],
    [
      { text: "D — Polish", options: { fontSize: 10 } },
      { text: "Very low", options: { fontSize: 10 } },
      { text: "1wk", options: { fontSize: 10 } },
      { text: "Doesn't fix structure", options: { fontSize: 10 } },
    ],
    [
      { text: "C — Auto-fill", options: { fontSize: 10 } },
      { text: "Low", options: { fontSize: 10 } },
      { text: "3wk", options: { fontSize: 10 } },
      { text: "Needs Wave 1 data first", options: { fontSize: 10 } },
    ],
    [
      { text: "B — Delete", options: { fontSize: 10 } },
      { text: "Med-high", options: { fontSize: 10 } },
      { text: "4wk", options: { fontSize: 10 } },
      { text: "Highest sales risk", options: { fontSize: 10 } },
    ],
    [
      { text: "A — Reorder ★", options: { bold: true, color: C.greenDark, fontSize: 10 } },
      { text: "Low", options: { bold: true, color: C.greenDark, fontSize: 10 } },
      { text: "2-3wk", options: { bold: true, color: C.greenDark, fontSize: 10 } },
      { text: "the recommendation", options: { bold: true, color: C.greenDark, fontSize: 10 } },
    ],
  ];

  s.addTable(pathsTable, {
    x: rightX, y: 4.4, w: 5.7,
    colW: [1.6, 1.0, 0.7, 2.4],
    fontFace: FONT,
    border: { type: "solid", pt: 0.5, color: C.line },
  });

  s.addText("Why A first: cleanest 1:1 with diagnosis · lowest data risk · email recovery is a free byproduct.", {
    x: 0.6, y: 6.65, w: 12.2, h: 0.4,
    fontFace: FONT, fontSize: 12, italic: true, color: C.greenDark,
  });

  s.addNotes(
    `One framework — Recoverability × Friction. For every field: can we recover it if the user bails, and how much does asking it cost in drop-off? Plot Base's fields and the diagnosis writes itself: unrecoverable fields scattered, the high-friction one bundled with easy ones.

Same methodology applied to paths and waves. Four fixes evaluated. A wins Wave 1 because it's the cleanest one-to-one with the diagnosis, lowest data risk, and email recovery as a free byproduct.

If asked about prioritization methodology — point at this slide. Three levels: field, path, wave.`,
  );

  addSlideNumber(s, 4, TOTAL);
}

// =============================================================================
// SLIDE 5 — THE FIX: PATH A
// =============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  addEyebrow(s, "The fix · Path A: Email-First · 5 / 8", C.greenDark);

  s.addText("7 steps. Every one earns its place.", {
    x: 0.6, y: 0.85, w: 12.2, h: 0.7,
    fontFace: FONT, fontSize: 26, bold: true, color: C.ink,
  });

  s.addText("Same data captured. Less form. Recovery channel as a free byproduct.", {
    x: 0.6, y: 1.55, w: 12.2, h: 0.4,
    fontFace: FONT, fontSize: 13, italic: true, color: C.muted,
  });

  // 7 step boxes
  const boxes = [
    { n: 1, name: "Address",        asked: "Address",         purpose: "Verify deliverable",          grade: "✓", gradeNote: "unchanged",        accent: C.green },
    { n: 2, name: "★ Email",         asked: "Email",          purpose: "Unlock recovery channel",     grade: "✓", gradeNote: "was @ #8",         accent: C.green },
    { n: 3, name: "Own/rent",       asked: "Own/rent",        purpose: "Hard DQ",                     grade: "✓", gradeNote: "was @ #2",         accent: C.green },
    { n: 4, name: "🔀 Reason+Prov.", asked: "Why+utility",    purpose: "Segment+verify on 1 screen",  grade: "✓", gradeNote: "was #3+#5",        accent: C.green },
    { n: 5, name: "Setup (opt.)",   asked: "Solar/gen/etc.",  purpose: "Verify in photo review",      grade: "✓", gradeNote: "skippable",        accent: C.green },
    { n: 6, name: "★ Name+Price",    asked: "Name + plan",    purpose: "Build trust by showing value",grade: "✓", gradeNote: "was @ #8",         accent: C.green },
    { n: 7, name: "★ Phone+Sched.",  asked: "Phone (text)",   purpose: "Phone asked when needed",     grade: "✓", gradeNote: "was @ #8+#9",      accent: C.green },
  ];

  const startX = 0.6;
  const boxW = 1.7;
  const gap = 0.1;
  const boxY = 2.2;
  const boxH = 4.0;

  boxes.forEach((b, i) => {
    addStepBox(s, startX + i * (boxW + gap), boxY, boxW, boxH, b);
  });

  // cuts and adds
  s.addText(
    "✗ Two educational interstitials cut    ✗ Mid-flow YouTube video cut    ✗ \"Last step — save your progress\" copy lie cut",
    {
      x: 0.6, y: 6.4, w: 12.2, h: 0.3,
      fontFace: FONT, fontSize: 11, color: C.red,
    },
  );

  s.addText(
    "✓ Real progress bar (\"~Ns left\")    ✓ Local social proof    ✓ Email recovery channel (every bailer post-step-2 reachable)",
    {
      x: 0.6, y: 6.75, w: 12.2, h: 0.3,
      fontFace: FONT, fontSize: 11, color: C.greenDark,
    },
  );

  s.addNotes(
    `LIVE walkthrough Path A in the prototype, ~5 minutes. Pause on the email moment. Pause on pricing preview before phone. End on schedule-a-call screen.

Say: "Same data. Same fit-check rigor. The form just stops asking the customer to trust us before we've shown them anything."

This is the centerpiece — give it the time. Audience should see the rearrangement before you narrate it.`,
  );

  addSlideNumber(s, 5, TOTAL);
}

// =============================================================================
// SLIDE 5b — SIDE-BY-SIDE COMPARISON (real screens)
// =============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  addEyebrow(s, "Side-by-side · 6 / 8", C.greenDark);

  s.addText("What the user actually sees.", {
    x: 0.6, y: 0.85, w: 12.2, h: 0.7,
    fontFace: FONT, fontSize: 26, bold: true, color: C.ink,
  });

  s.addText("Today's contact step vs. Path A's first ask. Same data captured by the end. Different feeling at the start.", {
    x: 0.6, y: 1.55, w: 12.2, h: 0.4,
    fontFace: FONT, fontSize: 13, italic: true, color: C.muted,
  });

  // ---------- Today (left)
  s.addText("TODAY · STEP 8", {
    x: 1.5, y: 2.15, w: 4.5, h: 0.3,
    fontFace: FONT, fontSize: 11, bold: true, color: C.red, charSpacing: 3,
  });
  s.addText("Name + Phone + Email + TCPA legalese, all on one screen, after 7 questions.", {
    x: 1.5, y: 2.5, w: 4.5, h: 0.6,
    fontFace: FONT, fontSize: 11, color: C.ink, italic: true,
  });
  s.addImage({
    path: IMG("path0-leadcap.png"),
    x: 1.5, y: 3.2, w: 2.4, h: 4.3,
    sizing: { type: "contain", w: 2.4, h: 4.3 },
  });
  // Annotations
  s.addText("✗ \"Save your progress\" — copy lies", { x: 4.0, y: 3.4, w: 2.6, h: 0.3, fontFace: FONT, fontSize: 9, color: C.red, italic: true });
  s.addText("✗ TCPA legalese surfaced", { x: 4.0, y: 3.7, w: 2.6, h: 0.3, fontFace: FONT, fontSize: 9, color: C.red, italic: true });
  s.addText("✗ Phone bundled with name+email", { x: 4.0, y: 4.0, w: 2.6, h: 0.3, fontFace: FONT, fontSize: 9, color: C.red, italic: true });
  s.addText("✗ All asked at the worst moment", { x: 4.0, y: 4.3, w: 2.6, h: 0.3, fontFace: FONT, fontSize: 9, color: C.red, italic: true });

  // ---------- Path A (right)
  s.addText("PATH A · STEP 2", {
    x: 7.5, y: 2.15, w: 4.5, h: 0.3,
    fontFace: FONT, fontSize: 11, bold: true, color: C.greenDark, charSpacing: 3,
  });
  s.addText("Email captured upfront with value framing. Phone deferred to the schedule moment.", {
    x: 7.5, y: 2.5, w: 4.5, h: 0.6,
    fontFace: FONT, fontSize: 11, color: C.ink, italic: true,
  });
  s.addImage({
    path: IMG("pathA-step0.png"),
    x: 7.5, y: 3.2, w: 2.4, h: 4.3,
    sizing: { type: "contain", w: 2.4, h: 4.3 },
  });
  s.addText("✓ Real progress bar (\"~40s left\")", { x: 10.0, y: 3.4, w: 2.8, h: 0.3, fontFace: FONT, fontSize: 9, color: C.greenDark, italic: true });
  s.addText("✓ \"Where should we send your plan?\"", { x: 10.0, y: 3.7, w: 2.8, h: 0.3, fontFace: FONT, fontSize: 9, color: C.greenDark, italic: true });
  s.addText("✓ Value framing, not transactional", { x: 10.0, y: 4.0, w: 2.8, h: 0.3, fontFace: FONT, fontSize: 9, color: C.greenDark, italic: true });
  s.addText("✓ Recovery channel unlocked", { x: 10.0, y: 4.3, w: 2.8, h: 0.3, fontFace: FONT, fontSize: 9, color: C.greenDark, italic: true });

  // Divider
  s.addShape(pres.ShapeType.line, {
    x: 6.65, y: 2.15, w: 0, h: 5.0,
    line: { color: C.line, width: 1, dashType: "dash" },
  });

  s.addNotes(
    `Quick anchor slide between the wireframes and the plan. Don't read it — let the audience compare. The contrast is the message.

If asked which is more "Base voice" — Path A. The fact that Base says "membership" not "subscription" tells me the voice avoids transactional framing. Path A leans into that.`,
  );

  addSlideNumber(s, 6, TOTAL);
}

// =============================================================================
// SLIDE 7 — MAKE IT REAL
// =============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.white };

  addEyebrow(s, "Make it real · 7 / 8");

  s.addText("3 people · 9 weeks · every test earns its place or it dies.", {
    x: 0.6, y: 0.85, w: 12.2, h: 0.8,
    fontFace: FONT, fontSize: 26, bold: true, color: C.ink,
  });

  // three columns: math · waves · team+guardrails
  const colY = 2.0, colH = 4.5, col1X = 0.6, col2X = 5.0, col3X = 9.4;

  // -------- math
  s.addText("THE MATH", {
    x: col1X, y: colY, w: 4.2, h: 0.3,
    fontFace: FONT, fontSize: 11, bold: true, color: C.greenDark, charSpacing: 3,
  });
  s.addText(
    "3.5% → 8% means moving qualify→lead from 28% to ~58%.\n\n" +
    "Short-form completion benchmarks: 40-60%. Cutting form length, deferring phone, and adding email recovery puts us mid-band — not ceiling.\n\n" +
    "100% of the lift comes from the qualify→lead step. This plan is honest about that.",
    {
      x: col1X, y: colY + 0.4, w: 4.2, h: colH - 0.5,
      fontFace: FONT, fontSize: 12, color: C.ink, valign: "top", lineSpacingMultiple: 1.3,
    },
  );

  // -------- waves
  s.addText("THE WAVES", {
    x: col2X, y: colY, w: 4.2, h: 0.3,
    fontFace: FONT, fontSize: 11, bold: true, color: C.greenDark, charSpacing: 3,
  });

  const wavesTable = [
    [
      { text: "W", options: { bold: true, fontSize: 10, color: C.muted } },
      { text: "Wks", options: { bold: true, fontSize: 10, color: C.muted } },
      { text: "Path", options: { bold: true, fontSize: 10, color: C.muted } },
      { text: "Milestone", options: { bold: true, fontSize: 10, color: C.muted } },
    ],
    [{ text: "0", options: { fontSize: 10 } },  { text: "0-1",   options: { fontSize: 10 } }, { text: "Setup", options: { fontSize: 10 } }, { text: "Flags + events", options: { fontSize: 10 } }],
    [{ text: "1", options: { fontSize: 10, bold: true } }, { text: "1-3",   options: { fontSize: 10, bold: true } }, { text: "A ★", options: { fontSize: 10, bold: true, color: C.greenDark } }, { text: "Locked read W3", options: { fontSize: 10, bold: true } }],
    [{ text: "2", options: { fontSize: 10 } },  { text: "4-5",   options: { fontSize: 10 } }, { text: "D layered", options: { fontSize: 10 } }, { text: "Cumulative W5", options: { fontSize: 10 } }],
    [{ text: "3", options: { fontSize: 10 } },  { text: "6-8",   options: { fontSize: 10 } }, { text: "C @ 25%", options: { fontSize: 10 } }, { text: "Read W8", options: { fontSize: 10 } }],
    [{ text: "4", options: { fontSize: 10 } },  { text: "9-12",  options: { fontSize: 10 } }, { text: "B @ 10%", options: { fontSize: 10 } }, { text: "8% confirmed W9", options: { fontSize: 10 } }],
  ];

  s.addTable(wavesTable, {
    x: col2X, y: colY + 0.4, w: 4.2,
    colW: [0.4, 0.7, 1.1, 2.0],
    fontFace: FONT,
    border: { type: "solid", pt: 0.5, color: C.line },
  });

  s.addText(
    "Headline: first lift end of W2 · 8% confirmed by W9.",
    {
      x: col2X, y: colY + 3.5, w: 4.2, h: 0.5,
      fontFace: FONT, fontSize: 11, italic: true, color: C.greenDark,
    },
  );

  // -------- team & guardrails
  s.addText("THE TEAM", {
    x: col3X, y: colY, w: 3.4, h: 0.3,
    fontFace: FONT, fontSize: 11, bold: true, color: C.greenDark, charSpacing: 3,
  });
  s.addText(
    "1 PM · 1 designer (PT) · 1-2 FE engineers · feature flag system\n\nXfn: design 4hrs/wk · legal (TCPA review, 1-time) · data eng (event taxonomy, 1 sprint).",
    {
      x: col3X, y: colY + 0.4, w: 3.4, h: 1.7,
      fontFace: FONT, fontSize: 11, color: C.ink, valign: "top", lineSpacingMultiple: 1.3,
    },
  );

  s.addText("GUARDRAILS — KILL THE TEST IF:", {
    x: col3X, y: colY + 2.3, w: 3.4, h: 0.3,
    fontFace: FONT, fontSize: 10, bold: true, color: C.red, charSpacing: 2,
  });
  s.addText(
    "• Install-qual rate ↓ > 5% absolute\n" +
    "• Sales-call book ↓ > 10% relative\n" +
    "• Cost-per-install ↑ > 5%   (north star)\n" +
    "• Install-completion ↓ at all  (zero tolerance)",
    {
      x: col3X, y: colY + 2.7, w: 3.4, h: 1.8,
      fontFace: FONT, fontSize: 10, color: C.ink, valign: "top", lineSpacingMultiple: 1.4,
    },
  );

  addFooter(s, "We don't need a growth team. We need a strike team and a feature flag.");

  s.addNotes(
    `Three columns at a glance — math · waves · team+guardrails. Don't read each. Point.

Say: "We don't need a growth team. We need a strike team and a feature flag. First lift in 2 weeks. 8% by week 9. Cost-per-install is the north star, not cost-per-lead — we don't game the metric. Every test has a kill criterion before kickoff."`,
  );

  addSlideNumber(s, 6, TOTAL);
}

// =============================================================================
// SLIDE 7 — DISCUSSION
// =============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.greenDeep };

  s.addText("DISCUSSION · 8 / 8", {
    x: 0.6, y: 0.6, w: 8, h: 0.3,
    fontFace: FONT, fontSize: 11, bold: true, color: C.greenMid, charSpacing: 4,
  });

  s.addText("Tax or signal? You tell me.", {
    x: 0.6, y: 1.5, w: 12, h: 1.2,
    fontFace: FONT, fontSize: 44, bold: true, color: C.white,
  });

  const questions = [
    "Which form fields actually change a sales script? Anything that doesn't is tax — first to cut.",
    "What's the lead-quality floor below which sales pushes back? I want a number, not a vibe.",
    "What's your install-capacity ceiling per week? If Wave 1 2x's leads, can ops keep up?",
  ];

  questions.forEach((q, i) => {
    s.addText(`${i + 1}`, {
      x: 0.6, y: 3.4 + i * 1.0, w: 0.5, h: 0.6,
      fontFace: FONT, fontSize: 28, bold: true, color: C.greenMid,
    });
    s.addText(q, {
      x: 1.2, y: 3.45 + i * 1.0, w: 11.5, h: 0.7,
      fontFace: FONT, fontSize: 16, color: C.white, lineSpacingMultiple: 1.3,
    });
  });

  s.addText(
    "I built this as a working session, not a pitch. Help me grade what's tax. Where am I wrong?",
    {
      x: 0.6, y: 6.7, w: 12, h: 0.4,
      fontFace: FONT, fontSize: 13, italic: true, color: C.greenLight,
    },
  );

  s.addNotes(
    `Three questions, then zip it and listen. The frame I want to leave with: every step is either earning its place or it's tax on the customer. Help me grade what's tax.

Use names. When someone offers a sharp answer, reflect it back: "Cooper just said something important — let's pause on that."`,
  );

  addSlideNumber(s, 7, TOTAL);
}

// =============================================================================
// APPENDIX TITLE PAGE
// =============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  s.addText("APPENDIX", {
    x: 0.6, y: 2.5, w: 12, h: 1.2,
    fontFace: FONT, fontSize: 64, bold: true, color: C.greenDark, charSpacing: 8,
  });
  s.addText("Backup slides for likely questions. Tabbed and ready.", {
    x: 0.6, y: 4.0, w: 12, h: 0.6,
    fontFace: FONT, fontSize: 18, color: C.muted, italic: true,
  });

  s.addText(
    "A1 · The math    A2 · Four paths compared    A3 · Sales risk + rollback\n" +
    "A4 · Source-level segmentation    A5 · Technical implementation\n" +
    "A6 · Brand voice + copy variants    A7 · What I cut from the plan",
    {
      x: 0.6, y: 5.0, w: 12, h: 1.5,
      fontFace: FONT, fontSize: 13, color: C.ink, lineSpacingMultiple: 1.6,
    },
  );

  addSlideNumber(s, 9, TOTAL);
}

// =============================================================================
// APPENDIX HELPER
// =============================================================================
function appendixSlide({ id, forWhom, title, sections, notes, slideNum }) {
  const s = pres.addSlide();
  s.background = { color: C.white };

  addEyebrow(s, `${id} · for ${forWhom}`, C.greenDark);

  s.addText(title, {
    x: 0.6, y: 0.85, w: 12.2, h: 0.8,
    fontFace: FONT, fontSize: 28, bold: true, color: C.ink,
  });

  let y = 1.85;
  sections.forEach((sec) => {
    if (sec.heading) {
      s.addText(sec.heading.toUpperCase(), {
        x: 0.6, y, w: 12.2, h: 0.3,
        fontFace: FONT, fontSize: 11, bold: true, color: C.greenDark, charSpacing: 3,
      });
      y += 0.35;
    }
    if (sec.body) {
      s.addText(sec.body, {
        x: 0.6, y, w: 12.2, h: sec.height || 1.0,
        fontFace: FONT, fontSize: 12, color: C.ink, lineSpacingMultiple: 1.4,
        valign: "top",
      });
      y += (sec.height || 1.0) + 0.15;
    }
    if (sec.table) {
      s.addTable(sec.table.rows, {
        x: 0.6, y, w: 12.2,
        colW: sec.table.colW,
        fontFace: FONT,
        border: { type: "solid", pt: 0.5, color: C.line },
      });
      y += sec.table.height || 2.0;
    }
  });

  if (notes) s.addNotes(notes);
  addSlideNumber(s, slideNum, TOTAL);
}

// =============================================================================
// A1 — THE MATH
// =============================================================================
appendixSlide({
  id: "A1",
  forWhom: "Thejas, Cole",
  title: "The math, in detail",
  slideNum: 10,
  sections: [
    {
      heading: "Funnel today vs. target",
      table: {
        rows: [
          [
            { text: "Step", options: { bold: true, fontSize: 11, color: C.muted } },
            { text: "Today", options: { bold: true, fontSize: 11, color: C.muted } },
            { text: "Target", options: { bold: true, fontSize: 11, color: C.muted } },
            { text: "Lever", options: { bold: true, fontSize: 11, color: C.muted } },
          ],
          [
            { text: "Pageview → Address", options: { fontSize: 11 } },
            { text: "15.7%", options: { fontSize: 11 } },
            { text: "17%", options: { fontSize: 11 } },
            { text: "Wave 2 polish (small)", options: { fontSize: 11 } },
          ],
          [
            { text: "Address → Qualify", options: { fontSize: 11 } },
            { text: "77.9%", options: { fontSize: 11 } },
            { text: "78%", options: { fontSize: 11 } },
            { text: "Geographic, no change", options: { fontSize: 11 } },
          ],
          [
            { text: "Qualify → Lead", options: { fontSize: 11, bold: true, color: C.greenDark } },
            { text: "28.4%", options: { fontSize: 11, bold: true, color: C.greenDark } },
            { text: "~58%", options: { fontSize: 11, bold: true, color: C.greenDark } },
            { text: "Wave 1 (Path A) — the lever", options: { fontSize: 11, bold: true, color: C.greenDark } },
          ],
          [
            { text: "Pageview → Lead", options: { fontSize: 11, bold: true } },
            { text: "3.47%", options: { fontSize: 11, bold: true } },
            { text: "~7.7%", options: { fontSize: 11, bold: true } },
            { text: "Math works", options: { fontSize: 11, bold: true } },
          ],
        ],
        colW: [4.0, 1.5, 1.5, 5.2],
        height: 2.6,
      },
    },
    {
      heading: "Why ~58% defensible (not magic)",
      body:
        "▸ Industry short-form benchmarks (Formstack, Zuko): 50-65% for 4-8 field forms.\n" +
        "▸ Path A cuts 2 interstitials + 1 video page → effective length 9 → 7 screens (1 optional).\n" +
        "▸ Phone removed from same step as name+email — highest-friction ask out of worst moment.\n" +
        "▸ Email recovery: +5-10% on top of in-flow rate.\n" +
        "▸ 58% is the middle of the band, not the ceiling.",
      height: 1.6,
    },
    {
      heading: "Sample size + read time (Wave 1)",
      body:
        "▸ Volume: ~13.5k visitors per arm per month at 50/50 split.\n" +
        "▸ MDE: 15% relative lift (28.4% → 32.7%) at 95% conf, 80% power → ~30k per arm.\n" +
        "▸ ~9-day directional read · ~14-day locked read. Wave 1 budget (Wks 1-3) is comfortable.\n" +
        "▸ CPI = (Mktg spend + amortized rep + amortized install) / installs in window. Not CPL.",
      height: 1.4,
    },
  ],
  notes: `Have the math written out. If Thejas goes deeper: re-baseline each new wave against current control to handle time effects. No multi-comparison correction needed for Wave 1 (single test vs control).`,
});

// =============================================================================
// A2 — FOUR PATHS COMPARED
// =============================================================================
appendixSlide({
  id: "A2",
  forWhom: "anyone",
  title: "All four paths compared",
  slideNum: 11,
  sections: [
    {
      table: {
        rows: [
          [
            { text: "Path", options: { bold: true, fontSize: 11, color: C.muted } },
            { text: "One-line", options: { bold: true, fontSize: 11, color: C.muted } },
            { text: "Risk", options: { bold: true, fontSize: 11, color: C.muted } },
            { text: "Effort", options: { bold: true, fontSize: 11, color: C.muted } },
            { text: "Q→L", options: { bold: true, fontSize: 11, color: C.muted } },
            { text: "Recovery upside", options: { bold: true, fontSize: 11, color: C.muted } },
            { text: "Wave", options: { bold: true, fontSize: 11, color: C.muted } },
          ],
          [
            { text: "A — Reorder ★", options: { bold: true, color: C.greenDark, fontSize: 11 } },
            { text: "Email upfront, phone deferred, 7 steps", options: { fontSize: 10 } },
            { text: "Low", options: { fontSize: 10 } },
            { text: "2-3wk", options: { fontSize: 10 } },
            { text: "~50%", options: { fontSize: 10 } },
            { text: "+5-10% via email", options: { fontSize: 10, bold: true, color: C.greenDark } },
            { text: "1", options: { bold: true, color: C.greenDark, fontSize: 11 } },
          ],
          [
            { text: "D — Polish", options: { fontSize: 11 } },
            { text: "Same fields, real progress, collapsed TCPA", options: { fontSize: 10 } },
            { text: "Very low", options: { fontSize: 10 } },
            { text: "1wk", options: { fontSize: 10 } },
            { text: "~35%", options: { fontSize: 10 } },
            { text: "None", options: { fontSize: 10 } },
            { text: "2", options: { fontSize: 11 } },
          ],
          [
            { text: "C — Auto-fill", options: { fontSize: 11 } },
            { text: "Provider auto-detected from address", options: { fontSize: 10 } },
            { text: "Low (high data risk)", options: { fontSize: 10 } },
            { text: "3wk", options: { fontSize: 10 } },
            { text: "~45%", options: { fontSize: 10 } },
            { text: "None", options: { fontSize: 10 } },
            { text: "3", options: { fontSize: 11 } },
          ],
          [
            { text: "B — Delete", options: { fontSize: 11 } },
            { text: "Skip qualification, 2 steps", options: { fontSize: 10 } },
            { text: "Med-high", options: { fontSize: 10 } },
            { text: "4wk", options: { fontSize: 10 } },
            { text: "65%+", options: { fontSize: 10 } },
            { text: "None", options: { fontSize: 10 } },
            { text: "4 (kill-switch only)", options: { fontSize: 11 } },
          ],
        ],
        colW: [1.6, 3.5, 1.4, 0.9, 0.9, 1.9, 2.0],
        height: 2.4,
      },
    },
    {
      heading: "Decision rationale",
      body:
        "A wins Wave 1 because it has the strongest mapping from the diagnosis, lowest data risk, and the only recovery upside. D could ship in a week but doesn't fix the structural problem — it polishes the wrong shape. B is the highest-impact lever but also the highest sales-risk; sequenced last with a kill switch. C is a data play that benefits from going second.",
      height: 1.6,
    },
  ],
  notes: `Use this slide whenever someone asks "why this path?" Walk the row order: A first (recommended), D second, C third, B last.`,
});

// =============================================================================
// A3 — SALES RISK + ROLLBACK
// =============================================================================
appendixSlide({
  id: "A3",
  forWhom: "Cooper, Cole",
  title: "Sales risk + rollback plan",
  slideNum: 12,
  sections: [
    {
      heading: "Wave 1 (Path A) is NOT a sales risk",
      body:
        "Same fields captured. Same qualification rigor. Only the order changes. Lead quality should be equivalent or slightly better — users who reach contact-info step have already invested more.",
      height: 0.9,
    },
    {
      heading: "Sales-risk lever is Wave 4 (Path B) — ships at 10% traffic with hard kill",
      body:
        "Hard kill thresholds (any one fires → flag flips to control in 2 hours):\n" +
        "▸ Sales-call book rate ↓ > 10% relative\n" +
        "▸ Photo-review pass rate ↓ > 5% absolute\n" +
        "▸ Call-to-deposit rate ↓ > 5% absolute\n" +
        "▸ Cost-per-install ↑ > 5%",
      height: 1.6,
    },
    {
      heading: "Rollback SLA",
      body:
        "▸ Auto-monitor on event stream (not weekly review)\n" +
        "▸ Flag flipped to 100% control within 2 hours of breach\n" +
        "▸ Engineering verifies traffic on control within 30 min of flip\n" +
        "▸ Post-mortem with root cause + variant decision within 48 hours",
      height: 1.4,
    },
    {
      heading: "Sales staffing flex",
      body:
        "Wave 1 expected +50% leads. Confirm rep capacity ceiling pre-launch. If unavailable, throttle Wave 1 to 25% traffic until staffing flexes.",
      height: 0.7,
    },
  ],
  notes: `For Cooper: lead with "Wave 1 is Path A, not Path B — same fields just reordered." Then pivot to the kill criteria for Wave 4.`,
});

// =============================================================================
// A4 — SOURCE-LEVEL SEGMENTATION
// =============================================================================
appendixSlide({
  id: "A4",
  forWhom: "Gabriel",
  title: "Source-level segmentation",
  slideNum: 13,
  sections: [
    {
      heading: "3.5% is a global average — sources behave differently",
      body: "Different traffic sources need different fixes. Treating all the same hides the real story.",
      height: 0.6,
    },
    {
      heading: "Hypothesized best-fit by source (validate in Wave 1)",
      table: {
        rows: [
          [
            { text: "Source", options: { bold: true, fontSize: 11, color: C.muted } },
            { text: "Intent", options: { bold: true, fontSize: 11, color: C.muted } },
            { text: "Likely best-fit", options: { bold: true, fontSize: 11, color: C.muted } },
            { text: "Why", options: { bold: true, fontSize: 11, color: C.muted } },
          ],
          [{ text: "Paid social", options: { fontSize: 11 } }, { text: "Low-impulse", options: { fontSize: 11 } }, { text: "B — Radically Short", options: { fontSize: 11 } }, { text: "Can't tolerate 9-step form", options: { fontSize: 11 } }],
          [{ text: "Paid search", options: { fontSize: 11 } }, { text: "High-intent", options: { fontSize: 11 } }, { text: "D + A reorder", options: { fontSize: 11 } }, { text: "User wants to convert", options: { fontSize: 11 } }],
          [{ text: "Organic + referral", options: { fontSize: 11 } }, { text: "Mid-high intent", options: { fontSize: 11 } }, { text: "A — Reorder ★", options: { fontSize: 11, bold: true, color: C.greenDark } }, { text: "Closest to baseline; A lifts cleanly", options: { fontSize: 11 } }],
          [{ text: "Awareness", options: { fontSize: 11, italic: true } }, { text: "Excluded", options: { fontSize: 11, italic: true } }, { text: "—", options: { fontSize: 11, italic: true } }, { text: "Out of scope per prompt", options: { fontSize: 11, italic: true } }],
        ],
        colW: [2.5, 2.0, 3.5, 4.2],
        height: 2.0,
      },
    },
    {
      heading: "Recommendation",
      body:
        "▸ Wave 1: Path A across all sources (single-variant for clean read).\n" +
        "▸ Waves 2-4: segment in analysis. Per-source variants if scale supports it (>3k visitors/source/week).\n" +
        "▸ Marketing handoff: every form change is a creative-team feedback loop. What ad creative drove the bailers we recover via email?",
      height: 1.5,
    },
    {
      heading: "Data ask",
      body: "Source-level breakdown of the 27k qualifying-step entries → 7.6k leads. Which source drives the leak?",
      height: 0.5,
    },
  ],
  notes: `Gabriel will likely lead with this concern. Use the table to show I've thought about it — then pivot back: "Wave 1 is single-variant for a clean read across the whole user base, then we segment."`,
});

// =============================================================================
// A5 — TECHNICAL IMPLEMENTATION
// =============================================================================
appendixSlide({
  id: "A5",
  forWhom: "David",
  title: "Technical implementation notes",
  slideNum: 14,
  sections: [
    {
      heading: "Feature flag layer (Wave 0)",
      body:
        "Compatible with Statsig / LaunchDarkly / GrowthBook / Vercel Edge Config. The prototype's useFlags() abstraction maps directly — replace fetcher with your service. Per-user assignment by anonymous ID, persisted across sessions.",
      height: 1.1,
    },
    {
      heading: "Path A plumbing",
      body:
        "▸ Email captured @ step 2 → fires qualifying_email_captured event with anonymous ID, source, UTM.\n" +
        "▸ Recovery flow: scheduled email at T+24h via marketing automation (Customer.io, Iterable, Braze).\n" +
        "▸ Pricing preview @ step 6 needs server-side rate lookup by ZIP. Latency budget <300ms.",
      height: 1.4,
    },
    {
      heading: "Path C provider auto-detect",
      body:
        "▸ Co-ops/municipal: deterministic from ZIP.\n" +
        "▸ Deregulated areas (~85% TX market): suggested + change link, fallback to question.\n" +
        "▸ Source: PUCT public dataset, refreshed quarterly.",
      height: 1.1,
    },
    {
      heading: "Event taxonomy additions (Wave 0 first sprint)",
      body:
        "step_view, step_complete, step_abandon (per qualifying step) · qualifying_email_captured · pricing_previewed · recovery_email_sent/clicked/captured.",
      height: 0.7,
    },
  ],
  notes: `For David: don't bluff specifics. If asked about exact tech stack, say "I'd validate that exact mapping with whoever owns this on the engineering side first."`,
});

// =============================================================================
// A6 — BRAND VOICE + COPY VARIANTS
// =============================================================================
appendixSlide({
  id: "A6",
  forWhom: "Victoria, Gabriel",
  title: "Brand voice + copy variants",
  slideNum: 15,
  sections: [
    {
      heading: "Voice observations from Base's site + reviews",
      body:
        "▸ \"Membership\" not \"subscription.\"\n" +
        "▸ Plain English, low-jargon (\"Power your home your way.\" \"Save money. Stay powered.\").\n" +
        "▸ Warmth without sentimentality — operator-friendly.\n" +
        "▸ TCPA legalese intentionally heavy (compliance) but visually buried in marketing copy.",
      height: 1.5,
    },
    {
      heading: "Path A copy choices + A/B variants for Wave 1",
      table: {
        rows: [
          [
            { text: "Step", options: { bold: true, fontSize: 11, color: C.muted } },
            { text: "My choice", options: { bold: true, fontSize: 11, color: C.muted } },
            { text: "Alt 1", options: { bold: true, fontSize: 11, color: C.muted } },
            { text: "Alt 2", options: { bold: true, fontSize: 11, color: C.muted } },
          ],
          [
            { text: "2 — Email", options: { fontSize: 10 } },
            { text: "Where should we send your custom plan?", options: { fontSize: 10 } },
            { text: "Save your spot — we'll email your plan.", options: { fontSize: 10 } },
            { text: "Get your personalized estimate.", options: { fontSize: 10 } },
          ],
          [
            { text: "6 — Pricing", options: { fontSize: 10 } },
            { text: "Your plan, [Name].", options: { fontSize: 10 } },
            { text: "Here's what Base looks like at [Address].", options: { fontSize: 10 } },
            { text: "Your custom membership.", options: { fontSize: 10 } },
          ],
          [
            { text: "7 — Phone", options: { fontSize: 10 } },
            { text: "What's the best number to text?", options: { fontSize: 10 } },
            { text: "How should we reach you?", options: { fontSize: 10 } },
            { text: "Where do we text your photo-review link?", options: { fontSize: 10 } },
          ],
        ],
        colW: [1.5, 4.0, 3.5, 3.2],
        height: 2.0,
      },
    },
    {
      heading: "TCPA + brand consistency",
      body:
        "Collapsed-by-default with \"Why we ask for your phone\" expander preserves disclosure but reduces visual friction. Legal review pre-launch. Every copy choice runs past brand owner before ship. The framework is what I defend; the exact words are negotiable.",
      height: 1.0,
    },
  ],
  notes: `For Victoria: emphasize that microcopy A/B is part of Wave 1 (3 variants per step, 2-day reads). For Gabriel: voice is what I observed, framework is what I defend, words are negotiable.`,
});

// =============================================================================
// A7 — WHAT I CUT
// =============================================================================
appendixSlide({
  id: "A7",
  forWhom: "Cole",
  title: "What I cut from the plan (and why)",
  slideNum: 16,
  sections: [
    {
      heading: "Considered, deferred",
      table: {
        rows: [
          [
            { text: "Lever", options: { bold: true, fontSize: 11, color: C.muted } },
            { text: "Why deferred", options: { bold: true, fontSize: 11, color: C.muted } },
          ],
          [{ text: "Top-of-funnel polish (homepage, pricing page)", options: { fontSize: 11 } }, { text: "Different surface, not in brief", options: { fontSize: 11 } }],
          [{ text: "Referral motion", options: { fontSize: 11 } }, { text: "High opportunity, 3-month build, Wave 5+", options: { fontSize: 11 } }],
          [{ text: "Pricing-page A/B", options: { fontSize: 11 } }, { text: "Separate workstream", options: { fontSize: 11 } }],
          [{ text: "Lead → call-book optimization", options: { fontSize: 11 } }, { text: "Downstream of the case; watched as guardrail", options: { fontSize: 11 } }],
          [{ text: "Post-purchase / install onboarding", options: { fontSize: 11 } }, { text: "90+ day journey, out of scope", options: { fontSize: 11 } }],
          [{ text: "Localization (Spanish)", options: { fontSize: 11 } }, { text: "TX demographic justifies, not Wave 1", options: { fontSize: 11 } }],
          [{ text: "Mobile app push", options: { fontSize: 11 } }, { text: "Post-install, not in this funnel", options: { fontSize: 11 } }],
          [{ text: "Source-level creative pass", options: { fontSize: 11 } }, { text: "Form fix unblocks the test; reverse order = waste", options: { fontSize: 11 } }],
        ],
        colW: [5.5, 7.2],
        height: 3.2,
      },
    },
    {
      heading: "If you gave me different constraints",
      body:
        "▸ 1 week instead of 9: ship half of Path D — progress bar + collapsed TCPA + \"what's next\" hints. 3 days. Read in 5.\n" +
        "▸ 8% in 4 weeks not 9: drop Wave 4 (Path B). Waves 1-3 ≈ 7.5%, within margin.",
      height: 1.0,
    },
  ],
  notes: `For Cole: this is the "what didn't you include" question. None of these are wrong — they're sequenced. Form leak gets fixed first because it's where every other dollar dies.`,
});

// =============================================================================
// WRITE FILE
// =============================================================================
const outDir = resolve(__dirname, "..", "dist");
mkdirSync(outDir, { recursive: true });
const outPath = resolve(outDir, "base-deck.pptx");

await pres.writeFile({ fileName: outPath });

console.log(`\n✓ Deck generated: ${outPath}`);
console.log(`\nUpload to Google Slides:`);
console.log(`  1. Drag '${outPath.split("/").pop()}' to drive.google.com`);
console.log(`  2. Right-click → Open with → Google Slides`);
console.log(`  3. Speaker notes preserved; tweak fonts to Inter or PP Neue Montreal.\n`);
