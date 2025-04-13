import { NextResponse } from "next/server";
import { fetchData } from "../../../../../util/functions";

export async function GET(request, { params }) {
  try {
    const { name } = await params;
    const data = await fetchData("Watchlist", name);
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message });
  }
}
