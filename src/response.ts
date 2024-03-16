import dotenv from "dotenv";
import Anthropic from "@anthropic-ai/sdk";

dotenv.config();

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function getStream(prompt: string, callback) {
  const stream = client.messages
    .stream({
      model: "claude-3-haiku-20240307",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: "Say hello there!",
        },
      ],
    })
    .on("text", (text) => {
      callback(text);
    });
}
