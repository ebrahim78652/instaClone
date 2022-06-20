import React from "react";
import SignUpCard from "./SignUpCard";
import SignUpContext from "../../../Contexts/SignUpContext";
export default function SignupWrapper() {
  return (
    <>
      <SignUpContext>
        <SignUpCard />
      </SignUpContext>
    </>
  );
}
