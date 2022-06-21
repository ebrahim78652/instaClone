import HomeContext from "../../../Contexts/HomeContext";
import Home from "./Home";
import React from "react";
import ErrorBoundary from "../../shared/Error";

export default function HomeWrapper() {
  return (
    <>
      <ErrorBoundary>
        <HomeContext>
          <Home />
        </HomeContext>
      </ErrorBoundary>
    </>
  );
}
