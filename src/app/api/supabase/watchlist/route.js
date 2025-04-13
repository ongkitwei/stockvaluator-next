import { NextResponse } from "next/server";
import { supabase } from "../../../../util/supabase";

export async function POST(request) {
  try {
    const { Stock_Name, Ticker_Symbol, IV, Username } = await request.json();
    console.log("Adding to watchlist to SUPABASE:", {
      Stock_Name,
      Ticker_Symbol,
      IV,
      Username,
    });
    const { data, error } = await supabase
      .from("Watchlist")
      .insert([{ Stock_Name, Ticker_Symbol, IV, Username }])
      .select();
    if (error) {
      console.error("Supabase Error:", error);
      //   return res.status(400).json({ error: error.message });
      return NextResponse.json({ error: error.message });
    }
    // res.status(200).json({ message: "Added successfully", data });
    return NextResponse.json({
      message: "Added successfully",
      data,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message });
  }
}

export async function DELETE(request) {
  try {
    const { Ticker_Symbol, Username } = await request.json();
    const { error } = await supabase
      .from("Watchlist")
      .delete()
      .eq("Ticker_Symbol", Ticker_Symbol)
      .eq("Username", Username);

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json({ error: error.message });
    }
    return NextResponse.json({
      message: `Deleted ${Ticker_Symbol} successfully`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message });
  }
}

// export async function DELETE() {
//   try {
//     const { Stock_Name } = req.body;
//     const { error } = await supabase
//       .from("Watchlist")
//       .delete()
//       .eq("Stock_Name", Stock_Name);
//     if (error) {
//       console.error("Supabase Error:", error);
//       return NextResponse.json({ error: error.message });
//     }
//     return NextResponse.json({ message: "Deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: error.message });
//   }
// }
