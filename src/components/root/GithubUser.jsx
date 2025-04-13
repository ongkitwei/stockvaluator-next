"use client";
import React from "react";
import { usernameAtom } from "../../../jotai/UsernameAtoms";
import { useAtom } from "jotai";

function GithubUser({ username }) {
  const [name, setName] = useAtom(usernameAtom);
  setName(username);
  console.log("username is ", name);
  return <div></div>;
}

export default GithubUser;
