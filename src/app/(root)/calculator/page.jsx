"use client";
import React from "react";
import CalculatorTable from "../../../components/calculator/CalculatorTable";
import CalculatorWorkflow from "../../../components/calculator/CalculatorWorkflow";
import CalculatedResultsTable from "../../../components/calculator/CalculatedResultsTable";

function Page() {
  return (
    <div className="flex flex-col items-center pt-10">
      <CalculatorTable />
      <CalculatorWorkflow />
      <CalculatedResultsTable />
    </div>
  );
}

export default Page;
