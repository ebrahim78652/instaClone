import React from "react";
import SignUpCard from "./SignUpCard";
import SignUpContext from "../../../Contexts/SignUpContext";
import ErrorBoundary from "../../shared/Error";

export default function SignupWrapper() {
  return (
    <>
      <ErrorBoundary>
        <SignUpContext>
          <SignUpCard />
        </SignUpContext>
      </ErrorBoundary>
    </>
  );
}
