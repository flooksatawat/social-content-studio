const platformMeta = {
  facebook: {
    label: "Facebook",
    size: [1080, 1080],
    ratioLabel: "1:1",
    note: "เหมาะกับโพสต์ให้ความรู้ สร้างความน่าเชื่อถือ และชวนทักเพื่อประเมินแผน",
  },
  youtube: {
    label: "YouTube",
    size: [1280, 720],
    ratioLabel: "16:9",
    note: "เหมาะกับชื่อคลิป Shorts script และคำอธิบายเชิงให้ความรู้",
  },
  tiktok: {
    label: "TikTok",
    size: [1080, 1920],
    ratioLabel: "9:16",
    note: "เหมาะกับ hook เร็ว overlay text และ script แบบสั้น",
  },
  linevoom: {
    label: "LINE VOOM",
    size: [1080, 1920],
    ratioLabel: "9:16",
    note: "เหมาะกับโพสต์สั้น อ่านง่าย ชวนติดตามหรือทัก LINE",
  },
  blog: {
    label: "Blog SEO",
    size: [1200, 630],
    ratioLabel: "1.91:1",
    note: "เหมาะกับ title, meta, outline, FAQ และ internal link",
  },
  aiSearch: {
    label: "AI Search",
    size: [1200, 630],
    ratioLabel: "1.91:1",
    note: "เหมาะกับ answer-first content, entity facts และ FAQ",
  },
};

const moodPalettes = {
  clean: {
    name: "Clean Expert",
    bg: "#ecfdf5",
    bg2: "#ffffff",
    text: "#18181b",
    muted: "#52525b",
    accent: "#0f766e",
    chip: "#ccfbf1",
  },
  bold: {
    name: "Bold Promo",
    bg: "#111827",
    bg2: "#0f766e",
    text: "#ffffff",
    muted: "#e7f7f4",
    accent: "#5eead4",
    chip: "#115e59",
  },
  educational: {
    name: "Educational",
    bg: "#f8faf8",
    bg2: "#d9f99d",
    text: "#18181b",
    muted: "#52525b",
    accent: "#3f6212",
    chip: "#ecfccb",
  },
  premium: {
    name: "Premium Calm",
    bg: "#fafaf9",
    bg2: "#e7e5e4",
    text: "#1c1917",
    muted: "#57534e",
    accent: "#0f766e",
    chip: "#f5f5f4",
  },
};

const sampleBrief = {
  brandName: "Premier Life Advisory",
  businessType: "ประกันชีวิต",
  goal: "เก็บ Lead / นัดหมาย",
  topic: "แผนประกันชีวิตและการเงินที่ออกแบบให้เหมาะกับเป้าหมายของแต่ละครอบครัวอย่างมืออาชีพ",
  audience: "คนทำงานและครอบครัววัยสร้างตัว อายุ 28-45 ปี ที่ต้องการวางแผนคุ้มครองชีวิต รายได้ และอนาคตอย่างรอบคอบ",
  offer: "นัดปรึกษาแผนคุ้มครองฟรี 15 นาที",
  tone: "มืออาชีพ อบอุ่น",
  language: "ไทย",
  keywords: "ประกันชีวิต, ที่ปรึกษาทางการเงิน, วางแผนคุ้มครอง, วางแผนเกษียณ, ปกป้องครอบครัว",
};

const apiBaseUrl =
  new URLSearchParams(window.location.search).get("api") ||
  localStorage.getItem("socialContentStudioApiBase") ||
  window.__SOCIAL_CONTENT_API_BASE__ ||
  "";

