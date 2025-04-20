import { generateTextService } from "../services/geminiService.js";

export const generateTextController = async (req, res) => {
  try {
    const prompt = req.query.prompt;

    if (!prompt) {
      return res
        .status(400)
        .json({ error: "Prompt is required as query parameter" });
    }

    const text = await generateTextService(prompt);
    res.status(200).json({ text });
  } catch (error) {
    console.error("Gemini Controller Error:", error.message);
    res
      .status(500)
      .json({ error: "Failed to generate content from Gemini AI" });
  }
};
