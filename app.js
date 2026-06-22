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
  audiencePreset: "young-family",
  audience: "คนทำงานวัยสร้างตัวและครอบครัวเริ่มต้น",
  tone: "มืออาชีพ อบอุ่น",
  painPoint: "ยังไม่รู้ว่าจะเริ่มวางแผนคุ้มครองชีวิตและการเงินอย่างไรให้เหมาะกับครอบครัวจริง",
};

const audiencePresets = {
  "young-family": {
    label: "คนทำงานวัยสร้างตัวและครอบครัวเริ่มต้น",
    problem: "อยากดูแลคนในบ้าน แต่ยังไม่แน่ใจว่าควรเริ่มคุ้มครองจากวงเงินหรือแผนแบบไหน",
    need: "ต้องการภาพรวมที่เข้าใจง่าย เห็นความเสี่ยง รายได้ และงบต่อเดือนก่อนตัดสินใจ",
    funnel: "Awareness -> Consideration -> Lead",
    hook: "ถ้ารายได้หยุดพรุ่งนี้ ครอบครัวคุณจะมีแผนรับมือพอไหม",
    cta: "ทักเพื่อประเมินแผนคุ้มครองเบื้องต้น",
  },
  "business-owner": {
    label: "เจ้าของกิจการและผู้มีรายได้หลายทาง",
    problem: "รายได้ผันผวนและมีภาระธุรกิจ ทำให้การวางคุ้มครองต้องละเอียดกว่าปกติ",
    need: "ต้องการแผนที่สมดุลระหว่างความเสี่ยงส่วนตัว ธุรกิจ และสภาพคล่อง",
    funnel: "Problem Awareness -> Solution Match -> Consultation",
    hook: "ธุรกิจเดินต่อได้ แต่ครอบครัวคุณพร้อมรับมือความเสี่ยงแล้วหรือยัง",
    cta: "ขอวิเคราะห์โครงสร้างคุ้มครอง",
  },
  parent: {
    label: "พ่อแม่ที่ต้องการคุ้มครองอนาคตลูก",
    problem: "อยากให้ลูกมีอนาคตมั่นคง แต่ยังไม่แน่ใจเรื่องงบและความคุ้มครองที่จำเป็น",
    need: "ต้องการแผนที่โฟกัสความมั่นคง การศึกษา และการดูแลครอบครัวในระยะยาว",
    funnel: "Awareness -> Education -> Trust",
    hook: "สิ่งสำคัญไม่ใช่แค่มีประกัน แต่ต้องมีแผนที่ดูแลลูกได้จริง",
    cta: "นัดคุยเพื่อวางแผนครอบครัว",
  },
  planning: {
    label: "คนที่เริ่มสนใจวางแผนชีวิตและเกษียณ",
    problem: "รู้ว่าควรวางแผน แต่ยังไม่รู้ว่าเริ่มจากประกันชีวิตหรือเงินออมก่อน",
    need: "ต้องการ framework ที่เชื่อมคุ้มครอง รายได้ และเป้าหมายอนาคตเข้าด้วยกัน",
    funnel: "Education -> Consideration -> Action",
    hook: "ถ้าอยากเกษียณแบบไม่กังวล เรื่องคุ้มครองต้องอยู่ในแผนตั้งแต่ต้น",
    cta: "รับคำแนะนำเริ่มต้นฟรี",
  },
  custom: {
    label: "กำหนดเอง",
    problem: "ต้องการแผนที่ออกแบบให้เข้ากับสถานการณ์ของตัวเอง",
    need: "ต้องการข้อมูลเฉพาะจุดเพื่อแปลงเป็นคอนเทนต์และแผนคุยลูกค้า",
    funnel: "Discover -> Diagnose -> Convert",
    hook: "แผนที่ดีต้องเริ่มจากความจริงของชีวิต ไม่ใช่จากแพ็กเกจสำเร็จรูป",
    cta: "เริ่มประเมินจากบริบทจริง",
  },
};