const state = {
  latest: null,
  activeChannel: "facebook",
  history: [],
  aiConnected: false,
  apiAvailable: false,
  generatedImage: "",
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const els = {
  form: $("#briefForm"),
  snapshot: $("#strategySnapshot"),
  tabs: $("#channelTabs"),
  output: $("#contentOutput"),
  canvas: $("#postCanvas"),
  generatedImage: $("#generatedImage"),
  prompt: $("#imagePrompt"),
  imageFormat: $("#imageFormat"),
  visualMood: $("#visualMood"),
  toast: $("#toast"),
  aiStatusButton: $("#aiStatusButton"),
  aiStatusText: $("#aiStatusText"),
  aiDialog: $("#aiDialog"),
  aiConnectForm: $("#aiConnectForm"),
  apiKeyInput: $("#apiKeyInput"),
  aiDialogMessage: $("#aiDialogMessage"),
  generateButton: $("#generateContent"),
  renderButton: $("#renderImage"),
};

function getBrief() {
  const data = Object.fromEntries(new FormData(els.form).entries());
  const channels = $$("input[name='channels']:checked").map((input) => input.value);

  return {
    brandName: clean(data.brandName) || "ที่ปรึกษาของคุณ",
    businessType: clean(data.businessType) || "ประกันชีวิต",
    goal: clean(data.goal) || "เก็บ Lead / นัดหมาย",
    topic: clean(data.topic) || "แผนคุ้มครองชีวิตและการเงิน",
    audience: clean(data.audience) || "กลุ่มเป้าหมายหลัก",
    offer: clean(data.offer) || "นัดปรึกษาแผนคุ้มครอง",
    tone: clean(data.tone) || "มืออาชีพ อบอุ่น",
    language: clean(data.language) || "ไทย",
    keywords: splitKeywords(data.keywords),
    channels: channels.length ? channels : ["facebook"],
  };
}

function clean(value) {
  return String(value || "").trim();
}

function splitKeywords(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function shortText(value, length = 62) {
  const text = clean(value);
  return text.length > length ? `${text.slice(0, length - 1)}...` : text;
}

function slugifyThai(text) {
  return clean(text)
    .toLowerCase()
    .replace(/[^\u0E00-\u0E7Fa-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function buildStrategy(brief) {
  const keywordLead = brief.keywords[0] || brief.businessType;
  const audienceShort = shortText(brief.audience, 76);
  const topicShort = shortText(brief.topic, 92);

  return {
    angle: `${brief.goal} ผ่านคอนเทนต์ที่เริ่มจากความกังวลจริงของ ${audienceShort}`,
    promise: `ช่วยให้กลุ่มเป้าหมายเข้าใจว่า ${topicShort} ควรเริ่มจากการประเมินความเสี่ยง เป้าหมายชีวิต และงบประมาณอย่างเป็นระบบ`,
    proof: `ใช้เช็กลิสต์คำถามจริง ตัวอย่างสถานการณ์ครอบครัว FAQ และ keyword "${keywordLead}" เพื่อสร้างความน่าเชื่อถือโดยไม่ขายเกินจริง`,
    cta: brief.offer,
  };
}

function buildHooks(brief) {
  const keyword = brief.keywords[0] || brief.businessType;
  return [
    `ถ้าวันนี้รายได้หลักหยุดลง ครอบครัวของคุณมีแผนสำรองพอหรือยัง`,
    `${keyword}: 3 จุดที่ควรเช็กก่อนเลือกแผนคุ้มครอง`,
    `ประกันชีวิตไม่ใช่แค่ค่าเบี้ย แต่คือแผนรับมือความเสี่ยงของครอบครัว`,
    `อยากวางแผนอนาคตให้มั่นใจกว่าเดิม เริ่มจากเช็กภาระและเป้าหมายชีวิตก่อน`,
  ];
}

function buildImagePrompt(brief) {
  const keyword = brief.keywords[0] || brief.businessType;
  return [
    `Create a clean, premium social media image for life insurance and financial advisory brand ${brief.brandName}.`,
    `Subject: ${brief.topic}.`,
    `Audience: ${brief.audience}.`,
    `Visual style: modern premium finance aesthetic, trustworthy, human-centered, bright natural lighting, realistic Thai professional scene, clear focal point, space for Thai headline text.`,
    `Include subtle cues related to ${keyword}, family protection, financial planning, documents, and calm advisor consultation.`,
    `Avoid clutter, avoid tiny text, avoid fear-based imagery, avoid exaggerated claims.`,
    `Aspect ratio should match the selected platform.`,
  ].join(" ");
}

function buildPlatformContent(brief) {
  const hooks = buildHooks(brief);
  const hashtags = buildHashtags(brief);
  const keyword = brief.keywords[0] || brief.businessType;
  const blogTitle = `${keyword}: วิธีวางแผนคุ้มครองให้เหมาะกับ${shortText(brief.audience, 24)}`;
  const slug = slugifyThai(blogTitle);

  return {
    facebook: [
      block("Hook Options", hooks.slice(0, 3).map((hook, index) => `${index + 1}. ${hook}`).join("\n")),
      block(
        "Caption",
        [
          hooks[0],
          "",
          `หลายคนเริ่มสนใจเรื่อง \"${brief.topic}\" ตอนที่มีภาระมากขึ้น มีครอบครัว มีหนี้สิน หรือเริ่มคิดถึงอนาคตระยะยาว`,
          "",
          "ก่อนเลือกแผน ลองเช็ก 3 เรื่องนี้ก่อน:",
          "1. ถ้ารายได้หยุดลง คนที่เราดูแลจะมีเงินพอใช้กี่เดือน",
          "2. ภาระหนี้ ค่าใช้จ่ายลูก และเป้าหมายเกษียณอยู่ตรงไหน",
          "3. งบประมาณต่อเดือนควรสอดคล้องกับชีวิตจริง ไม่ทำให้แผนสะดุดกลางทาง",
          "",
          `${brief.brandName} ช่วยวิเคราะห์ภาพรวมและแนะนำแนวทางคุ้มครองแบบเข้าใจง่าย ไม่ขายเกินความจำเป็น`,
          `CTA: ${brief.offer}`,
          "",
          hashtags,
        ].join("\n")
      ),
      block("Creative Note", "ภาพควรดูสะอาด น่าเชื่อถือ มีที่ปรึกษาคุยกับครอบครัวหรือคนทำงาน พร้อม headline สั้นที่เน้นความมั่นคงและการวางแผน"),
    ],
    youtube: [
      block(
        "Title Options",
        [
          `1. ${keyword} เริ่มยังไงให้เหมาะกับครอบครัวและงบประมาณ`,
          `2. 5 ข้อที่ควรรู้ก่อนเลือก${keyword}`,
          `3. วางแผนคุ้มครองรายได้และอนาคตครอบครัวแบบเข้าใจง่าย`,
        ].join("\n")
      ),
      block(
        "Shorts Script",
        [
          `0-2s: เปิดด้วยคำถาม: \"ถ้ารายได้หลักหยุดลง ครอบครัวมีแผนสำรองหรือยัง\"`,
          "3-8s: อธิบายว่าแผนประกันที่ดีควรเริ่มจากภาระ รายได้ และเป้าหมาย ไม่ใช่เริ่มจากเบี้ย",
          "9-18s: ให้เช็กลิสต์ 3 ข้อ: คนที่ต้องดูแล, หนี้สิน, งบประมาณที่จ่ายได้ต่อเนื่อง",
          `19-25s: ปิดด้วย CTA: ${brief.offer}`,
        ].join("\n")
      ),
      block("Description", [`${brief.topic}`, "", `เหมาะสำหรับ ${brief.audience}`, `เริ่มวางแผนกับ ${brief.brandName}: ${brief.offer}`, "", hashtags].join("\n")),
    ],
    tiktok: [
      block(
        "Video Script",
        [
          `Hook: ${hooks[2]}`,
          "",
          "Scene 1: ที่ปรึกษาพูดกับกล้องพร้อม overlay: ค่าเบี้ยไม่ใช่คำถามแรก",
          `Text: "ก่อนเลือก${keyword} เช็ก 3 อย่างนี้ก่อน"`,
          "",
          "Scene 2: โชว์เช็กลิสต์เร็ว ๆ",
          "1. ใครต้องพึ่งพารายได้เรา",
          "2. มีหนี้หรือภาระกี่บาท",
          "3. งบที่จ่ายต่อเดือนได้ต่อเนื่องคือเท่าไร",
          "",
          `Scene 3: CTA: ${brief.offer}`,
        ].join("\n")
      ),
      block("Caption", [`${hooks[3]}`, `ใครกำลังสนใจเรื่อง ${keyword} ลองเริ่มจากเช็กลิสต์นี้ก่อน`, `${brief.offer}`, hashtags].join("\n")),
      block("Editing Direction", "ตัดกระชับ อ่านง่าย ใช้ subtitle ใหญ่บนมือถือ โทนภาพมืออาชีพ สะอาด และไม่ใช้ความกลัวเกินจริง"),
    ],
    linevoom: [
      block(
        "Post Copy",
        [
          hooks[0],
          "",
          `สำหรับใครที่กำลังมองหา${keyword} แนะนำให้เริ่มจากการประเมินความต้องการจริงก่อน ไม่ใช่เริ่มจากการถามว่าแผนไหนถูกที่สุด`,
          `${brief.brandName} ช่วยดูภาพรวมรายได้ ภาระ ครอบครัว และเป้าหมาย เพื่อวางแนวทางคุ้มครองที่เหมาะกับคุณมากขึ้น`,
          "",
          `เริ่มง่าย ๆ: ${brief.offer}`,
        ].join("\n")
      ),
      block("LINE VOOM Note", "ใช้ข้อความสั้นกว่า Facebook เน้นความเข้าใจง่าย ความน่าเชื่อถือ และชวนทักเพื่อประเมินเบื้องต้น"),
    ],
    blog: [
      block("SEO Title", blogTitle),
      block("Meta Description", `คู่มือ${keyword}สำหรับ${shortText(brief.audience, 44)} พร้อมเช็กลิสต์ วางแผนคุ้มครอง รายได้ ครอบครัว และคำถามที่ควรรู้ก่อนตัดสินใจ`),
      block("URL Slug", slug || "life-insurance-planning"),
      block(
        "Outline",
        [
          `H1: ${blogTitle}`,
          `H2: ${keyword} คืออะไร และเหมาะกับใคร`,
          `H2: ทำไม ${shortText(brief.audience, 48)} ควรวางแผนคุ้มครอง`,
          "H2: เช็กลิสต์ก่อนเลือกแผนประกันชีวิต",
          "H2: วิธีประเมินวงเงินคุ้มครองและงบประมาณต่อเดือน",
          `H2: ทำไม ${brief.brandName} ถึงช่วยให้ตัดสินใจง่ายขึ้น`,
          "H2: คำถามที่พบบ่อย",
        ].join("\n")
      ),
      block(
        "FAQ",
        [
          `Q: ${keyword} เหมาะกับใคร?`,
          `A: เหมาะกับ ${brief.audience}`,
          "",
          "Q: ควรเริ่มจากอะไร?",
          "A: เริ่มจากการดูรายได้ ภาระ คนที่ต้องดูแล เป้าหมาย และงบประมาณที่จ่ายได้ต่อเนื่อง",
          "",
          "Q: ต้องซื้อแผนแพงที่สุดไหม?",
          "A: ไม่จำเป็น แผนที่ดีควรเหมาะกับความเสี่ยง เป้าหมาย และกำลังจ่ายจริงของแต่ละคน",
        ].join("\n")
      ),
    ],
    aiSearch: [
      block("Answer-First Summary", `${keyword} ที่เหมาะกับ ${shortText(brief.audience, 58)} ควรเริ่มจากการประเมินรายได้ ภาระ ครอบครัว เป้าหมายชีวิต และงบประมาณ ก่อนเลือกแผน เพื่อให้การคุ้มครองสอดคล้องกับชีวิตจริงและดูแลคนสำคัญได้ต่อเนื่อง`),
      block(
        "Entity Facts",
        [
          `Brand: ${brief.brandName}`,
          `Category: ${brief.businessType}`,
          `Target audience: ${brief.audience}`,
          `Primary topic: ${brief.topic}`,
          `Offer: ${brief.offer}`,
          `Keywords: ${brief.keywords.join(", ") || brief.businessType}`,
        ].join("\n")
      ),
      block(
        "AI Search Optimization Checklist",
        [
          "ตอบคำถามหลักตั้งแต่ย่อหน้าแรก",
          "ใช้หัวข้อแบบ question-based เช่น เหมาะกับใคร เริ่มยังไง ต้องใช้เงินเท่าไร",
          "หลีกเลี่ยงคำสัญญาเกินจริง และใส่หมายเหตุว่าเงื่อนไขขึ้นอยู่กับแบบประกันและการพิจารณา",
          "ระบุ entity ให้ชัด: แบรนด์ บริการ กลุ่มเป้าหมาย เป้าหมายการเงิน และ CTA",
          "เพิ่ม FAQ และ author bio เพื่อความน่าเชื่อถือในหมวดการเงิน",
        ].join("\n")
      ),
    ],
  };
}
function block(title, text) {
  return { title, text };
}

function buildHashtags(brief) {
  const base = brief.keywords.length ? brief.keywords : [brief.businessType, "contentmarketing"];
  return base
    .slice(0, 6)
    .map((tag) => `#${tag.replace(/\s+/g, "")}`)
    .join(" ");
}

function generateContent(brief) {
  const strategy = buildStrategy(brief);
  const allContent = buildPlatformContent(brief);
  const selectedContent = Object.fromEntries(
    brief.channels.map((channel) => [channel, allContent[channel]]).filter(([, content]) => content)
  );

  const imagePrompt = buildImagePrompt(brief);
  return {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    createdAt: new Date().toISOString(),
    brief,
    strategy,
    hooks: buildHooks(brief),
    imagePrompt,
    content: selectedContent,
  };
}

function renderSnapshot(strategy) {
  const cards = [
    ["Angle", strategy.angle],
    ["Promise", strategy.promise],
    ["Proof", strategy.proof],
    ["CTA", strategy.cta],
  ];

  els.snapshot.innerHTML = cards
    .map(
      ([title, text]) => `
        <article class="snapshot-card">
          <strong>${escapeHtml(title)}</strong>
          <p>${escapeHtml(text)}</p>
        </article>
      `
    )
    .join("");
}

function renderTabs(result) {
  const channels = Object.keys(result.content);
  if (!channels.includes(state.activeChannel)) {
    state.activeChannel = channels[0] || "facebook";
  }

  els.tabs.innerHTML = channels
    .map((channel) => {
      const meta = platformMeta[channel];
      return `<button class="tab-button ${channel === state.activeChannel ? "active" : ""}" type="button" data-tab="${channel}" role="tab">${meta.label}</button>`;
    })
    .join("");
}

function renderOutput(result) {
  const channel = state.activeChannel;
  const content = result.content[channel];
  const meta = platformMeta[channel];

  if (!content) {
    els.output.innerHTML = `<div class="empty-state"><h3>ยังไม่มีคอนเทนต์</h3><p>เลือกช่องทางแล้วสร้างใหม่อีกครั้ง</p></div>`;
    return;
  }

  const blocks = content
    .map(
      (item) => `
        <section class="output-block">
          <h4>${escapeHtml(item.title)}</h4>
          <pre class="output-text">${escapeHtml(item.text)}</pre>
          <button class="copy-button" type="button" data-copy="${encodeURIComponent(item.text)}">คัดลอกส่วนนี้</button>
        </section>
      `
    )
    .join("");

  els.output.innerHTML = `
    <article class="content-card">
      <div class="content-card-header">
        <div>
          <h3>${meta.label} Content Pack</h3>
          <p class="eyebrow">${meta.ratioLabel} · ${escapeHtml(meta.note)}</p>
        </div>
        <button class="copy-button" type="button" data-copy="${encodeURIComponent(formatChannelContent(channel, content))}">คัดลอกช่องทางนี้</button>
      </div>
      <div class="content-card-body">
        ${blocks}
      </div>
    </article>
  `;
}

function formatChannelContent(channel, blocks) {
  const meta = platformMeta[channel];
  return [`${meta.label} Content Pack`, ...blocks.map((item) => `${item.title}\n${item.text}`)].join("\n\n");
}

function formatAllContent(result) {
  return Object.entries(result.content)
    .map(([channel, blocks]) => formatChannelContent(channel, blocks))
    .join("\n\n---\n\n");
}

function renderHistory() {
  return;
}

function saveHistory(result) {
  state.history = [result, ...state.history.filter((item) => item.id !== result.id)].slice(0, 12);
  localStorage.setItem("socialContentStudioHistory", JSON.stringify(state.history));
  renderHistory();
}

function loadHistory() {
  try {
    state.history = JSON.parse(localStorage.getItem("socialContentStudioHistory") || "[]");
  } catch {
    state.history = [];
  }
  renderHistory();
}

function drawCanvas(result = state.latest) {
  resetGeneratedImage();
  const brief = result?.brief || getBrief();
  const format = els.imageFormat.value;
  const mood = els.visualMood.value;
  const palette = moodPalettes[mood] || moodPalettes.clean;
  const [width, height] = platformMeta[format].size;
  const canvas = els.canvas;
  const ctx = canvas.getContext("2d");

  canvas.width = width;
  canvas.height = height;

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, palette.bg);
  gradient.addColorStop(1, palette.bg2);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  drawPattern(ctx, width, height, palette);

  if (!result) {
    els.prompt.value = buildImagePrompt(brief);
    return;
  }

  const margin = Math.round(Math.min(width, height) * 0.08);
  const contentWidth = width - margin * 2;
  const isVertical = height > width;
  const labelFont = Math.round(Math.min(width, height) * 0.032);
  const titleFont = Math.round(Math.min(width, height) * (isVertical ? 0.074 : 0.064));
  const bodyFont = Math.round(Math.min(width, height) * 0.034);

  ctx.fillStyle = palette.chip;
  roundRect(ctx, margin, margin, Math.min(contentWidth, width * 0.62), labelFont * 2.2, 999);
  ctx.fill();

  ctx.fillStyle = palette.accent;
  ctx.font = `800 ${labelFont}px Segoe UI, Arial`;
  ctx.fillText(`${brief.brandName} · ${platformMeta[format].label}`, margin + labelFont, margin + labelFont * 1.45);

  const headline = buildCanvasHeadline(brief);
  ctx.fillStyle = palette.text;
  ctx.font = `900 ${titleFont}px Segoe UI, Arial`;
  ctx.textBaseline = "top";
  wrapText(ctx, headline, margin, margin + labelFont * 3.4, contentWidth, titleFont * 1.12, 4);

  const subline = `${shortText(brief.topic, isVertical ? 86 : 106)}\n${brief.offer}`;
  ctx.fillStyle = palette.muted;
  ctx.font = `700 ${bodyFont}px Segoe UI, Arial`;
  wrapText(ctx, subline, margin, height - margin - bodyFont * 5.2, contentWidth * 0.92, bodyFont * 1.35, 3);

  ctx.strokeStyle = withAlpha(palette.accent, 0.46);
  ctx.lineWidth = Math.max(5, Math.round(Math.min(width, height) * 0.01));
  ctx.beginPath();
  ctx.moveTo(margin, height - margin - bodyFont * 1.1);
  ctx.lineTo(width - margin, height - margin - bodyFont * 1.1);
  ctx.stroke();

  ctx.fillStyle = palette.accent;
  ctx.font = `900 ${Math.round(bodyFont * 0.88)}px Segoe UI, Arial`;
  ctx.textBaseline = "alphabetic";
  ctx.fillText("Ready-to-post creative preview", margin, height - margin);

  els.prompt.value = result?.imagePrompt || buildImagePrompt(brief);
}

function buildCanvasHeadline(brief) {
  const keyword = brief.keywords[0] || brief.businessType;
  const goalMap = {
    "เก็บ Lead / นัดหมาย": `เริ่มต้น${keyword} ด้วยการประเมินที่เหมาะกับชีวิตจริง`,
    "สร้างการรับรู้แบรนด์": `ทำให้คนจำ${brief.brandName} ได้จากคำแนะนำที่น่าเชื่อถือ`,
    "เพิ่มยอดขาย": `เปลี่ยนความสนใจเรื่อง${keyword} ให้เป็นการวางแผนที่ชัดเจน`,
    "เพิ่มผู้ติดตาม": `คอนเทนต์${keyword} ที่คนอยากติดตามต่อ`,
    "ให้ความรู้เพื่อ SEO": `${keyword} แบบเข้าใจง่ายในโพสต์เดียว`,
  };

  return goalMap[brief.goal] || shortText(brief.topic, 52);
}

function drawPattern(ctx, width, height, palette) {
  ctx.save();
  ctx.strokeStyle = withAlpha(palette.accent, 0.12);
  ctx.lineWidth = 1;
  const gap = Math.max(42, Math.round(Math.min(width, height) * 0.07));

  for (let x = -gap; x < width + gap; x += gap) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + gap * 2, height);
    ctx.stroke();
  }

  ctx.fillStyle = withAlpha(palette.accent, 0.08);
  for (let i = 0; i < 12; i += 1) {
    const radius = gap * (0.2 + (i % 3) * 0.12);
    const x = (width * (i + 1)) / 13;
    const y = i % 2 === 0 ? height * 0.18 : height * 0.82;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 99) {
  const sourceLines = String(text).split("\n");
  let lineCount = 0;

  for (const sourceLine of sourceLines) {
    const words = sourceLine.split(/\s+/);
    let line = "";

    for (const word of words) {
      const testLine = line ? `${line} ${word}` : word;
      const width = ctx.measureText(testLine).width;

      if (width > maxWidth && line) {
        ctx.fillText(line, x, y);
        y += lineHeight;
        line = word;
        lineCount += 1;
        if (lineCount >= maxLines) return y;
      } else {
        line = testLine;
      }
    }

    if (line) {
      ctx.fillText(line, x, y);
      y += lineHeight;
      lineCount += 1;
      if (lineCount >= maxLines) return y;
    }
  }

  return y;
}

function roundRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function withAlpha(hex, alpha) {
  const normalized = hex.replace("#", "");
  const bigint = parseInt(normalized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast("คัดลอกแล้ว");
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    showToast("คัดลอกแล้ว");
  }
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => els.toast.classList.remove("show"), 1800);
}

async function apiRequest(path, options = {}) {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload.error || `Request failed (${response.status})`);
    error.status = response.status;
    throw error;
  }
  return payload;
}

