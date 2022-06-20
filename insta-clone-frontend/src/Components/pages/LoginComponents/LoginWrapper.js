import React from "react";
import LoginCard from "../LoginComponents/LoginCard";
import LoginContext from "../../../Contexts/LoginContext";
export default function LoginWrapper() {
  return (
    <>
      <LoginContext>
        <LoginCard />
      </LoginContext>
    </>
  );
}