const apiBaseUrl =
  new URLSearchParams(window.location.search).get("api") ||
  localStorage.getItem("socialContentStudioApiBase") ||
  window.__SOCIAL_CONTENT_API_BASE__ ||
  "";

const apiKeyStorageKey = "socialContentStudioGeminiApiKey";

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
  videoOutput: $("#videoOutput"),
  calendarSummary: $("#calendarSummary"),
  calendarBody: $("#calendarBody"),
  postingWindow: $("#postingWindow"),
  calendarDays: $("#calendarDays"),
  copyCalendar: $("#copyCalendar"),
  canvas: $("#postCanvas"),
  generatedImage: $("#generatedImage"),
  prompt: $("#imagePrompt"),
  imageFormat: $("#imageFormat"),
  visualMood: $("#visualMood"),
  toast: $("#toast"),
  aiStatusButton: $("#aiStatusButton"),
  aiStatusText: $("#aiStatusText"),
  aiDialog: $("#aiDialog"),
  customAudienceDialog: $("#customAudienceDialog"),
  aiConnectForm: $("#aiConnectForm"),
  customAudienceForm: $("#customAudienceForm"),
  apiKeyInput: $("#apiKeyInput"),
  aiDialogMessage: $("#aiDialogMessage"),
  customAudienceMessage: $("#customAudienceMessage"),
  customAudienceWho: $("#customAudienceWho"),
  customAudienceProblem: $("#customAudienceProblem"),
  customAudienceNeed: $("#customAudienceNeed"),
  generateButton: $("#generateContent"),
  renderButton: $("#renderImage"),
  copyVideoScript: $("#copyVideoScript"),
};

function getBrief() {
  const data = Object.fromEntries(new FormData(els.form).entries());
  const channels = $$("input[name='channels']:checked").map((input) => input.value);
  const preset = audiencePresets[data.audiencePreset] || audiencePresets["young-family"];
  const customBrief = loadCustomAudienceBrief();
  const audienceText =
    data.audiencePreset === "custom"
      ? clean(customBrief.who) || clean(data.audience) || preset.label
      : preset.label;
  const painText =
    data.audiencePreset === "custom"
      ? [customBrief.problem, customBrief.need].filter(Boolean).join(" | ") || clean(data.painPoint) || preset.problem
      : clean(data.painPoint) || preset.problem;

  return {
    brandName: "ที่ปรึกษาของคุณ",
    audiencePreset: clean(data.audiencePreset) || "young-family",
    audience: audienceText || "กลุ่มเป้าหมายหลัก",
    tone: clean(data.tone) || "มืออาชีพ อบอุ่น",
    painPoint: painText,
    campaignGoal: preset.funnel,
    offer: preset.cta,
    keywords: ["ประกันชีวิต", "ที่ปรึกษาทางการเงิน", "วางแผนคุ้มครอง"],
    channels: channels.length ? channels : ["facebook"],
  };
}

function getSelectedChannels() {
  return $$("input[name='channels']:checked").map((input) => input.value);
}

function syncChannelSelection() {
  const channels = getSelectedChannels();
  if (!channels.length) return;
  if (!state.latest) {
    state.activeChannel = channels[0];
    return;
  }

  const currentContent = state.latest.content || {};
  const nextActive = channels.includes(state.activeChannel)
    ? state.activeChannel
    : channels.find((channel) => currentContent[channel]) || channels[0];
  state.activeChannel = nextActive;
  renderTabs(state.latest);
  renderOutput(state.latest);
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
  const preset = audiencePresets[brief.audiencePreset] || audiencePresets["young-family"];
  const keywordLead = brief.keywords[0] || "ประกันชีวิต";
  const audienceShort = shortText(brief.audience, 76);
  const painShort = shortText(brief.painPoint, 92);

  return {
    angle: `AI วิเคราะห์กลุ่ม ${audienceShort} ที่มี pain point "${painShort}"`,
    promise: `แปลงข้อมูลเป็นคอนเทนต์ที่ตอบโจทย์ตามโทน "${brief.tone}" และ funnel "${preset.funnel}"`,
    proof: `อ้างอิง funnel "${preset.funnel}" พร้อม keyword "${keywordLead}" เพื่อวางคอนเทนต์ที่พาคนจากสนใจไปสู่การทัก`,
    cta: preset.cta,
  };
}

