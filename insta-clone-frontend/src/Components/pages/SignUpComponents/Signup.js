import React from "react";
import SignUpCard from "./SignUpCard";
import SignUpContext from "../../../Contexts/SignUpContext";
export default function Signup() {
  return (
    <>
      <SignUpContext>
        <SignUpCard />
      </SignUpContext>
    </>
  );
}
