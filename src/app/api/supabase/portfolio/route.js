import { NextResponse } from "next/server";
import { fetchData } from "../../../../util/functions";
import supabase from "../../../../util/supabase";

export async function GET() {
  try {
    const data = await fetchData("Portfolio");
    console.log(data);
    return NextResponse.json({ "Portfolio Data": data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message });
  }
}

export async function POST() {
  try {
    const {
      Stock_Name,
      Ticker_Symbol,
      No_Of_Shares,
      Average_Price,
      Current_Price,
      IV,
      Valuation,
    } = req.body;
    console.log(
      "Added portfolio" +
        {
          Stock_Name,
          Ticker_Symbol,
          No_Of_Shares,
          Average_Price,
          Current_Price,
          IV,
          Valuation,
        }
    );
    const { data, error } = await supabase
      .from("Portfolio")
      .insert([
        {
          Stock_Name,
          Ticker_Symbol,
          No_Of_Shares,
          Average_Price,
          Current_Price,
          IV,
          Valuation,
        },
      ])
      .select();
    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse({ error: error.message });
    }
    return NextResponse.json({ "Added successfully": data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message });
  }
}
