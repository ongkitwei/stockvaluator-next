import { NextResponse } from "next/server";
import { getCalculatorInfo } from "../../../../../util/functions";

export async function GET(request, { params }) {
  try {
    const { ticker } = await params;
    const { impliedSharesOutstanding, totalDebt, stockName } =
      await getCalculatorInfo(ticker.toUpperCase());
    return NextResponse.json({
      impliedSharesOutstanding,
      totalDebt,
      stockName,
    });
  } catch (error) {
    console.error(error.message);
    return NextResponse.json({ error: error.message });
  }
}
