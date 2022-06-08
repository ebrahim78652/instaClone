import React from "react";
import InputField from "../LoginComponents/InputField";
import Submit from "../LoginComponents/Submit";
export default function SignUpCard() {
  return (
    <>
      <div className="card">
        <div className="cardTitle">Instagram</div>
        <InputField placeholder="name" />
        <InputField type="email" placeholder="email" />
        <InputField type="password" placeholder="password" />

        <Submit nameOfButton="Sign Up" />
      </div>
    </>
  );
}
