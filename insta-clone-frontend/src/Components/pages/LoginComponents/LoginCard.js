import React from "react";
import InputField from "../../shared/InputField";
import Submit from "../../shared/Submit";
import { Link } from "react-router-dom";

export default function LoginCard() {
  return (
    <>
      <div className="card_my_own">
        <div className="cardTitle">Instagram</div>
        <InputField type="email" placeholder="email" />
        <InputField type="password" placeholder="password" />

        <Submit nameOfButton="LOGIN" />
        <Link to="/signup">Don't have an account?</Link>
      </div>
    </>
  );
}
