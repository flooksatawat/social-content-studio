const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const HOST = process.env.HOST || "127.0.0.1";
const PORT = Number(process.env.PORT || 4173);
const TEXT_MODEL = process.env.OPENAI_TEXT_MODEL || "gpt-5.5";
const IMAGE_MODEL = process.env.OPENAI_IMAGE_MODEL || "gpt-image-2";
const OPENAI_BASE_URL = "https://api.openai.com/v1";
const ROOT = __dirname;

let runtimeApiKey = process.env.OPENAI_API_KEY || "";

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

async function openAiRequest(endpoint, body, apiKey = runtimeApiKey, method = "POST") {
  if (!apiKey) {
    const error = new Error("ยังไม่ได้เชื่อม OpenAI API key");
    error.status = 503;
    throw error;
  }

  const result = await fetch(`${OPENAI_BASE_URL}${endpoint}`, {
    method,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const payload = await result.json().catch(() => ({}));
  if (!result.ok) {
    const error = new Error(payload.error?.message || "OpenAI API request failed");
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
        minItems: 4,
        maxItems: 4,
        items: { type: "string" },
      },
      imagePrompt: { type: "string" },
      content: {
        type: "object",
        additionalProperties: false,
        required: ["facebook", "youtube", "tiktok", "linevoom", "blog", "aiSearch"],
        properties: {
          facebook: channelSchema,
          youtube: channelSchema,
          tiktok: channelSchema,
          linevoom: channelSchema,
          blog: channelSchema,
          aiSearch: channelSchema,
        },
      },
    },
  };
}

function extractOutputText(response) {
  for (const item of response.output || []) {
    if (item.type !== "message") continue;
    for (const content of item.content || []) {
      if (content.type === "output_text" && content.text) return content.text;
    }
  }
  return response.output_text || "";
}

async function generateContent(brief) {
  const response = await openAiRequest("/responses", {
    model: TEXT_MODEL,
    reasoning: { effort: "low" },
    max_output_tokens: 7000,
    instructions: [
      "You are a senior Thai content strategist, direct-response copywriter, SEO editor, and audience researcher.",
      "Create useful, specific, ready-to-publish content. Avoid invented statistics, medical promises, guarantees, and unsupported claims.",
      "Write in the language requested by the brief. Adapt length, hook, CTA, and formatting for each platform.",
      "Facebook needs a strong caption and CTA. YouTube needs titles, script, and description. TikTok and LINE VOOM need concise mobile-first scripts.",
      "Blog SEO needs title, meta description, outline, FAQ, and search intent. AI Search needs answer-first copy, entity facts, and concise FAQs.",
      "The image prompt must be in English, highly visual, photorealistic when suitable, with composition and lighting details. Do not ask the image model to render long text.",
    ].join(" "),
    input: `Campaign brief:\n${JSON.stringify(brief, null, 2)}`,
    text: {
      format: {
        type: "json_schema",
        name: "social_content_pack",
        strict: true,
        schema: contentPackSchema(),
      },
    },
  });

  const outputText = extractOutputText(response);
  if (!outputText) throw new Error("AI did not return content");

  const generated = JSON.parse(outputText);
  const selectedChannels = Array.isArray(brief.channels) ? brief.channels : ["facebook"];
  generated.content = Object.fromEntries(
    selectedChannels
      .filter((channel) => generated.content[channel])
      .map((channel) => [channel, generated.content[channel]])
  );
  return generated;
}

function imageSizeFor(format) {
  if (format === "tiktok" || format === "linevoom") return "1024x1536";
  if (format === "youtube" || format === "blog") return "1536x1024";
  return "1024x1024";
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

  const response = await openAiRequest("/images/generations", {
    model: IMAGE_MODEL,
    prompt: `${prompt}\nSelected art direction: ${moodText}. No logos, no watermarks, no long or unreadable text.`,
    size: imageSizeFor(format),
    quality: "medium",
    output_format: "png",
  });

  const image = response.data?.[0];
  if (!image?.b64_json) throw new Error("AI did not return an image");
  return {
    dataUrl: `data:image/png;base64,${image.b64_json}`,
    revisedPrompt: image.revised_prompt || "",
  };
}

async function handleApi(request, response, pathname) {
  if (request.method === "GET" && pathname === "/api/status") {
    sendJson(response, 200, {
      connected: Boolean(runtimeApiKey),
      textModel: TEXT_MODEL,
      imageModel: IMAGE_MODEL,
    });
    return true;
  }

  if (request.method === "POST" && pathname === "/api/config") {
    const { apiKey } = await readJson(request);
    const candidate = String(apiKey || "").trim();
    if (!candidate) {
      sendJson(response, 400, { error: "กรุณากรอก OpenAI API key" });
      return true;
    }

    await openAiRequest("/models", undefined, candidate, "GET");
    runtimeApiKey = candidate;
    sendJson(response, 200, { connected: true, textModel: TEXT_MODEL, imageModel: IMAGE_MODEL });
    return true;
  }

  if (request.method === "DELETE" && pathname === "/api/config") {
    runtimeApiKey = "";
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
  console.log(runtimeApiKey ? "OpenAI connection: ready" : "OpenAI connection: waiting for API key");
});
