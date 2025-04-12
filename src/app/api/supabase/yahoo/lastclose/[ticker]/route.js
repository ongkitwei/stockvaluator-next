import { NextResponse } from "next/server";
import { getLastClosePrice } from "../../../../../../util/functions";
import { json } from "stream/consumers";

export async function GET(request, { params }) {
  try {
    let { ticker } = await params;
    ticker = ticker.split(",");
    console.log("symbol is", ticker);
    const data = await getLastClosePrice(ticker);

    console.log("last close returning data", data);
    console.log(typeof data);

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message });
  }
}