function setApiBaseUrl(url) {
  const next = String(url || "").trim().replace(/\/+$/, "");
  if (next) {
    localStorage.setItem("socialContentStudioApiBase", next);
  } else {
    localStorage.removeItem("socialContentStudioApiBase");
  }
}

function setAiStatus(mode, text) {
  els.aiStatusButton.classList.remove("is-offline", "is-error", "is-loading");
  if (mode) els.aiStatusButton.classList.add(`is-${mode}`);
  els.aiStatusText.textContent = text;
}

function setDialogMessage(message = "", isError = false) {
  els.aiDialogMessage.textContent = message;
  els.aiDialogMessage.classList.toggle("is-error", isError);
}

function openAiDialog(message = "") {
  setDialogMessage(message);
  if (!els.aiDialog.open) els.aiDialog.showModal();
  window.setTimeout(() => els.apiKeyInput.focus(), 50);
}

function closeAiDialog() {
  els.aiDialog.close();
  setDialogMessage("");
}

function setButtonLoading(button, loading, loadingText) {
  if (!button) return;
  if (loading) {
    button.dataset.originalText = button.textContent;
    button.textContent = loadingText;
    button.disabled = true;
    button.classList.add("button-loading");
    return;
  }

  button.textContent = button.dataset.originalText || button.textContent;
  button.disabled = false;
  button.classList.remove("button-loading");
}

