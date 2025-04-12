"use client";
import parse from "html-react-parser";
import React, { useState } from "react";
import { useAtom } from "jotai";
import WatchlistCard from "./WatchlistCard";
import DOMPurify from "dompurify";
import {
  watchlistObjectAtom,
  lastCloseAtom,
} from "../../../jotai/WatchlistAtoms";
import { Irish_Grover } from "next/font/google";

const irish = Irish_Grover({ subsets: ["latin"], weight: "400" });

function WatchlistBody() {
  const [watchlistObject, setWatchlistObject] = useAtom(watchlistObjectAtom);
  const [lastClose, setLastClose] = useAtom(lastCloseAtom);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [_, setError] = useState(null);
  let sanitizedText = "";
  console.log("last close is ", lastClose);
  async function handleGenerateButton(nameOfStock) {
    const modal = document.getElementById("my_modal_3");
    if (modal) modal.showModal();
    try {
      setLoading(true);
      //   setInputStockName(nameOfStock);
      const response = await fetch(`/api/supabase/gemini/${nameOfStock}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }
      const text = await response.text(); // Read response as text first
      sanitizedText = text
        .replace(/\\n/g, "")
        .replace(/\\"/g, '"')
        .slice(1, -1);

      console.log("text:", sanitizedText);
      setResponse(sanitizedText);
    } catch (err) {
      console.error("Error fetching text:", err);
      setError(err.message);
    } finally {
      setLoading(false); // Set loading to false *after* the fetch call completes (success or error)
    }
  }
  return (
    <>
      <div className="grid grid-rows-1 gap-7 p-12 m-auto lg:grid-cols-2 lg:m-auto lg:gap-x-5 xl:grid xl:grid-cols-2 2xl:grid 2xl:grid-cols-3 2xl:gap-10">
        {watchlistObject.map((x, index) => (
          <WatchlistCard
            key={x.tickerSymbol}
            stockName={x.nameOfStock}
            currentSharePrice={
              lastClose.find((item) => item.symbol === x.tickerSymbol)
                ?.lastClose
            }
            intrinsicValue={x.intrinsicValue}
            tickerSymbol={x.tickerSymbol}
            onClick={() => handleGenerateButton(x.nameOfStock)}
          />
        ))}
        {/* <p>{watchlistObject.map((x: any) => x.tickerSymbol)}</p> */}
      </div>
      {/* Modal */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box max-h-[600px] max-w-[600px] m-auto rounded-2xl p-12">
          <form method="dialog">
            {/* Close button */}
            <button className="btn btn-lg btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="flex flex-col items-center justify-center">
            {loading ? (
              <span className="loading loading-spinner loading-xl"></span>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: response }} />
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}

export default WatchlistBody;
