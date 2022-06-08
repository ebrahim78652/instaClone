import React from "react";
import InputField from "../LoginComponents/InputField";
import Submit from "../LoginComponents/Submit";
import { Link } from "react-router-dom";

export default function SignUpCard() {
  return (
    <>
      <div className="card_my_own">
        <div className="cardTitle">Instagram</div>
        <InputField placeholder="name" />
        <InputField type="email" placeholder="email" />
        <InputField type="password" placeholder="password" />

        <Submit nameOfButton="Sign Up" />
        <Link to="/login">Already have an account?</Link>
      </div>
    </>
  );
}
