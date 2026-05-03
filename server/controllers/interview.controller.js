import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { askAi } from "../services/openRouter.service.js";
export const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Resume required" });
    }
    const filePath = req.file.path;
    const fileBuffer = await fs.promises.readFile(filePath);
    const uint8Array = new Uint8Array(fileBuffer);

    const pdf = await pdfjsLib.getDocument({ data: uint8Array }).promise;

    let resumeText = "";
    //extract text from all pages of pdf
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();

      const pageText = content.items.map((item) => item.str).join(" ");
      resumeText += pageText + "\n";
    }
    resumeText = resumeText.replace(/\s+/g, " ").trim();

    const messages = [
      {
        role: "system",
        content: `
                Extract structured data from the resume.
                Return strictly in JSON:
                {
                    "role":"string",
                    "experience":"string",
                    "projects":["project1","project2"],
                    "skills":["skill1","skill2"]
                }`,
      },
      {
        role: "user",
        content: resumeText,
      },
    ];
    const aiResponse = await askAi({ messages });
    let cleaned = aiResponse.trim();

    // remove ```json and ```
    cleaned = cleaned
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsed;

    try {
      parsed = JSON.parse(cleaned);
    } catch (err) {
      console.log("RAW AI RESPONSE:", aiResponse);
      return res.status(500).json({
        message: "Invalid AI JSON format",
      });
    }
    fs.unlinkSync(filePath);
    return res.json({
      role: parsed.role,
      experience: parsed.experience,
      projects: parsed.projects,
      skills: parsed.skills,
      resumeText,
    });
  } catch (error) {
    console.error("Error analyzing resume:", error);
    res.status(500).json({ message: "Error analyzing resume" });
  }
};