function setImageGenerationEnabled(enabled) {
  const renderButton = els.renderButton;
  renderButton.disabled = false;
  renderButton.title = enabled
    ? "สร้างภาพด้วย Gemini"
    : "สร้างภาพด้วย Gemini";
  renderButton.textContent = "ให้ Gemini สร้างภาพ";
  renderButton.classList.remove("is-muted");
}

async function checkAiStatus() {
  setAiStatus("loading", "กำลังตรวจสอบ AI");
  try {
    const status = await apiRequest("/api/status");
    state.apiAvailable = true;
    state.aiConnected = Boolean(status.connected);
    setImageGenerationEnabled(Boolean(status.imageEnabled));
    setAiStatus(state.aiConnected ? "" : "offline", state.aiConnected ? "Gemini พร้อมใช้งาน" : "เชื่อม Gemini");
  } catch {
    state.apiAvailable = false;
    state.aiConnected = false;
    setImageGenerationEnabled(false);
    setAiStatus("offline", "เปิดผ่าน Local Gemini");
  }
}

async function connectAi(event) {
  event.preventDefault();
  const apiKey = els.apiKeyInput.value.trim();
  if (!apiKey) {
    setDialogMessage("กรุณากรอก Gemini API key", true);
    return;
  }

  setButtonLoading($("#connectAi"), true, "กำลังตรวจสอบ...");
  setDialogMessage("กำลังตรวจสอบ API key กับ Google Gemini");
  try {
    await apiRequest("/api/config", {
      method: "POST",
      body: JSON.stringify({ apiKey }),
    });
    state.apiAvailable = true;
    state.aiConnected = true;
    els.apiKeyInput.value = "";
    setAiStatus("", "Gemini พร้อมใช้งาน");
    closeAiDialog();
    showToast("เชื่อม Gemini สำเร็จ");
  } catch (error) {
    state.aiConnected = false;
    setAiStatus("error", "เชื่อม Gemini ไม่สำเร็จ");
    setDialogMessage(error.message, true);
  } finally {
    setButtonLoading($("#connectAi"), false);
  }
}

