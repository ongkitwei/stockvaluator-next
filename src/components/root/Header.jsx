import React from "react";
import { GiChargingBull } from "react-icons/gi";
import Link from "next/link";
import { auth, signOut, signIn } from "../../../auth";
import { Provider } from "jotai";
import { redirect } from "next/dist/server/api-utils";

async function Header() {
  const session = await auth();
  return (
    <header className="bg-black w-fit mx-auto sticky top-5 z-50 text-white flex flex-row items-center justify-center sm:px-10 rounded-full">
      <Link
        className="flex-row items-center justify-center p-3 hover:cursor-pointer hidden sm:flex"
        href="/"
      >
        <GiChargingBull className="pr-2 text-3xl sm:text-5xl" />
        <h1 className="text-lg sm:text-2xl font-bold">
          Portfolio<span className="text-yellow-400">Pilot</span>
        </h1>
      </Link>

      {session && session?.user ? (
        <>
          <div className="flex flex-row gap-1 sm:gap-4 text-xs sm:text-lg">
            <Link className="navbar-header" href="/portfolio">
              Portfolio
            </Link>
            <Link className="navbar-header" href="/watchlist">
              Watchlist
            </Link>
            <Link className="navbar-header" href="/calculator">
              Calculator
            </Link>
          </div>
          <button
            onClick={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
            className="navbar-header gap-1 sm:gap-4 text-xs sm:text-lg"
          >
            <span>Logout</span>
          </button>
        </>
      ) : (
        <button
          onClick={async () => {
            "use server";
            await signIn("github");
          }}
        >
          <span className="navbar-header gap-1 sm:gap-4 text-xs sm:text-lg">
            Login
          </span>
        </button>
      )}
    </header>
  );
}

export default Header;
