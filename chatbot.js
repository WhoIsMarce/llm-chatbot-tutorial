require("dotenv").config();
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const MODEL = "openai/gpt-oss-120b";

async function chat(userMessage) {
  console.log(`\n📝 User: ${userMessage}\n`);
  console.log("🤖 Assistant: ");

  try {
    const stream = await client.chat.completions.create({
      model: MODEL,
      stream: true,
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content || "";
      process.stdout.write(text);
    }

    console.log("\n");
  } catch (error) {
    console.error("Error:", error.message);
  }
}

async function main() {
  console.log("=== Chatbot con LLM y Node.js ===\n");
  await chat("¿Cuál es la capital de Argentina?");
  await chat("Explicá en 2 frases qué es Node.js");
  await chat("Dame 3 consejos para aprender programación");
  console.log("\n✅ Completado!");
}

main();
