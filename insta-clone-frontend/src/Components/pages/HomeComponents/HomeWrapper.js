import HomeContext from "../../../Contexts/HomeContext";
import Home from "./Home";
import React from "react";

export default function HomeWrapper() {
  return (
    <>
      <HomeContext>
        <Home />
      </HomeContext>
    </>
  );
}
