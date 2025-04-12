import { symbol } from "joi";
import { supabase } from "./supabase";
import yahooFinance from "yahoo-finance2";

// Remove the warning showing
yahooFinance.suppressNotices(["ripHistorical"]);

export const getCalculatorInfo = async (ticker) => {
  try {
    const results = await yahooFinance.quoteSummary(ticker, {
      modules: ["defaultKeyStatistics", "financialData"], // Fetch the financial data
    });
    const result = await yahooFinance.quote(ticker);
    const stockName = result.longName || result.shortName;
    const impliedSharesOutstanding = Math.trunc(
      parseInt(results.defaultKeyStatistics.impliedSharesOutstanding / 1000000)
    );
    const totalDebt = Math.trunc(
      parseInt(results.financialData.totalDebt) / 1000000
    );
    console.log("loading");
    console.log(impliedSharesOutstanding);
    console.log(totalDebt);
    return { impliedSharesOutstanding, totalDebt, stockName };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Format date for input for yahoo finance
export const formateDate = () => {
  const date = new Date();
  const dateString = date.toISOString();
  const changeDateFormat = dateString.split("T")[0].toString();

  const tenYearsAgoYear = (parseInt(date.getFullYear()) - 1).toString();
  const monthString = (date.getMonth() + 1).toString().padStart(2, "0");
  const dayString = date.getDate().toString().padStart(2, "0");
  const dateTenYearsAgo = tenYearsAgoYear + "-" + monthString + "-" + dayString;
  return { changeDateFormat, dateTenYearsAgo };
};

// Get last close price
export const getLastClosePrice = async (ticker) => {
  try {
    const result = await yahooFinance.quote(ticker);
    if (result == undefined) {
      console.log("undefined");
    }
    // if (!result || !result.regularMarketPrice) {
    //   throw new Error(`No valid data found for ticker: ${ticker}`);
    // }
    const prices = result.map((x) => ({
      symbol: x.symbol,
      lastClose: x.regularMarketPrice,
    }));
    console.log(`Last close prices for watchlist ticker: `, prices);
    return prices;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Fetch data from Supabase table
export const fetchData = async (tableName) => {
  const { data, error } = await supabase.from(tableName).select();
  if (error) {
    throw new Error(
      `(server side) Error fetching data from ${tableName}: ${error.message}`
    );
  }
  return data;
};

// Insert Data to Supabase table
export const insertData = async (stockName, tickerSymbol, intrinsicValue) => {
  try {
    const { data, error } = await supabase.from("Watchlist").insert({
      Stock_Name: stockName,
      Ticker_Symbol: tickerSymbol,
      IV: intrinsicValue,
    });
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
