"use client";

import React, { useEffect } from "react";
import { MdAttachMoney } from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi";
import WatchlistChart from "./WatchlistChart";
import BinIcon from "../../svg/BinIcon";
import axios from "axios";
import { useAtom } from "jotai";
import {
  watchlistObjectAtom,
  lastCloseAtom,
} from "../../../jotai/WatchlistAtoms";
function WatchlistCard({
  stockName,
  currentSharePrice,
  intrinsicValue,
  tickerSymbol,
  onClick,
}) {
  const [watchlistObject, setWatchlistObject] = useAtom(watchlistObjectAtom);
  const [lastClose, setLastClose] = useAtom(lastCloseAtom);

  useEffect(() => {
    console.log("After deleting", watchlistObject);
  }, [watchlistObject]);
  useEffect(() => {
    console.log("last close atom is", lastClose);
    const fetchSupabaseTableData = async () => {
      const newLastCloseArray = [];
      const lastCloseTickerArray = [];
      const response = await fetch("/api/supabase/watchlist");
      const result = await response.json();

      const filteredData = result.map((item) => ({
        nameOfStock: item.Stock_Name,
        tickerSymbol: item.Ticker_Symbol,
        intrinsicValue: item.IV,
      }));

      filteredData.forEach((x) => {
        lastCloseTickerArray.push(x.tickerSymbol);
        newLastCloseArray.push(x.lastClose);
      });

      try {
        const response = await fetch(
          `/api/supabase/yahoo/lastclose/${lastCloseTickerArray.join(",")}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const result = data.map((item) => ({
          ticker: item.symbol,
          lastclose: item.lastClose,
        }));

        console.log("data is", data);
        console.log("result is", result);
        setLastClose(data);
      } catch (error) {
        console.error(`Error fetching data for the tickers}:`, error);
      }
      setWatchlistObject(filteredData);
    };
    fetchSupabaseTableData();
  }, []);

  const manageDeleteModal = async () => {
    const newWatchlistObject = watchlistObject.filter(
      (x) => x.tickerSymbol.trim() != tickerSymbol.trim()
    );
    const newLastClose = lastClose.filter(
      (item) => item.symbol != tickerSymbol.trim()
    );
    setWatchlistObject(newWatchlistObject);
    setLastClose(newLastClose);
    console.log(`delete ${stockName} from supabase`);
    console.log("After deleting", watchlistObject);
    const response = await axios.delete(`/api/supabase/watchlist`, {
      data: { Ticker_Symbol: tickerSymbol },
    });
    console.log("Delete response", response);
  };

  const calculateIvPercentage = () => {
    return Math.abs(
      Number(
        (((intrinsicValue - currentSharePrice) / intrinsicValue) * 100).toFixed(
          2
        )
      )
    );
  };
  const ivPercentage = calculateIvPercentage();
  return (
    <div className="w-[300px] h-[280px] sm:w-[350px] md:w-[480px] bg-black border-2 border-gray-800 grid grid-rows-3 place-items-center px-5 rounded-2xl hover:cursor-pointer">
      <div className="flex flex-row justify-center items-center gap-x-4 pt-5 pb-12">
        {" "}
        <h1
          className="font-semibold sm:text-2xl md:text-3xl text-xl"
          onClick={onClick}
        >
          {stockName}
        </h1>
        <BinIcon onClick={manageDeleteModal} />
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box max-h-[600px] max-w-[600px] m-auto rounded-2xl p-12">
            <form method="dialog">
              {/* Close button */}
              <button className="btn btn-lg btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <div className="flex flex-col items-center justify-center gap-y-7">
              <p className="text-2xl">Delete from watchlist?</p>
              <div className="flex flex-row justify-center items-center gap-x-5">
                <form method="dialog">
                  <button className="btn btn-accent">DELETE</button>
                </form>
                <form method="dialog">
                  <button className="btn btn-error">CANCEL</button>
                </form>
              </div>
            </div>
          </div>
        </dialog>
      </div>
      <div
        className="flex flex-row items-center justify-center gap-2"
        onClick={onClick}
      >
        <div className="grid grid-rows-2 place-items-center gap-y-4">
          <div className="bg-gray-300 w-[170px] md:w-[300px] h-6 flex items-center justify-between text-gray-700 rounded-md text-xs md:text-sm px-2 md:px-4">
            <div className="flex items-center">
              <MdAttachMoney />
              <span className="pl-1">Current Price</span>
            </div>
            {currentSharePrice}
          </div>
          <div className="bg-gray-300 w-[170px] md:w-[300px] h-6 flex items-center justify-between text-center text-gray-700 rounded-md text-xs md:text-sm px-4">
            <div className="flex items-center">
              <GiMoneyStack />
              <span className="pl-1">Intrinsic Value</span>
            </div>
            {intrinsicValue}
          </div>
        </div>
        <p
          className={`${
            intrinsicValue > currentSharePrice ? "bg-green-500" : "bg-red-500"
          } w-20 h-[70px] md:w-24 md:h-[70px] flex items-center justify-center text-center text-gray-700 rounded-md font-semibold`}
        >
          {ivPercentage}%
        </p>
      </div>
      <WatchlistChart tickerSymbol={tickerSymbol} onClick={onClick} />
    </div>
  );
}

export default WatchlistCard;
