import { NextResponse } from "next/server";
import { formateDate } from "../../../../../../util/functions";
import yahooFinance from "yahoo-finance2";

export async function GET(request, { params }) {
  try {
    let { ticker } = await params;

    console.log("ticker params is", ticker);

    const { changeDateFormat, dateTenYearsAgo } = formateDate();
    const result = await yahooFinance.historical(ticker, {
      period1: dateTenYearsAgo,
      period2: changeDateFormat,
      interval: "1mo",
    });
    return NextResponse.json(result);
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ error: error.message });
  }
}
