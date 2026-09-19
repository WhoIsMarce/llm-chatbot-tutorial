require("dotenv").config();
const http = require("http");
const fs = require("fs");
const path = require("path");
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const MODEL = "openai/gpt-oss-120b";
const PORT = process.env.PORT || 3000;

const indexHtml = fs.readFileSync(path.join(__dirname, "public", "index.html"));

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(indexHtml);
    return;
  }

  if (req.method === "POST" && req.url === "/chat") {
    const body = await readBody(req);
    let userMessage = "Hello!";
    try {
      userMessage = JSON.parse(body).message || userMessage;
    } catch (_) {}

    res.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    });

    try {
      const stream = await client.chat.completions.create({
        model: MODEL,
        stream: true,
        messages: [{ role: "user", content: userMessage }],
      });

      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content || "";
        if (text) res.write(text);
      }
      res.end();
    } catch (error) {
      res.end(`[error] ${error.message}`);
    }
    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not found");
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
