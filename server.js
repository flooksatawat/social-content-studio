const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const HOST = process.env.HOST || "127.0.0.1";
const PORT = Number(process.env.PORT || 4173);
const TEXT_MODEL = process.env.GEMINI_TEXT_MODEL || "gemini-3.5-flash";
const IMAGE_MODEL = process.env.GEMINI_IMAGE_MODEL || "gemini-3.1-flash-image";
const IMAGE_ENABLED = String(process.env.GEMINI_IMAGE_ENABLED || "true").toLowerCase() === "true";
const GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta";
const ROOT = __dirname;
const ENV_PATH = path.join(ROOT, ".env");

function parseEnvFile(text) {
  return String(text || "")
    .split(/\r?\n/)
    .reduce((acc, line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return acc;
      const separatorIndex = trimmed.indexOf("=");
      if (separatorIndex < 0) return acc;
      const key = trimmed.slice(0, separatorIndex).trim();
      let value = trimmed.slice(separatorIndex + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      acc[key] = value;
      return acc;
    }, {});
}

function readLocalEnv() {
  try {
    if (!fs.existsSync(ENV_PATH)) return {};
    return parseEnvFile(fs.readFileSync(ENV_PATH, "utf8"));
  } catch {
    return {};
  }
}

function writeLocalEnv(values) {
  const merged = { ...readLocalEnv(), ...values };
  const lines = [
    `GEMINI_API_KEY=${merged.GEMINI_API_KEY || ""}`,
    `GEMINI_TEXT_MODEL=${merged.GEMINI_TEXT_MODEL || TEXT_MODEL}`,
    `GEMINI_IMAGE_MODEL=${merged.GEMINI_IMAGE_MODEL || IMAGE_MODEL}`,
    `HOST=${merged.HOST || HOST}`,
    `PORT=${merged.PORT || PORT}`,
  ];
  fs.writeFileSync(ENV_PATH, `${lines.join("\n")}\n`, "utf8");
}

function clearLocalEnvKey() {
  const merged = readLocalEnv();
  delete merged.GEMINI_API_KEY;
  writeLocalEnv(merged);
}

const localEnv = readLocalEnv();
let runtimeApiKey =
  process.env.GEMINI_API_KEY || localEnv.GEMINI_API_KEY || "";

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function sendJson(response, status, payload) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(payload));
}

function setCorsHeaders(response, origin = "*") {
  response.setHeader("Access-Control-Allow-Origin", origin);
  response.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function readJson(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        reject(new Error("Request body is too large"));
        request.destroy();
      }
    });

    request.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("Invalid JSON body"));
      }
    });
    request.on("error", reject);
  });
}