async function disconnectAi() {
  try {
    if (state.apiAvailable) await apiRequest("/api/config", { method: "DELETE" });
  } catch {
    // The local server may already be stopped.
  }
  state.aiConnected = false;
  els.apiKeyInput.value = "";
  setAiStatus("offline", "เชื่อม Gemini");
  closeAiDialog();
  showToast("ยกเลิกการเชื่อม AI แล้ว");
}

function requireAiConnection() {
  if (state.aiConnected) return true;
  openAiDialog(
    state.apiAvailable
      ? "เชื่อม Gemini API key เพื่อเริ่มสร้างคอนเทนต์และภาพจริง"
      : "กรุณาเปิดระบบผ่าน http://127.0.0.1:4173 เพื่อใช้ Gemini"
  );
  return false;
}

function renderGenerationResult(result) {
  state.latest = result;
  state.activeChannel = Object.keys(result.content)[0] || "facebook";

  renderSnapshot(result.strategy);
  renderTabs(result);
  renderOutput(result);
  els.imageFormat.value = Object.keys(result.content).includes(els.imageFormat.value)
    ? els.imageFormat.value
    : result.brief.channels.find((channel) => platformMeta[channel]?.size) || "facebook";
  drawCanvas(result);
  saveHistory(result);
}

function resetGeneratedImage() {
  state.generatedImage = "";
  els.generatedImage.removeAttribute("src");
  els.generatedImage.hidden = true;
  els.canvas.hidden = false;
}

