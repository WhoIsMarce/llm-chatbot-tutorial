# LLM Chatbot Tutorial

Chatbot simple en Node.js usando un LLM con streaming de respuestas en tiempo real.

## Requisitos
- Node.js 18+
- Una API key de Groq (gratis, sin tarjeta) — [console.groq.com](https://console.groq.com)

## Instalación
\`\`\`bash
npm install
cp .env.example .env
# completá tu API key en .env
node chatbot.js
\`\`\`

## Nota
El modelo usado (`openai/gpt-oss-120b`) puede cambiar con el tiempo — revisá el catálogo vigente en [console.groq.com/docs/models](https://console.groq.com/docs/models) si el código deja de funcionar.