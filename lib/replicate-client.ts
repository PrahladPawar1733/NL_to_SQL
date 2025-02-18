import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function streamLLMResponse(prompt: string) {
  try {
    console.log(prompt);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106", // Replace with your desired GPT model
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    return response.choices[0].message.content; // Extracting only the response field
  } catch (error) {
    console.error("Error fetching LLM response:", error);
    throw new Error("Failed to generate response");
  }
}
