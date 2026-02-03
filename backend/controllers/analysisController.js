import Groq from "groq-sdk";

export const analyzeEmail = async (req, res) => {
    try {
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({ message: "No email content provided" });
        }

        // Initialize Groq client here to ensure env vars are loaded
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

        const prompt = `
            Analyze the following email content for phishing attempts. 
            Provide the result strictly in JSON format with the following keys:
            - classification: (Safe, Suspicious, or Phishing)
            - confidenceScore: (0 to 100)
            - redFlags: (Array of specific indicators found)
            - analysis: (Brief explanation of why you classified it this way)
            - actionSteps: (Array of what the user should do)

            Email Content:
            "${content}"
        `;

        const result = await groq.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "llama-3.3-70b-versatile",
        });

        let text = result.choices[0]?.message?.content || "";
        
        const cleanedText = text.replace(/```json|```/g, "").trim();
        const analysisResult = JSON.parse(cleanedText);

        res.status(200).json(analysisResult);

    } catch (error) {
        console.error("AI Analysis Error:", error);
        res.status(500).json({ message: "Error analyzing email", error: error.message });
    }
};