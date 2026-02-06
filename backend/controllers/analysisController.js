import Groq from "groq-sdk";
import Analysis from '../models/Analysis.js';
import { simpleParser } from 'mailparser';

// Move Groq instantiation outside to reuse the client
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const analyzeWithAI = async (content) => {
    const prompt = `
        Analyze the following email content for phishing attempts. 
        Provide the result strictly in JSON format with the following keys:
        - classification: (Safe, Suspicious, or Phishing)
        - confidenceScore: (0 to 100)
        - redFlags: (Array of specific indicators found)
        - analysis: (Brief explanation of why you classified it this way)
        - actionSteps: (Array of what the user should do)

        Email Content:
        "${content.substring(0, 5000)}"
    `;

    const result = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama-3.3-70b-versatile",
    });

    let text = result.choices[0]?.message?.content || "";
    const cleanedText = text.replace(/```json|```/g, "").trim();
    
    try {
        return JSON.parse(cleanedText);
    } catch (e) {
        console.error("Failed to parse AI JSON response:", cleanedText);
        throw new Error("AI returned invalid data format. Please try again.");
    }
};

export const analyzeEmail = async (req, res) => {
    try {
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({ message: "No email content provided" });
        }

        const analysisResult = await analyzeWithAI(content);

        // Fixed: Changed emailContent to content to match Analysis.js model
        const analysis = await Analysis.create({
            user: req.user._id,
            content: content,
            result: analysisResult
        });

        res.status(200).json(analysis);

    } catch (error) {
        console.error("AI Analysis Error:", error);
        res.status(500).json({ message: "Error analyzing email", error: error.message });
    }
};

export const analyzeFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const parsed = await simpleParser(req.file.buffer);
        const content = parsed.text || parsed.html || "";

        if (!content) {
            return res.status(400).json({ message: "Could not extract text from the uploaded file" });
        }

        const analysisResult = await analyzeWithAI(content);

        // Fixed: Changed emailContent to content to match Analysis.js model
        const analysis = await Analysis.create({
            user: req.user._id,
            content: content,
            result: analysisResult
        });

        res.status(200).json(analysis);

    } catch (error) {
        console.error("File Analysis Error:", error);
        res.status(500).json({ message: "Error analyzing file", error: error.message });
    }
};

export const getHistory = async (req, res) => {
    try {
        const history = await Analysis.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ message: "Error fetching history" });
    }
};