function showFallbackImage(message) {
  state.generatedImage = els.canvas.toDataURL("image/png");
  els.generatedImage.src = state.generatedImage;
  els.generatedImage.hidden = false;
  els.canvas.hidden = true;
  showToast(message);
}

async function generateAiImage() {
  if (!requireAiConnection()) return;

  const prompt = els.prompt.value.trim() || buildImagePrompt(getBrief());
  setButtonLoading(els.renderButton, true, "AI กำลังสร้างภาพ...");
  try {
    const image = await apiRequest("/api/generate-image", {
      method: "POST",
      body: JSON.stringify({
        prompt,
        format: els.imageFormat.value,
        mood: els.visualMood.value,
      }),
    });
    state.generatedImage = image.dataUrl;
    els.generatedImage.src = image.dataUrl;
    els.generatedImage.hidden = false;
    els.canvas.hidden = true;
    showToast("AI สร้างภาพเสร็จแล้ว");
  } catch (error) {
    const quotaLike =
      error?.status === 429 ||
      /quota|billing|limit|exceeded|free_tier/i.test(String(error.message || ""));
    if ([400, 401, 403].includes(error.status) || quotaLike) {
      showFallbackImage("Gemini ภาพเต็มโควตา ใช้ภาพสำรองในเครื่องแทน");
      state.aiConnected = false;
      setAiStatus("error", "API key ใช้งานไม่ได้");
      return;
    }
    showToast(error.message);
  } finally {
    setButtonLoading(els.renderButton, false);
  }
}

