import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Get request from Gemini 2.0
export async function GET(requst, { params }) {
  //Define the API endpoint
  try {
    const { stockname } = await params;
    const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAi.getGenerativeModel({ model: "gemini-2.0-flash-exp" }); // Correct usage
    const prompt =
      "can you give me a moat analysis( with a score of 10) on" +
      stockname +
      'The moat analysis includes "brand loyalty & pricing power", "high barriers to entry", "high switching costs", "network effect", "economies of scale". with each giving a score of 10 and a short description. the moat analysis score will be the total average score, which will be shown at the top. We try not to give a perfect score for overall Moat score. Please strictly follow the format i show and avoid adding ```html at the start and end of the response, at the bottom show some of the competitors as well, set the <h1> tag font to 4xl and the <h2> tag font to xl, the format will be as such:' +
      ` 
  <div class="text-white">
  
  <h1 class="text-4xl text-center font-semibold font-irish">${stockname} Overall Moat Analysis Score: x/10</h1>
  
  
  
  <br>
  
  
  
  <h2 class="text-xl font-semibold font-lato">
  
  
  
  Brand Loyalty & Pricing Power: x/10
  
  
  
  </h2>
  
  
  
  <p>description ...</p>
  
  
  
  <br>
  
  
  
  <h2 class="text-xl font-semibold font-lato">
  
  
  
  High Barriers to Entry: x/10
  
  
  
  </h2>
  
  
  
  <p>description ...</p>
  
  
  
  <br>
  
  
  
  <h2 class="text-xl font-semibold font-lato">
  
  
  
  High Switching Costs: x/10
  
  
  
  </h2>
  
  
  
  <p>description ...</p>
  
  
  
  <br>
  
  
  
  <h2 class="text-xl font-semibold font-lato">Network Effect: x/10</h2>
  
  
  
  <p>description ...</p>
  
  
  
  <br>
  
  
  
  <h2 class="text-xl font-semibold font-lato">
  
  
  
  Economies of Scale: x/10
  
  
  
  </h2>
  
  
  
  <p>description ...</p>
  
  
  
  <br>
  
  
  
  <h2 class="text-xl font-semibold font-lato">
  
  
  
  Competitors:
  
  
  
  </h2>
  
  
  
  <p>competitos name (ticker symbol)....</p>
  
  
  </div>
  `;

    const result = await model.generateContent(prompt);

    const responseText = await result.response.text();
    console.log(responseText);
    // const jsonData = await result.response.json();
    return NextResponse.json(responseText);
  } catch (error) {
    console.error("Gemini API Error:", error); // Log the error for debugging
    return NextResponse.json({ error: error.message });
  }
}