async function geminiRequest(endpoint, body, apiKey = runtimeApiKey, method = "POST") {
  if (!apiKey) {
    const error = new Error("ยังไม่ได้เชื่อม Gemini API key");
    error.status = 503;
    throw error;
  }

  const result = await fetch(`${GEMINI_BASE_URL}${endpoint}`, {
    method,
    headers: {
      "x-goog-api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const payload = await result.json().catch(() => ({}));
  if (!result.ok) {
    const error = new Error(payload.error?.message || "Gemini API request failed");
    error.status = result.status;
    throw error;
  }
  return payload;
}

function contentBlockSchema() {
  return {
    type: "object",
    additionalProperties: false,
    required: ["title", "text"],
    properties: {
      title: { type: "string" },
      text: { type: "string" },
    },
  };
}

function contentPackSchema() {
  const channelSchema = {
    type: "array",
    minItems: 2,
    maxItems: 5,
    items: contentBlockSchema(),
  };

  return {
    type: "object",
    additionalProperties: false,
    required: ["strategy", "hooks", "imagePrompt", "content"],
    properties: {
      strategy: {
        type: "object",
        additionalProperties: false,
        required: ["angle", "promise", "proof", "cta"],
        properties: {
          angle: { type: "string" },
          promise: { type: "string" },
          proof: { type: "string" },
          cta: { type: "string" },
        },
      },
      hooks: {
        type: "array",
        minItems: 3,
        maxItems: 3,
        items: { type: "string" },
      },
      imagePrompt: { type: "string" },
      content: {
        type: "object",
        additionalProperties: false,
        required: ["facebook", "youtube", "tiktok", "linevoom", "blog", "email", "aiSearch"],
        properties: {
          facebook: channelSchema,
          youtube: channelSchema,
          tiktok: channelSchema,
          linevoom: channelSchema,
          blog: channelSchema,
          email: channelSchema,
          aiSearch: channelSchema,
        },
      },
    },
  };
}

function extractOutputText(response) {
  return (response.candidates?.[0]?.content?.parts || [])
    .map((part) => part.text || "")
    .join("")
    .trim();
}

async function generateContent(brief) {
  const response = await geminiRequest(`/models/${TEXT_MODEL}:generateContent`, {
    systemInstruction: {
      parts: [{
        text: [
          "You are a Thai content strategist for life insurance and professional financial advisory.",
          "Create concise, practical, ready-to-publish content for life insurance, protection planning, retirement planning, family protection, and financial advisory.",
          "Use a trustworthy, warm, professional tone. Avoid fearmongering, guaranteed returns, invented statistics, medical promises, legal advice, tax advice, and unsupported claims.",
          "Include suitable compliance-friendly wording when needed, such as coverage and conditions depend on the selected policy and underwriting.",
          "Keep each channel block short and useful. Prefer compact hooks and one clear CTA.",
          "Facebook needs a strong caption and CTA. YouTube needs a short title, script, and description. TikTok and LINE VOOM need concise mobile-first scripts.",
          "Blog SEO needs title, meta description, outline, FAQ, and search intent. Email needs subject lines, preview text, and a short body. AI Search needs answer-first copy and concise FAQs.",
          "Keep the image prompt brief and visual with premium finance, advisor consultation, family protection, and planning cues. Do not ask the image model to render long text.",
        ].join(" "),
      }],
    },
    contents: [{
      role: "user",
      parts: [{ text: `Campaign brief:\n${JSON.stringify(brief, null, 2)}` }],
    }],
    generationConfig: {
      responseMimeType: "application/json",
      responseJsonSchema: contentPackSchema(),
      maxOutputTokens: 7000,
      temperature: 0.8,
    },
  });

  const outputText = extractOutputText(response);
  if (!outputText) throw new Error("Gemini ไม่ได้ส่งคอนเทนต์กลับมา");

  const generated = JSON.parse(outputText);
  const selectedChannels = Array.isArray(brief.channels) ? brief.channels : ["facebook"];
  generated.content = Object.fromEntries(
    selectedChannels
      .filter((channel) => generated.content[channel])
      .map((channel) => [channel, generated.content[channel]])
  );
  return generated;
}

function imageAspectRatioFor(format) {
  if (format === "tiktok" || format === "linevoom") return "9:16";
  if (format === "youtube" || format === "blog") return "16:9";
  return "1:1";
}

async function generateImage({ prompt, format, mood }) {
  if (!prompt || typeof prompt !== "string") {
    const error = new Error("กรุณาสร้างคอนเทนต์หรือระบุ image prompt ก่อน");
    error.status = 400;
    throw error;
  }

  const moodText = {
    clean: "clean expert aesthetic, bright natural lighting, restrained teal accents",
    bold: "bold premium campaign aesthetic, high contrast, energetic composition",
    educational: "clear educational visual, approachable, organized composition",
    premium: "premium calm aesthetic, elegant lighting, refined neutral palette",
  }[mood] || "clean modern commercial aesthetic";

  const aspectRatio = imageAspectRatioFor(format);
  const requestBody = {
    contents: [{
      role: "user",
      parts: [{
        text: `${prompt}\nSelected art direction: ${moodText}. No logos, no watermarks, no long or unreadable text.`,
      }],
    }],
    generationConfig: {
      responseModalities: ["TEXT", "IMAGE"],
      responseFormat: {
        image: {
          aspectRatio,
          imageSize: "1K",
        },
      },
    },
  };

  let response;
  const attempts = [
    requestBody,
    {
      ...requestBody,
      generationConfig: {
        ...requestBody.generationConfig,
        responseFormat: {
          image: {
            aspectRatio,
          },
        },
      },
    },
    {
      ...requestBody,
      generationConfig: {
        responseModalities: ["TEXT", "IMAGE"],
      },
    },
  ];

  let lastError;
  for (const body of attempts) {
    try {
      response = await geminiRequest(`/models/${IMAGE_MODEL}:generateContent`, body);
      lastError = null;
      break;
    } catch (error) {
      lastError = error;
    }
  }

  if (!response) throw lastError || new Error("Gemini image generation failed");

  const parts = response.candidates?.[0]?.content?.parts || [];
  const image = parts.find((part) => part.inlineData?.data);
  if (!image) throw new Error("Gemini ไม่ได้ส่งภาพกลับมา");
  return {
    dataUrl: `data:${image.inlineData.mimeType || "image/png"};base64,${image.inlineData.data}`,
    revisedPrompt: parts.map((part) => part.text || "").join("").trim(),
  };
}

async function handleApi(request, response, pathname) {
  if (request.method === "GET" && pathname === "/api/status") {
    sendJson(response, 200, {
      connected: Boolean(runtimeApiKey),
      textModel: TEXT_MODEL,
      imageModel: IMAGE_MODEL,
      imageEnabled: IMAGE_ENABLED,
    });
    return true;
  }

  if (request.method === "POST" && pathname === "/api/config") {
    const { apiKey } = await readJson(request);
    const candidate = String(apiKey || "").trim();
    if (!candidate) {
      sendJson(response, 400, { error: "กรุณากรอก Gemini API key" });
      return true;
    }

    await geminiRequest("/models", undefined, candidate, "GET");
    runtimeApiKey = candidate;
    writeLocalEnv({
      ...localEnv,
      GEMINI_API_KEY: candidate,
      GEMINI_TEXT_MODEL: TEXT_MODEL,
      GEMINI_IMAGE_MODEL: IMAGE_MODEL,
      HOST,
      PORT,
    });
    sendJson(response, 200, {
      connected: true,
      textModel: TEXT_MODEL,
      imageModel: IMAGE_MODEL,
      imageEnabled: IMAGE_ENABLED,
    });
    return true;
  }

  if (request.method === "DELETE" && pathname === "/api/config") {
    runtimeApiKey = "";
    clearLocalEnvKey();
    sendJson(response, 200, { connected: false });
    return true;
  }

  if (request.method === "POST" && pathname === "/api/generate-content") {
    const { brief } = await readJson(request);
    if (!brief || typeof brief !== "object") {
      sendJson(response, 400, { error: "Campaign brief is required" });
      return true;
    }
    sendJson(response, 200, await generateContent(brief));
    return true;
  }

  if (request.method === "POST" && pathname === "/api/generate-image") {
    sendJson(response, 200, await generateImage(await readJson(request)));
    return true;
  }

  return false;
}

function serveStatic(response, pathname) {
  const requestedPath = pathname === "/" ? "/index.html" : pathname;
  const resolved = path.resolve(ROOT, `.${decodeURIComponent(requestedPath)}`);
  if (!resolved.startsWith(`${ROOT}${path.sep}`) && resolved !== path.join(ROOT, "index.html")) {
    sendJson(response, 403, { error: "Forbidden" });
    return;
  }

  fs.stat(resolved, (statError, stats) => {
    if (statError || !stats.isFile()) {
      sendJson(response, 404, { error: "Not found" });
      return;
    }

    response.writeHead(200, {
      "Content-Type": mimeTypes[path.extname(resolved).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-cache",
    });
    fs.createReadStream(resolved).pipe(response);
  });
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host || `${HOST}:${PORT}`}`);

  try {
    setCorsHeaders(response, request.headers.origin || "*");
    if (request.method === "OPTIONS") {
      response.writeHead(204);
      response.end();
      return;
    }

    if (url.pathname.startsWith("/api/")) {
      const handled = await handleApi(request, response, url.pathname);
      if (!handled) sendJson(response, 404, { error: "API route not found" });
      return;
    }
    serveStatic(response, url.pathname);
  } catch (error) {
    const status = Number(error.status) || 500;
    console.error(`[${new Date().toISOString()}] ${request.method} ${url.pathname}: ${error.message}`);
    sendJson(response, status, {
      error: status >= 500 && status !== 503 ? "ระบบ AI ทำงานผิดพลาด กรุณาลองใหม่" : error.message,
    });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Social Content Studio running at http://${HOST}:${PORT}`);
  console.log(runtimeApiKey ? "Gemini connection: ready" : "Gemini connection: waiting for API key");
});