function applySampleBrief() {
  Object.entries(sampleBrief).forEach(([key, value]) => {
    const input = document.querySelector(`[name="${key}"]`);
    if (input) input.value = value;
  });
  showToast("เติมตัวอย่างแล้ว");
}

async function runGeneration(event) {
  event?.preventDefault();
  if (!requireAiConnection()) return;

  const brief = getBrief();
  setButtonLoading(els.generateButton, true, "AI กำลังคิด...");
  els.output.innerHTML = `
    <div class="empty-state">
      <h3>AI กำลังวิเคราะห์กลุ่มเป้าหมาย</h3>
      <p>กำลังสร้างกลยุทธ์ hooks คอนเทนต์รายช่องทาง SEO brief และ prompt สำหรับภาพ</p>
    </div>
  `;

  try {
    const generated = await apiRequest("/api/generate-content", {
      method: "POST",
      body: JSON.stringify({ brief }),
    });
    const result = {
      ...generated,
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      createdAt: new Date().toISOString(),
      brief,
    };
    renderGenerationResult(result);
    showToast("AI สร้างชุดคอนเทนต์แล้ว");
  } catch (error) {
    if ([400, 401, 403].includes(error.status)) {
      state.aiConnected = false;
      setAiStatus("error", "API key ใช้งานไม่ได้");
    }
    els.output.innerHTML = `
      <div class="empty-state">
        <h3>สร้างคอนเทนต์ไม่สำเร็จ</h3>
        <p>${escapeHtml(error.message)}</p>
      </div>
    `;
    showToast(error.message);
  } finally {
    setButtonLoading(els.generateButton, false);
  }
}

