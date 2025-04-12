"use client";

import React, { useEffect, useState } from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";

function WatchlistChart({ tickerSymbol, onClick }) {
  const [lastClose, setLastClose] = useState([]);

  const fetchStockData = async () => {
    try {
      const response = await fetch(
        `/api/supabase/yahoo/tenyears/${tickerSymbol}`
      );
      const result = await response.json();
      console.log("ten years result is ", result);
      const allClosedPrice = result.map((item) => item.close);
      setLastClose(allClosedPrice);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  useEffect(() => {
    fetchStockData();
  }, []);

  // Determine trend color
  const isUptrend =
    lastClose.length > 1 && lastClose[lastClose.length - 1] > lastClose[0];
  const lineColor = isUptrend ? "green" : "red";

  return (
    <div
      className="w-[200px] sm:w-[300px] md:w-[400px] h-[100px] flex items-center justify-center"
      onClick={onClick}
    >
      <Sparklines data={lastClose} width={200} height={25}>
        <SparklinesLine color={lineColor} />
      </Sparklines>
    </div>
  );
}

export default WatchlistChart;
