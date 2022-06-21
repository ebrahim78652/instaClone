import React from "react";
import LoginCard from "../LoginComponents/LoginCard";
import LoginContext from "../../../Contexts/LoginContext";
import ErrorBoundary from "../../shared/Error";

export default function LoginWrapper() {
  return (
    <>
      <ErrorBoundary>
        <LoginContext>
          <LoginCard />
        </LoginContext>
      </ErrorBoundary>
    </>
  );
}
