import { z } from 'zod';

const SuggestionSchema = z.object({
  section: z.string(),
  issue: z.string(),
  fix: z.string(),
  impact: z.enum(['high', 'medium', 'low'])
});

const SectionScoresSchema = z.object({
  contact: z.number().min(0).max(100),
  summary: z.number().min(0).max(100),
  experience: z.number().min(0).max(100),
  education: z.number().min(0).max(100),
  skills: z.number().min(0).max(100),
  formatting: z.number().min(0).max(100)
});

const AnalysisResponseSchema = z.object({
  atsScore: z.number().min(0).max(100),
  matchedKeywords: z.array(z.string()),
  missingKeywords: z.array(z.string()),
  partialKeywords: z.array(z.string()),
  sectionScores: SectionScoresSchema,
  suggestions: z.array(SuggestionSchema),
  rewrittenResume: z.string(),
  latexSource: z.string()
});

export const parseAnalysisResponse = (responseText) => {
  try {
    // Remove markdown code blocks if present
    let cleanText = responseText.trim();
    if (cleanText.startsWith('```json')) {
      cleanText = cleanText.replace(/```json\n?/g, '').replace(/```\n?$/g, '');
    } else if (cleanText.startsWith('```')) {
      cleanText = cleanText.replace(/```\n?/g, '');
    }

    const parsed = JSON.parse(cleanText);
    const validated = AnalysisResponseSchema.parse(parsed);
    return validated;
  } catch (error) {
    throw new Error('Invalid AI response format: ' + error.message);
  }
};
