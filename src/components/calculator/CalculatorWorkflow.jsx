"use client";
import React, { useState } from "react";
import { useAtomValue, useSetAtom, useAtom } from "jotai";
import WarningIcon from "../../svg/WarningIcon";
import {
  calculatorObjectAtom,
  discountedValueAtom,
  arrayFcfAtom,
  handleCalculateButtonStateAtom,
  favouritesButtonAtom,
} from "../../../jotai/CalculatorAtoms";

function CalculatorWorkflow() {
  const [calculatorObject, setCalculatorObject] = useAtom(calculatorObjectAtom);

  const setDiscountedValue = useSetAtom(discountedValueAtom);
  const setArrayFcf = useSetAtom(arrayFcfAtom);
  const setHandleCalculateButtonState = useSetAtom(
    handleCalculateButtonStateAtom
  );
  const setFavouritesButton = useSetAtom(favouritesButtonAtom);

  const [errorMessage, setErrorMessage] = useState(false);
  const [_, setFcfGrowthYears] = useState([]);

  function calculateIntrinsicValue(
    sumDiscountedValue,
    cashAndCashEquiv,
    debt,
    shares
  ) {
    return parseFloat(
      ((cashAndCashEquiv + sumDiscountedValue - debt) / shares).toFixed(2)
    );
  }

  function calculateDiscountedValue(currentFcf, discountRate, gapInYear) {
    const discountedValue = currentFcf / (1 + discountRate / 100) ** gapInYear;
    return discountedValue;
  }

  function handleClearInputFieldButton() {
    setCalculatorObject((x) => ({
      ...x,
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
    }));
    setFavouritesButton((x) => !x);
  }

  async function handleCalculateButton() {
    if (
      isNaN(parseFloat(calculatorObject.freeCashFlow)) ||
      calculatorObject.rate1to5 == "" ||
      calculatorObject.rate6to10 == "" ||
      calculatorObject.rate11to20 == "" ||
      calculatorObject.discountRate == ""
    ) {
      setErrorMessage(true);
    } else {
      try {
        const response = await fetch(
          `/api/supabase/calculator/${calculatorObject.tickerSymbol}`
        );

        if (!response.ok) {
          setErrorMessage(true);
          throw new Error(`HTTP error! Status: ${response.status}`); // Stop execution
        }
        const data = await response.json();
        console.log(`data fetch in json: ${data}`);
        console.log(`Stock name fetch: ${data.stockName}`);
        console.log(`Total Shares fetch: ${data.impliedSharesOutstanding}`);
        console.log(`Total Debt fetch: ${data.totalDebt}`);
        console.log(
          `Fetching data for ${calculatorObject.tickerSymbol}, status: `,
          response.status
        ); // Log status
        setErrorMessage(false);
        setCalculatorObject((prev) => ({
          ...prev,
          nameOfStock: data.stockName,
        }));
        console.log("Updated calculator object state: ", calculatorObject);
        setFcfGrowthYears([]);
        setArrayFcf([]);
        const currentYear = new Date().getFullYear();
        const principal = parseFloat(calculatorObject.freeCashFlow);
        const rateYear1to5 = parseFloat(calculatorObject.rate1to5) / 100;
        const rateYear6to10 = parseFloat(calculatorObject.rate6to10) / 100;
        const rateYear11to20 = parseFloat(calculatorObject.rate11to20) / 100;
        let newArrayFcfs = [];
        let newArrayDiscountedValues = [];
        let sumDiscountedValue = 0;

        for (let i = 1; i < 21; i++) {
          if (i <= 5) {
            newArrayFcfs.push(principal * (1 + rateYear1to5) ** i);
          } else if (i > 5 && i <= 10) {
            newArrayFcfs.push(newArrayFcfs[4] * (1 + rateYear6to10) ** (i - 5));
          } else {
            newArrayFcfs.push(
              newArrayFcfs[9] * (1 + rateYear11to20) ** (i - 10)
            );
          }
          let currentDiscountedValue = calculateDiscountedValue(
            newArrayFcfs[i - 1],
            parseFloat(calculatorObject.discountRate),
            i
          );
          setFcfGrowthYears((x) => [...x, currentYear + i]);
          // setDiscountedValue((x) => [...x, currentDiscountedValue]);
          newArrayDiscountedValues.push(currentDiscountedValue);
        }

        for (let i = 0; i < newArrayDiscountedValues.length; i++) {
          sumDiscountedValue += newArrayDiscountedValues[i];
        }

        setCalculatorObject((x) => ({
          ...x,
          intrinsicValue: calculateIntrinsicValue(
            sumDiscountedValue,
            parseFloat(calculatorObject.cashAndCashEquiv),
            parseFloat(data.totalDebt),
            parseFloat(data.impliedSharesOutstanding)
          ),
        }));
        setArrayFcf(newArrayFcfs);
        setDiscountedValue(newArrayDiscountedValues);
        setHandleCalculateButtonState((x) => x + 1);
      } catch (error) {
        console.error("CALCULATION FAILED, error:  " + error);
        setErrorMessage(true);
      }
    }
  }

  return (
    <div>
      <div className="flex flex-row items-center justify-center gap-8 pt-3 pb-7">
        <a
          className="relative inline-flex items-center justify-center px-8 sm:px-14 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group mt-5 hover:cursor-pointer"
          onClick={handleClearInputFieldButton}
        >
          <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-red-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
          <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
          <span className="relative">Clear Input</span>
        </a>
        <a
          className="relative inline-flex items-center justify-center px-8 sm:px-14 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group mt-5 hover:cursor-pointer"
          onClick={handleCalculateButton}
          href="#calculatedResults"
        >
          <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
          <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
          <span className="relative">Calculate</span>
        </a>
      </div>
      {errorMessage ? (
        <div role="alert" className="alert alert-warning">
          <WarningIcon />
          <span>Warning: Check Ticker Symbol and values entered AGAIN</span>
        </div>
      ) : null}
    </div>
  );
}

export default CalculatorWorkflow;