function downloadCanvas() {
  const link = document.createElement("a");
  const brief = state.latest?.brief || getBrief();
  link.download = `${slugifyThai(brief.brandName) || "social-post"}-${els.imageFormat.value}.png`;
  link.href = state.generatedImage || els.canvas.toDataURL("image/png");
  link.click();
}

function bindEvents() {
  els.form.addEventListener("submit", runGeneration);
  $("#sampleBrief").addEventListener("click", applySampleBrief);
  els.renderButton.addEventListener("click", generateAiImage);
  $("#downloadImage").addEventListener("click", downloadCanvas);
  $("#copyPrompt").addEventListener("click", () => copyText(els.prompt.value));
  $("#copyAll").addEventListener("click", () => {
    if (!state.latest) {
      showToast("ยังไม่มีคอนเทนต์ให้คัดลอก");
      return;
    }
    copyText(formatAllContent(state.latest));
  });

  els.tabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-tab]");
    if (!button || !state.latest) return;
    state.activeChannel = button.dataset.tab;
    renderTabs(state.latest);
    renderOutput(state.latest);
  });

  els.output.addEventListener("click", (event) => {
    const button = event.target.closest("[data-copy]");
    if (!button) return;
    copyText(decodeURIComponent(button.dataset.copy));
  });

  [els.imageFormat, els.visualMood].forEach((control) => {
    control.addEventListener("change", () => drawCanvas());
  });

  els.aiStatusButton.addEventListener("click", () => openAiDialog());
  els.aiConnectForm.addEventListener("submit", connectAi);
  $("#closeAiDialog").addEventListener("click", closeAiDialog);
  $("#disconnectAi").addEventListener("click", disconnectAi);
  els.aiDialog.addEventListener("click", (event) => {
    if (event.target === els.aiDialog) closeAiDialog();
  });
}

bindEvents();
loadHistory();
drawCanvas();
checkAiStatus();



