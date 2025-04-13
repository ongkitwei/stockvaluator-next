import React from "react";
import { GiChargingBull } from "react-icons/gi";
import Link from "next/link";
import { auth, signOut, signIn } from "../../../auth";
import GithubUser from "../root/GithubUser";
import { Provider } from "jotai";
import { redirect } from "next/dist/server/api-utils";
import GitHub from "next-auth/providers/github";

async function Header() {
  const session = await auth();
  return (
    <header className="bg-black w-[75vw] md:w-[600px] h-14 mx-auto sticky top-5 z-50 text-white flex flex-row items-center justify-center rounded-full">
      <Link
        className="flex-row items-center justify-center p-3 hover:cursor-pointer hidden md:flex"
        href="/"
      >
        <GiChargingBull className="pr-2 text-3xl sm:text-5xl" />
        <h1 className="text-lg sm:text-2xl font-bold">
          Portfolio<span className="text-yellow-400">Pilot</span>
        </h1>
      </Link>

      {session && session?.user ? (
        <>
          <div className="flex flex-row gap-1 sm:gap-4 text-sm sm:text-base">
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
            className="navbar-header gap-1 sm:gap-4 text-sm sm:text-base"
          >
            <span>Logout</span>
            <GithubUser username={session?.user?.name} />
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