function buildHooks(brief) {
  const preset = audiencePresets[brief.audiencePreset] || audiencePresets["young-family"];
  const keyword = brief.keywords[0] || "ประกันชีวิต";
  return [
    preset.hook,
    `${keyword}: 3 จุดที่ควรเช็กก่อนตัดสินใจ`,
    `โทน "${brief.tone}" ช่วยให้คนอ่านรู้สึกสบายใจและเชื่อถือได้มากขึ้น`,
    `เริ่มจากปัญหา แล้วค่อยพาไปสู่การคุ้มครองที่เหมาะกับชีวิตจริง`,
  ];
}

function buildImagePrompt(brief) {
  const keyword = brief.keywords[0] || "ประกันชีวิต";
  return [
    `Create a clean, premium social media image for a life insurance and financial advisory brand.`,
    `Subject: AI analyzed content for ${brief.audience}.`,
    `Audience: ${brief.audience}.`,
    `Visual style: modern premium finance aesthetic with intelligent AI overlay, trustworthy, human-centered, bright natural lighting, realistic Thai professional scene, clear focal point, space for Thai headline text.`,
    `Include subtle cues related to ${keyword}, family protection, financial planning, insights, funnel map, and calm advisor consultation.`,
    `Avoid clutter, avoid tiny text, avoid fear-based imagery, avoid exaggerated claims.`,
    `Aspect ratio should match the selected platform.`,
  ].join(" ");
}

