import OpenAI from "openai";

if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
  throw new Error("Missing NEXT_PUBLIC_OPENAI_API_KEY in .env.local");
}

// Create an OpenAI client usable in the browser
export const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // required to run in the browser
});
