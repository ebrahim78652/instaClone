import React from "react";
import InputField from "../../shared/InputField";
import Submit from "../../shared/Submit";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { loginContext } from "../../../Contexts/LoginContext";
export default function LoginCard() {
  const {
    email,
    onChangeEmail,
    onChangePassword,
    password,
    onSubmitButtonPressed,
  } = useContext(loginContext);

  return (
    <>
      <div className="card_my_own">
        <div className="cardTitle">Instagram</div>
        <InputField
          value={email}
          onChange={onChangeEmail}
          type="email"
          placeholder="email"
        />
        <InputField
          onChange={onChangePassword}
          value={password}
          type="password"
          placeholder="password"
        />

        <Submit onClick={onSubmitButtonPressed} nameOfButton="LOGIN" />
        <Link to="/signup">Don't have an account?</Link>
      </div>
    </>
  );
}
