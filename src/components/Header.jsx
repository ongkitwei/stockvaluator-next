"use client";
import React, { useState } from "react";
import { GiChargingBull } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { IoMenu } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";

function Header() {
  const [isExpanded, setExpanded] = useState(false);
  function toggleButton() {
    isExpanded ? setExpanded(false) : setExpanded(true);
  }
  return (
    <header className="bg-black sticky top-5 z-50 mx-auto w-[300px] sm:w-[600px] text-white rounded-full">
      <div className="flex flex-row items-center justify-between bg-black-500 p-1 px-3 rounded-full gap:8 md:gap-12 ">
        <Link
          className="flex items-center justify-center p-3 rounded-full hover:shadow-lg hover:shadow-gray-600 hover:cursor-pointer transition-shadow"
          href="/homepage"
        >
          <GiChargingBull size={45} className="pr-2" />
          <h1 className="text-2xl font-bold">
            Portfolio<span className="text-yellow-400">Pilot</span>
          </h1>
        </Link>
        <div className="hidden sm:flex flex-row gap-2 text-base md:text-lg">
          <Link className="p-3 rounded-full link link-hover" href="/portfolio">
            Portfolio
          </Link>
          <Link className="p-3 rounded-full link link-hover" href="/watchlist">
            Watchlist
          </Link>
          <Link className="p-3 rounded-full link link-hover" href="/calculator">
            Calculator
          </Link>
        </div>
        <div className="hidden sm:flex flex-row">
          <div className="p-2 rounded-full"></div>
        </div>
        <div className="flex sm:hidden p-5" onClick={toggleButton}>
          {isExpanded ? (
            <RxCross1 size={20} className="hover:cursor-pointer" />
          ) : (
            <IoMenu size={20} className="hover:cursor-pointer" />
          )}
        </div>
      </div>
      <div
        className={
          isExpanded
            ? "left-0 top-0 py-5 px-10 w-screen h-screen bg-black text-white ease-in-out duration-500"
            : "fixed left-[-100%]"
        }
      >
        <ul>
          <li className="pb-5 border-b border-gray-200 border-r border-r-gray-900 pt-5 hover:cursor-pointer uppercase">
            <Link href="/myportfolio">My Portfolios</Link>
          </li>
          <li className="pb-5 border-b border-gray-200 border-r border-r-gray-900 pt-5 hover:cursor-pointer uppercase">
            <Link href="/mywatchlist">My Watchlist</Link>
          </li>
          <li className="pb-5 border-b border-gray-200 border-r border-r-gray-900 pt-5 hover:cursor-pointer uppercase">
            <Link href="/stockanalysis">Stock Analysis</Link>
          </li>
          <li className="pb-5 border-b border-gray-200 border-r border-r-gray-900 pt-5 hover:cursor-pointer uppercase">
            <Link href="/calculator">Calculator</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
