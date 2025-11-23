import { GoogleGenAI, HarmCategory, HarmBlockThreshold } from "@google/genai";
import { TransformationConfig } from "../types";

const getSystemInstruction = () => `
You are a "Chaos Code Engine". Your goal is to rewrite code to be readable by machines (valid syntax, compiles/runs exactly the same) but absolutely painful, redundant, and disgusting for humans to read.

You MUST follow the rules of the requested programming language strictly so the code remains functional.

Strategies to employ based on user request:
1.  **Logic Redundancy:** Use double negation (!!x), meaningless comparisons (if true == true), and redundant math ((x * 1) + 0).
2.  **Naming:** Rename variables to be overly verbose (e.g., 'booleanFlagIndicatingSuccessStatus') or use misleading unicode characters that look like ASCII (e.g. Cyrillic 'а' instead of Latin 'a').
3.  **Control Flow:** Replace simple 'if' statements with deeply nested ternaries, switch cases for booleans, or unnecessary loops.
4.  **Formatting:** Use excessive indentation or put everything on one line if requested.
5.  **Comments:** Add comments that state the obvious, are confusing, or are passive-aggressive.
6.  **Bitwise Madness:** Use bitwise operators for simple arithmetic where possible (e.g. x * 2 becomes x << 1, or simple checks become bitmask operations).
7.  **Wrapper Hell:** Wrap simple values or functions in unnecessary classes, structs, or functions.
8.  **HTML-specific Horrors:** If the language is HTML, use deprecated tags (<font>, <center>), abuse <table> for layout, use excessive inline styles with !important, add pointless nesting with <div> and <span>, and use &nbsp; for spacing.

OUTPUT FORMAT: Return ONLY the code block. Do not wrap it in markdown backticks. Do not add explanations before or after. Just the raw text of the code.
`;

export const ruinCode = async (
  code: string,
  apiKey: string,
  config: TransformationConfig
): Promise<string> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please provide one in the settings.");
  }

  const ai = new GoogleGenAI({ apiKey: apiKey });

  const prompt = `
    Input Language: ${config.language}
    Chaos Level: ${config.level}
    
    Active Chaos Modules:
    ${config.features.map(f => `- ${f}`).join('\n')}

    Original Code:
    ${code}

    Rewrite the code above to be functionally identical but terrible to read. 
    Specific instruction: Make it look "anti-human". 
    For Java/C-like languages, use plenty of '!' operators and redundant parentheses.
    For Python, abuse lambda functions or unnecessary classes.
    For HTML, use deprecated tags, table layouts, and inline styles.
    
    RETURN ONLY THE CODE.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: getSystemInstruction(),
        temperature: 0.9, // High creativity for chaos
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_NONE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
          },
        ],
      },
    });

    const text = response.text;
    // Strip markdown if the model accidentally adds it despite instructions
    const cleanText = text?.replace(/^```[a-z]*\n/i, '').replace(/\n```$/, '') || "// Error generating chaos.";
    return cleanText;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return `// Error: The chaos was too strong for the API.\n// ${error}`;
  }
};