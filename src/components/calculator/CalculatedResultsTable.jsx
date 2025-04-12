"use client";

import { useEffect, useState, useRef } from "react";
import { useAtomValue, useSetAtom, useAtom } from "jotai";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  calculatorObjectAtom,
  discountedValueAtom,
  arrayFcfAtom,
  handleCalculateButtonStateAtom,
  favouritesButtonAtom,
} from "../../../jotai/CalculatorAtoms";
import FavouritesButton from "../../../ui/FavouritesButton";

function CalculatedResultsTable() {
  const [calculatorObject, setCalculatorObject] = useAtom(calculatorObjectAtom);
  const [discountedValue, setDiscountedValue] = useAtom(discountedValueAtom);
  const [fcfs, setArrayFcf] = useAtom(arrayFcfAtom);
  const [favouritesButton, setFavouritesButton] = useAtom(favouritesButtonAtom);

  const handleCalculateButtonState = useAtomValue(
    handleCalculateButtonStateAtom
  );
  const [stockName, setStockName] = useState("");
  const [tickerSymbol, setTickerSymbol] = useState("");
  const isFirstRender = useRef(true); // Track if this is the first render
  const router = useRouter(); // Track the current location (URL)

  useEffect(() => {
    console.log("Initial Mount");
    return () => {
      setStockName("");
      setTickerSymbol("");
      setArrayFcf([]);
      setDiscountedValue([]);
      setCalculatorObject({
        nameOfStock: "",
        tickerSymbol: "",
        freeCashFlow: "",
        cashAndCashEquiv: "",
        totalDebt: "",
        rate1to5: "",
        rate6to10: "",
        rate11to20: "",
        oustandingShares: "",
        discountRate: "",
        currentYear: "",
        intrinsicValue: "",
      });

      setFavouritesButton(false);
      isFirstRender.current = true;
    };
  }, [router.pathname]);

  // useEffect(() => {
  //   setTickerSymbol(calculatorObject.tickerSymbol.toUpperCase());
  // }, [handleCalculateButtonState]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // Mark as not first render
      return; // Exit early to prevent running on mount
    }

    const updateFavourites = async () => {
      try {
        if (favouritesButton) {
          // Post req to supabase

          const response = await axios.post(`/api/supabase/watchlist`, {
            Stock_Name: calculatorObject.nameOfStock,
            Ticker_Symbol: calculatorObject.tickerSymbol,
            IV: calculatorObject.intrinsicValue,
          });
          console.log("Added: ", response.data);
        } else {
          // Delete request to remove favourites stock on supabase
          // const response = await axios.delete(
          //   `http://localhost:4000/api/supabase`
          // );
          const response = await axios.delete(`/api/supabase/watchlist`, {
            data: { Ticker_Symbol: tickerSymbol },
          });
          console.log("Deleted:", response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    updateFavourites();
  }, [favouritesButton]);

  const handleFavouritesButton = async () => {
    setFavouritesButton((x) => !x);
  };

  return (
    <div className="flex justify-center items-center mx-auto flex-col pt-12 pb-12 gap-y-7 md:text-base text-xs">
      {fcfs.length > 1 ? (
        <div className="flex flex-row justify-center items-center">
          <span className="text-[50px] font-extrabold text-pink-300 capitalize font-irish">
            {calculatorObject.nameOfStock}
          </span>
          <span className="pl-3 pr-[100px] text-orange-200 uppercase">
            *{calculatorObject.tickerSymbol}
          </span>
          <span className="badge badge-success badge-lg p-5 mr-3">
            {calculatorObject.intrinsicValue}
          </span>
          <FavouritesButton
            handleFavouritesButton={handleFavouritesButton}
            favouritesButtonColor={favouritesButton ? "green" : "white"}
          />
        </div>
      ) : null}
      <table className="border-white border text-xs" id="calculatedResults">
        <thead>
          <tr className="border border-white">
            {fcfs.length > 1 ? (
              <th className="border border-white bg-orange-400 uppercase font-semibold">
                year
              </th>
            ) : null}
            {fcfs.map((_, index) =>
              index < 10 ? (
                <th className="border border-white bg-orange-400" key={index}>
                  {new Date().getFullYear() + index + 1}
                </th>
              ) : null
            )}
          </tr>
        </thead>
        <tbody>
          <tr className="border border-white bg-slate-500">
            {fcfs.length > 1 ? (
              <td className="border border-white uppercase font-semibold">
                projected fcf
              </td>
            ) : null}
            {fcfs.map((a, index) =>
              index < 10 ? (
                <td className="border border-white" key={index}>
                  {a.toFixed(2)}
                </td>
              ) : null
            )}
          </tr>
        </tbody>
        <tbody>
          <tr className="border border-white bg-slate-500">
            {fcfs.length > 1 ? (
              <td className="border border-white uppercase font-semibold">
                Discounted Value
              </td>
            ) : null}
            {discountedValue.map((a, index) =>
              index < 10 ? (
                <td className="border border-white" key={index}>
                  {a.toFixed(2)}
                </td>
              ) : null
            )}
          </tr>
        </tbody>
      </table>

      <table className="border-white border text-xs">
        <thead>
          <tr className="border border-white">
            {fcfs.length > 1 ? (
              <th className="border border-white p-3 bg-orange-400 uppercase font-semibold">
                year
              </th>
            ) : null}
            {fcfs.map((_, index) =>
              index >= 10 ? (
                <th
                  className="border border-white p-3 bg-orange-400"
                  key={index}
                >
                  {new Date().getFullYear() + index + 1}
                </th>
              ) : null
            )}
          </tr>
        </thead>
        <tbody>
          <tr className="border border-white bg-slate-500">
            {fcfs.length > 1 ? (
              <td className="border border-white p-3 uppercase font-semibold">
                projected fcf
              </td>
            ) : null}
            {fcfs.map((a, index) =>
              index >= 10 ? (
                <td className="border border-white p-3" key={index}>
                  {a.toFixed(2)}
                </td>
              ) : null
            )}
          </tr>
        </tbody>
        <tbody>
          <tr className="border border-white bg-slate-500">
            {fcfs.length > 1 ? (
              <td className="border border-white p-3 uppercase font-semibold">
                discounted value
              </td>
            ) : null}
            {discountedValue.map((a, index) =>
              index >= 10 ? (
                <td className="border border-white p-3" key={index}>
                  {a.toFixed(2)}
                </td>
              ) : null
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CalculatedResultsTable;
