export const buildAnalysisPrompt = (resumeText, jobDescText) => {
  return `You are an ATS (Applicant Tracking System) expert. Analyze the resume against the job description and respond ONLY with valid JSON matching this exact schema:

{
  "atsScore": number (0-100),
  "matchedKeywords": string[],
  "missingKeywords": string[],
  "partialKeywords": string[],
  "sectionScores": {
    "contact": number (0-100),
    "summary": number (0-100),
    "experience": number (0-100),
    "education": number (0-100),
    "skills": number (0-100),
    "formatting": number (0-100)
  },
  "suggestions": [
    {
      "section": string,
      "issue": string,
      "fix": string,
      "impact": "high" | "medium" | "low"
    }
  ],
  "rewrittenResume": string,
  "latexSource": string
}

EXAMPLE OUTPUT:
{
  "atsScore": 72,
  "matchedKeywords": ["JavaScript", "React", "Node.js"],
  "missingKeywords": ["TypeScript", "AWS", "Docker"],
  "partialKeywords": ["frontend development"],
  "sectionScores": {
    "contact": 95,
    "summary": 70,
    "experience": 75,
    "education": 85,
    "skills": 60,
    "formatting": 80
  },
  "suggestions": [
    {
      "section": "Skills",
      "issue": "Missing key technologies mentioned in JD",
      "fix": "Add TypeScript, AWS, Docker to skills section",
      "impact": "high"
    }
  ],
  "rewrittenResume": "Full optimized resume text here...",
  "latexSource": "\\\\documentclass{article}\\n\\\\begin{document}..."
}

JOB DESCRIPTION:
${jobDescText}

RESUME:
${resumeText}

Analyze thoroughly and return ONLY the JSON object. No markdown, no explanations.`;
};
