"use client";
import { useAtomValue, useSetAtom, useAtom } from "jotai";
import React, { useEffect } from "react";
import {
  inputFcfAtom,
  inputRate1to5Atom,
  inputRate6to10Atom,
  inputRate11to20Atom,
  discountRateAtom,
  calculatorObjectAtom,
  watchlistObjectAtom,
} from "../../../jotai/CalculatorAtoms";

function CalculatorTable() {
  const [calculatorObject, setCalculatorObject] = useAtom(calculatorObjectAtom);
  const setWatchlistObject = useSetAtom(watchlistObjectAtom);
  //   useEffect(() => {
  //     const fetchSupabaseTableData = async () => {
  //       const response = await fetch("http://localhost:4000/api/supabase");
  //       const result = await response.json();
  //       console.log(result);

  //       const filteredData = result.map((item) => ({
  //         nameOfStock: item.Stock_Name,
  //         tickerSymbol: item.Ticker_Symbol,
  //         intrinsicValue: item.IV
  //       }));
  //       setWatchlistObject(filteredData);
  //     };
  //     fetchSupabaseTableData();
  //   }, []);

  // useEffect(() => {
  //     console.log(inputFcf), [inputFcf];
  //   });
  //   useEffect(() => {
  //     console.log(discountRate), [discountRate];
  //   });
  // useEffect(() => {
  //   async function test() {
  //     try {
  //       const response = await fetch(`/api/supabase/yahoo/lastclose/AAPL`);
  //       console.log(`Fetching data for AAPL:`, response.status); // Log status

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       const data = await response.text();
  //       if (data) {
  //         // newLastCloseArray.push(parseFloat(data));
  //         console.log(data);
  //       }
  //     } catch (error) {
  //       console.error(`Error fetching data for AAPL:`, error);
  //     }
  //   }
  //   test(), [];
  // });
  return (
    <div className="flex flex-col w-[85vw] sm:w-[85vw] md:w-[60vw] lg:w-[60vw] xl:w-[38vw] dark:bg-gray-800 rounded-xl">
      <h1 className="dark:bg-teal-600 h-10 flex items-center pl-5 font-bold uppercase rounded-t-xl">
        stock info
      </h1>
      <div className="flex flex-row items-center justify-between pb-2 px-5 pt-3">
        <label className="calculator-table-text">Ticker Symbol</label>
        <input
          type="text"
          value={calculatorObject.tickerSymbol}
          onChange={(event) => {
            setCalculatorObject({
              ...calculatorObject,
              tickerSymbol: event.target.value.toUpperCase(),
            });
            console.log(calculatorObject.tickerSymbol);
          }}
          placeholder="Enter Ticker Symbol"
          className="calculator-table-text rounded-md py-2 px-3 text-center text-black dark:text-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        ></input>
      </div>
      <div className="flex flex-row items-center justify-between pb-2 px-5">
        <label className="calculator-table-text">Valuation Method</label>
        <input
          type="text"
          placeholder="Discounted Cash Flow"
          readOnly
          className="calculator-table-text rounded-md py-2 px-3 text-center border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-yellow-300 bg-white"
        ></input>
      </div>
      <h1 className="dark:bg-teal-600 h-10 flex items-center pl-5 font-bold uppercase">
        fcf & equity info
      </h1>
      <div className="flex flex-row items-center justify-between pb-2 pt-3 px-5">
        <label className="calculator-table-text">
          Free Cash Flow (current)
        </label>
        <input
          type="text"
          value={calculatorObject.freeCashFlow}
          onChange={(event) => {
            setCalculatorObject({
              ...calculatorObject,
              freeCashFlow: event.target.value,
            });
          }}
          placeholder="Enter Current FCF"
          className="calculator-table-text rounded-md py-2 px-3 text-center text-black border dark:text-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        ></input>
      </div>
      <div className="flex flex-row items-center justify-between pb-2 px-5">
        <label className="calculator-table-text">Cash & Cash Equivalent </label>
        <input
          type="text"
          value={calculatorObject.cashAndCashEquiv}
          onChange={(event) => {
            setCalculatorObject({
              ...calculatorObject,
              cashAndCashEquiv: event.target.value,
            });
          }}
          placeholder="Enter Cash & Cash Equiv"
          className="calculator-table-text rounded-md py-2 px-3 text-center text-black border dark:text-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        ></input>
      </div>
      <h1 className="dark:bg-teal-600 h-10 flex items-center pl-5 font-bold uppercase">
        projected growth free cash flow
      </h1>
      <div className="flex flex-row items-center justify-between pb-2 pt-3 px-5">
        <label className="calculator-table-text">FCF (Yr 1-5)</label>
        <input
          type="text"
          value={calculatorObject.rate1to5}
          onChange={(event) => {
            setCalculatorObject({
              ...calculatorObject,
              rate1to5: event.target.value,
            });
          }}
          placeholder="% Year 1-5"
          className="calculator-table-text rounded-md py-2 px-3 text-center text-black dark:text-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        ></input>
      </div>
      <div className="flex flex-row items-center justify-between pb-2 px-5">
        <label className="calculator-table-text">FCF (Yr 5-10)</label>
        <input
          type="text"
          value={calculatorObject.rate6to10}
          onChange={(event) => {
            setCalculatorObject({
              ...calculatorObject,
              rate6to10: event.target.value,
            });
          }}
          placeholder="% Year 6-10"
          className="calculator-table-text rounded-md py-2 px-3 text-center text-black dark:text-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        ></input>
      </div>
      <div className="flex flex-row items-center justify-between pb-2 px-5">
        <label className="calculator-table-text">FCF (Yr 11-20)</label>
        <input
          type="text"
          value={calculatorObject.rate11to20}
          onChange={(event) => {
            setCalculatorObject({
              ...calculatorObject,
              rate11to20: event.target.value,
            });
          }}
          placeholder="% Year 6-10"
          className="calculator-table-text rounded-md py-2 px-3 text-center text-black dark:text-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        ></input>
      </div>
      <h1 className="dark:bg-teal-600 h-10 flex items-center pl-5 font-bold uppercase">
        shares
      </h1>
      <div className="flex flex-row items-center justify-between pb-2 px-5 pt-3">
        <label className="calculator-table-text">Discount Rate</label>
        <input
          type="text"
          value={calculatorObject.discountRate}
          onChange={(event) => {
            setCalculatorObject({
              ...calculatorObject,
              discountRate: event.target.value,
            });
          }}
          placeholder="% Discount"
          className="calculator-table-text rounded-md py-2 px-3 text-center text-black dark:text-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        ></input>
      </div>
      <div className="flex flex-row items-center justify-between pb-2 px-5">
        <label className="calculator-table-text">Current Year</label>
        <input
          type="text"
          placeholder="2025"
          readOnly
          className="calculator-table-text rounded-md py-2 px-3 text-center text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-yellow-300 bg-white"
        ></input>
      </div>
    </div>
  );
}

export default CalculatorTable;
