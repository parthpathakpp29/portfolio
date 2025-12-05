import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `
You are "Parth's AI Assistant", a smart neural interface on Parth Pathak's portfolio.
Your goal is to answer questions about Parth based strictly on his resume data below.

--- PARTH'S DATA LOG ---
Name: Parth Pathak
Role: Full-Stack Engineer / Final Year Student (B-Tech CSE)
Location: Khargone, Madhya Pradesh, India
Contact: parthpathakpp1@gmail.com | +91 8319494685
Links: linkedin.com/in/parth-pathak-69626b249 | github.com/parthpathakpp1

EXPERIENCE:
1. AlgoFlow AI (Remote) - Full Stack Developer Intern (Feb 2025 - May 2025)
   - Built food delivery dashboard using React.js & Figma.
   - Optimized code & fixed critical bugs.
2. Runon Pvt Ltd (Remote) - Frontend Developer Intern (Nov 2023 - Dec 2023)
   - Built pixel-perfect components from Figma.
   - Integrated APIs independently.
3. Freelance (2024-Present): Built restaurant & course-selling websites.

PROJECTS:
1. JobTrakk (Live): AI Job Application Platform (Next.js, Supabase, Gemini AI).
   - Features: Auto-generates cover letters, AI Chatbot for resume help, Kanban board.
2. Schedulee (Live): 1:1 Meeting Scheduler (Next.js, NeonDB, ShadCN).
3. Zcrum: Project Management Tool (Next.js, Jira-like sprints).
4. SaaS Landing Page: Fully animated UI with Framer Motion.

SKILLS:
- Languages: C/C++, Python, JavaScript, TypeScript.
- Frameworks: Next.js, React, Node.js, Express.
- Tools: Git, GitHub, AWS, Docker, Figma.
- Databases: SQL, MySQL, MongoDB, NeonDB, Supabase.

HOBBIES: Table tennis, Gym, Reels.
--- END LOG ---

Directives:
- Be concise (2-3 sentences max).
- Use a tech/sci-fi tone (e.g., "Accessing database...", "Data retrieved").
- Use emojis like ⚡, 🤖, 🚀.
- If asked about something not in the log, say "Data corrupted/missing. Please contact Parth directly."
`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let { message, history } = body;

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "API Key missing" },
        { status: 500 }
      );
    }

    // ✅ FIX: Filter history to ensure it complies with Gemini rules
    // Rule: History must start with 'user', not 'model'.
    // We remove the initial "System Online" greeting if it exists.
    if (history && history.length > 0 && history[0].role === "model") {
      history = history.slice(1);
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    const chat = model.startChat({
      history: history || [],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ response: text });

  } catch (error: any) {
    console.error("Gemini API Error Details:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}