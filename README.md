# LLM Chatbot Tutorial

A streaming chatbot built in Node.js, using an LLM API (Groq, OpenAI-compatible). Includes a terminal version and a Dockerized web version with a live demo.

## Requirements
- Node.js 18+
- A free Groq API key (no credit card) — [console.groq.com](https://console.groq.com)
- Docker Desktop (only needed for the containerized version)

## Option 1: Run in the terminal

```bash
npm install
cp .env.example .env
# add your API key to .env
node chatbot.js
```

## Option 2: Run the web version with Docker

```bash
docker build -t llm-chatbot .
docker run -p 3000:3000 --env-file .env llm-chatbot
```

Then open `http://localhost:3000`.

## Live demo

A deployed version is running at: **[llm-chatbot-tutorial-production.up.railway.app](https://llm-chatbot-tutorial-production.up.railway.app)**

## Notes

- The model used (`openai/gpt-oss-120b`) may change over time — check the current list at [console.groq.com/docs/models](https://console.groq.com/docs/models) if something stops working.
- Image also published on [Docker Hub](https://hub.docker.com/r/whoismarce/llm-chatbot-tutorial).