function buildPlatformContent(brief) {
  const hooks = buildHooks(brief);
  const hashtags = buildHashtags(brief);
  const preset = audiencePresets[brief.audiencePreset] || audiencePresets["young-family"];
  const keyword = brief.keywords[0] || "ประกันชีวิต";
  const blogTitle = `${keyword}: วิธีวางแผนคุ้มครองให้เหมาะกับ${shortText(brief.audience, 24)}`;
  const slug = slugifyThai(blogTitle);

  return {
    facebook: [
      block("Hook Options", hooks.slice(0, 4).map((hook, index) => `${index + 1}. ${hook}`).join("\n")),
      block(
        "Caption",
        [
          hooks[0],
          "",
          `AI วิเคราะห์แล้วว่ากลุ่มเป้าหมายมีปัญหาหลักคือ: ${shortText(brief.painPoint, 96)}`,
          `ความต้องการหลักคือ: ${preset.need}`,
          "",
          "ก่อนเลือกแผน ลองเช็ก 3 เรื่องนี้ก่อน:",
          "1. ใครคือคนที่เราต้องดูแล",
          "2. ความเสี่ยงหรือภาระที่ต้องรับมือคืออะไร",
          "3. งบประมาณที่จ่ายต่อเนื่องได้จริงอยู่ระดับไหน",
          "",
          `${brief.brandName} ช่วยวิเคราะห์ภาพรวมและแนะนำแนวทางคุ้มครองให้สอดคล้องกับ funnel "${preset.funnel}"`,
          `CTA: ${preset.cta}`,
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
          `1. ${keyword} เริ่มยังไงให้เหมาะกับ${shortText(brief.audience, 18)}`,
          `2. 5 ข้อที่ควรรู้ก่อนเลือก${keyword}`,
          `3. AI วิเคราะห์ปัญหาและวิธีวางแผนคุ้มครองที่ใช่`,
        ].join("\n")
      ),
      block(
        "Shorts Script",
        [
          `0-2s: เปิดด้วยคำถาม: \"ถ้ารายได้หลักหยุดลง ครอบครัวมีแผนสำรองหรือยัง\"`,
          "3-8s: อธิบายว่าแผนประกันที่ดีควรเริ่มจากภาระ รายได้ และเป้าหมาย ไม่ใช่เริ่มจากเบี้ย",
          "9-18s: ให้เช็กลิสต์ 3 ข้อ: คนที่ต้องดูแล, หนี้สิน, งบประมาณที่จ่ายได้ต่อเนื่อง",
          `19-25s: ปิดด้วย CTA: ${preset.cta}`,
        ].join("\n")
      ),
      block("Description", [`${brief.painPoint}`, "", `เหมาะสำหรับ ${brief.audience}`, `เริ่มวางแผนกับ ${brief.brandName}: ${preset.cta}`, "", hashtags].join("\n")),
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
          `Scene 3: CTA: ${preset.cta}`,
        ].join("\n")
      ),
      block("Caption", [`${hooks[3]}`, `ใครกำลังสนใจเรื่อง ${keyword} ลองเริ่มจากเช็กลิสต์นี้ก่อน`, `${preset.cta}`, hashtags].join("\n")),
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
          `เริ่มง่าย ๆ: ${preset.cta}`,
        ].join("\n")
      ),
      block("LINE VOOM Note", "ใช้ข้อความสั้นกว่า Facebook เน้นความเข้าใจง่าย ความน่าเชื่อถือ และชวนทักเพื่อประเมินเบื้องต้น"),
    ],
    blog: [
      block("SEO Title", blogTitle),
      block("Meta Description", `คู่มือ${keyword}สำหรับ${shortText(brief.audience, 44)} พร้อม AI วิเคราะห์ปัญหา ความต้องการ Hook CTA และแผนคอนเทนต์ตาม funnel เพื่อใช้จริงบน SEO และ AI Search`),
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
      block("Answer-First Summary", `${keyword} ที่เหมาะกับ ${shortText(brief.audience, 58)} ควรเริ่มจากการประเมินปัญหา ความต้องการ โทนสื่อสาร และ funnel ของคอนเทนต์ ก่อนเลือกแผน เพื่อให้การคุ้มครองสอดคล้องกับชีวิตจริงและปิดการคุยต่อได้ง่ายขึ้น`),
      block(
        "Entity Facts",
        [
          `Brand: ${brief.brandName}`,
          `Target audience: ${brief.audience}`,
          `Tone: ${brief.tone}`,
          `Primary pain point: ${brief.painPoint}`,
          `Offer: ${preset.cta}`,
          `Keywords: ${brief.keywords.join(", ") || "ประกันชีวิต"}`,
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
  const base = brief.keywords.length ? brief.keywords : ["ประกันชีวิต", "contentmarketing"];
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

function buildVideoContent(brief) {
  const preset = audiencePresets[brief.audiencePreset] || audiencePresets["young-family"];
  const keyword = brief.keywords[0] || "ประกันชีวิต";
  return [
    block(
      "Video Hook",
      preset.hook
    ),
    block(
      "Short Script",
      [
        `0-3s: เปิดคำถาม "${preset.hook}"`,
        `4-10s: พูดถึง ${keyword} แบบเข้าใจง่าย`,
        "11-18s: ย้ำปัญหาที่ลูกค้ากำลังเจอ และทางออกที่เหมาะกับชีวิตจริง",
        `19-25s: ปิดด้วย CTA: ${preset.cta}`,
      ].join("\n")
    ),
    block(
      "On-screen Text",
      [
        `1. ${keyword}`,
        "2. เข้าใจปัญหาก่อนเลือกแผน",
        "3. นัดคุยเพื่อประเมินเบื้องต้น",
      ].join("\n")
    ),
  ];
}

function getPostingTimes() {
  const raw = clean(els.postingWindow?.value || "08:30, 12:30, 19:30");
  const times = raw.split(",").map((item) => item.trim()).filter(Boolean);
  return times.slice(0, 3).concat(["08:30", "12:30", "19:30"]).slice(0, 3);
}

function buildCalendarPlan(result) {
  const brief = result?.brief || getBrief();
  const channels = brief.channels?.length ? brief.channels : getSelectedChannels();
  const times = getPostingTimes();
  const days = Math.min(Math.max(Number(els.calendarDays?.value || 30) || 30, 7), 90);
  const angles = (result?.hooks || buildHooks(brief)).concat([brief.painPoint, brief.offer, brief.tone]);
  const primaryChannels = channels.length ? channels : ["facebook", "linevoom", "tiktok"];
  const rows = [];

  for (let day = 1; day <= days; day += 1) {
    const dayChannels = [
      primaryChannels[day % primaryChannels.length],
      primaryChannels[(day + 1) % primaryChannels.length],
      primaryChannels[(day + 2) % primaryChannels.length],
    ];
    const angle = angles[day % angles.length] || brief.painPoint;
    rows.push({
      day,
      times,
      channel: platformMeta[dayChannels[0]]?.label || "Facebook",
      angle,
      channels: dayChannels,
    });
  }

  return rows;
}

function renderCalendar(result) {
  if (!els.calendarBody || !els.calendarSummary) return;
  const brief = result?.brief || getBrief();
  const rows = buildCalendarPlan(result);
  const times = getPostingTimes();
  const channelList = (brief.channels?.length ? brief.channels : getSelectedChannels()).map((channel) => platformMeta[channel]?.label || channel);

  els.calendarSummary.innerHTML = `
    <article class="calendar-summary-card">
      <strong>AI schedule</strong>
      <p>แผน 30 วันสำหรับ ${escapeHtml(brief.audience)} โฟกัสช่องทาง ${escapeHtml(channelList.join(", "))}</p>
      <p>เวลาหลัก: ${escapeHtml(times.join(" / "))}</p>
    </article>
  `;

  els.calendarBody.innerHTML = rows
    .map((row) => `
      <tr>
        <td>Day ${row.day}</td>
        <td>${escapeHtml(times[0] || "")}</td>
        <td>${escapeHtml(times[1] || "")}</td>
        <td>${escapeHtml(times[2] || "")}</td>
        <td>${escapeHtml(row.channel)}</td>
        <td>${escapeHtml(shortText(row.angle, 72))}</td>
      </tr>
    `)
    .join("");
}

function renderSnapshot(strategy) {
  const cards = [
    ["AI วิเคราะห์ปัญหา", strategy.angle],
    ["AI เข้าใจความต้องการ", strategy.promise],
    ["Hook แนะนำ", strategy.proof],
    ["Keyword", (state.latest?.brief.keywords || []).join(", ") || "ประกันชีวิต"],
    ["Sell Funnel", strategy.promise.includes("funnel") ? strategy.promise : "Awareness -> Consideration -> Lead"],
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

  const subline = `${shortText(brief.painPoint, isVertical ? 86 : 106)}\n${brief.offer}`;
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
  const keyword = brief.keywords[0] || "ประกันชีวิต";
  return `AI วิเคราะห์ ${keyword} ให้ตรงปัญหาและเป้าหมายจริง`;
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

function getStoredApiKey() {
  try {
    return localStorage.getItem(apiKeyStorageKey) || "";
  } catch {
    return "";
  }
}

function setStoredApiKey(apiKey) {
  try {
    const next = String(apiKey || "").trim();
    if (next) {
      localStorage.setItem(apiKeyStorageKey, next);
    } else {
      localStorage.removeItem(apiKeyStorageKey);
    }
  } catch {
    // Ignore storage failures so the app still works in restricted browsers.
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

function setCustomAudienceMessage(message = "", isError = false) {
  if (!els.customAudienceMessage) return;
  els.customAudienceMessage.textContent = message;
  els.customAudienceMessage.classList.toggle("is-error", isError);
}

function loadCustomAudienceBrief() {
  try {
    return JSON.parse(localStorage.getItem("socialContentStudioCustomAudience") || "{}");
  } catch {
    return {};
  }
}

function saveCustomAudienceBrief(brief) {
  localStorage.setItem("socialContentStudioCustomAudience", JSON.stringify(brief));
}

function openCustomAudienceDialog() {
  setCustomAudienceMessage("");
  const saved = loadCustomAudienceBrief();
  if (els.customAudienceWho) els.customAudienceWho.value = saved.who || "";
  if (els.customAudienceProblem) els.customAudienceProblem.value = saved.problem || "";
  if (els.customAudienceNeed) els.customAudienceNeed.value = saved.need || "";
  if (!els.customAudienceDialog.open) els.customAudienceDialog.showModal();
  window.setTimeout(() => els.customAudienceWho?.focus(), 50);
}

function closeCustomAudienceDialog() {
  els.customAudienceDialog.close();
  setCustomAudienceMessage("");
}

function openAiDialog(message = "") {
  setDialogMessage(message);
  if (!els.apiKeyInput.value) {
    els.apiKeyInput.value = getStoredApiKey();
  }
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
  if (!renderButton) return;
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
    if (state.aiConnected && !els.apiKeyInput.value) {
      els.apiKeyInput.value = getStoredApiKey();
    }
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
    setStoredApiKey(apiKey);
    els.apiKeyInput.value = apiKey;
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
  setStoredApiKey("");
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

  syncAnalysisToForm(result);

  renderSnapshot(result.strategy);
  renderTabs(result);
  renderOutput(result);
  renderVideoOutput(result);
  renderCalendar(result);
  els.imageFormat.value = Object.keys(result.content).includes(els.imageFormat.value)
    ? els.imageFormat.value
    : result.brief.channels.find((channel) => platformMeta[channel]?.size) || "facebook";
  drawCanvas(result);
  saveHistory(result);
}

function renderVideoOutput(result) {
  if (!els.videoOutput) return;
  const brief = result?.brief || getBrief();
  const blocks = buildVideoContent(brief);
  els.videoOutput.innerHTML = `
    <article class="content-card">
      <div class="content-card-header">
        <div>
          <h3>Video Script Pack</h3>
          <p class="eyebrow">สคริปต์สั้นพร้อมใช้</p>
        </div>
      </div>
      <div class="content-card-body">
        ${blocks
          .map(
            (item) => `
              <section class="output-block">
                <h4>${escapeHtml(item.title)}</h4>
                <pre class="output-text">${escapeHtml(item.text)}</pre>
              </section>
            `
          )
          .join("")}
      </div>
    </article>
  `;
}

function syncAnalysisToForm(result) {
  const brief = result?.brief || {};
  const preset = audiencePresets[brief.audiencePreset] || audiencePresets["young-family"];
  const hook = result?.hooks?.[0] || preset.hook;
  const analysisSummary = result?.strategy?.angle || `AI วิเคราะห์กลุ่ม ${brief.audience || preset.label}`;
  const needSummary = result?.strategy?.promise || preset.need;
  const funnelSummary = result?.strategy?.proof || preset.funnel;

  const audienceField = document.querySelector('[name="audience"]');
  if (audienceField) {
    audienceField.value = brief.audience || preset.label;
  }

  const toneField = document.querySelector('[name="tone"]');
  if (toneField) {
    toneField.value = brief.tone || "มืออาชีพ อบอุ่น";
  }

  const painField = document.querySelector('[name="painPoint"]');
  if (painField) {
    painField.value = [analysisSummary, needSummary, hook].filter(Boolean).join("\n");
  }
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
  if (els.form.audiencePreset) {
    els.form.audiencePreset.addEventListener("change", () => {
      if (els.form.audiencePreset.value === "custom") {
        openCustomAudienceDialog();
      }
    });
  }
  const copyPromptButton = $("#copyPrompt");
  if (copyPromptButton) copyPromptButton.addEventListener("click", () => copyText(els.prompt.value));
  if (els.copyCalendar) {
    els.copyCalendar.addEventListener("click", () => {
      if (!state.latest) {
        showToast("ยังไม่มีตารางให้คัดลอก");
        return;
      }
      const rows = buildCalendarPlan(state.latest);
      const text = rows
        .map((row) => `Day ${row.day}: ${row.times.join(" / ")} | ${row.channel} | ${shortText(row.angle, 70)}`)
        .join("\n");
      copyText(text);
    });
  }
  const copyAllButton = $("#copyAll");
  if (copyAllButton) {
    copyAllButton.addEventListener("click", () => {
      if (!state.latest) {
        showToast("ยังไม่มีคอนเทนต์ให้คัดลอก");
        return;
      }
      copyText(formatAllContent(state.latest));
    });
  }
  if (els.copyVideoScript) {
    els.copyVideoScript.addEventListener("click", () => {
      if (!state.latest) {
        showToast("ยังไม่มีสคริปต์วิดีโอให้คัดลอก");
        return;
      }
      copyText(buildVideoContent(state.latest.brief).map((item) => `${item.title}\n${item.text}`).join("\n\n"));
    });
  }

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

  $$("input[name='channels']").forEach((input) => {
    input.addEventListener("change", () => {
      syncChannelSelection();
      if (state.latest) {
        state.latest.brief.channels = getSelectedChannels();
      }
    });
  });

  [els.imageFormat, els.visualMood].forEach((control) => {
    control.addEventListener("change", () => drawCanvas());
  });
  if (els.postingWindow) {
    els.postingWindow.addEventListener("change", () => {
      if (state.latest) renderCalendar(state.latest);
    });
  }
  if (els.calendarDays) {
    els.calendarDays.addEventListener("change", () => {
      if (state.latest) renderCalendar(state.latest);
    });
  }

  els.aiStatusButton.addEventListener("click", () => openAiDialog());
  els.aiConnectForm.addEventListener("submit", connectAi);
  if (els.customAudienceForm) {
    els.customAudienceForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const who = clean(els.customAudienceWho?.value);
      const problem = clean(els.customAudienceProblem?.value);
      const need = clean(els.customAudienceNeed?.value);
      if (!who || !problem || !need) {
        setCustomAudienceMessage("กรอกให้ครบทั้ง 3 ช่องก่อน", true);
        return;
      }
      saveCustomAudienceBrief({ who, problem, need });
      if (els.form.audiencePreset) els.form.audiencePreset.value = "custom";
      setCustomAudienceMessage("บันทึกแล้ว");
      closeCustomAudienceDialog();
      showToast("บันทึกข้อมูลกำหนดเองแล้ว");
      drawCanvas();
    });
  }
  const closeCustomAudienceDialogButton = $("#closeCustomAudienceDialog");
  if (closeCustomAudienceDialogButton) closeCustomAudienceDialogButton.addEventListener("click", closeCustomAudienceDialog);
  const cancelCustomAudienceButton = $("#cancelCustomAudience");
  if (cancelCustomAudienceButton) cancelCustomAudienceButton.addEventListener("click", closeCustomAudienceDialog);
  if (els.customAudienceDialog) {
    els.customAudienceDialog.addEventListener("click", (event) => {
      if (event.target === els.customAudienceDialog) closeCustomAudienceDialog();
    });
  }
  const closeAiDialogButton = $("#closeAiDialog");
  if (closeAiDialogButton) closeAiDialogButton.addEventListener("click", closeAiDialog);
  const disconnectAiButton = $("#disconnectAi");
  if (disconnectAiButton) disconnectAiButton.addEventListener("click", disconnectAi);
  if (els.aiDialog) els.aiDialog.addEventListener("click", (event) => {
    if (event.target === els.aiDialog) closeAiDialog();
  });
}

bindEvents();
loadHistory();
if (els.apiKeyInput) els.apiKeyInput.value = getStoredApiKey();
drawCanvas();
checkAiStatus();



