import React from "react";
import LoginCard from "../LoginComponents/LoginCard";
import LoginContext from "../../../Contexts/LoginContext";
export default function Login() {
  return (
    <>
      <LoginContext>
        <LoginCard />
      </LoginContext>
    </>
  );
}
