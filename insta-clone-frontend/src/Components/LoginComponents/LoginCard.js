import React from "react";
import InputField from "./InputField";
import Submit from "./Submit";
export default function LoginCard() {
  return (
    <>
      <div className="card">
        <div className="cardTitle">Instagram</div>
        <InputField type="email" placeholder="email" />
        <InputField type="password" placeholder="password" />

        <Submit nameOfButton="LOGIN" />
      </div>
    </>
  );
}
