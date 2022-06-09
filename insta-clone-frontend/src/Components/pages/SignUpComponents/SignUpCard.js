import React, { useState, uesEffect } from "react";
import InputField from "../../shared/InputField";
import Submit from "../../shared/Submit";
import { Link } from "react-router-dom";

export default function SignUpCard() {
  //make the inputs controlled elements
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmitButtonPressed = async () => {
    console.log("submit button pressed!");
    //now do the fetch to the server here.
    //change the link to use the proxy
    const response = await fetch(
      "http://localhost:8000/api/user/auth/new-User",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password, email }),
      }
    )
      .then((resp) => resp.json())
      .then((respBody) => respBody);

    console.log(response);
  };
  return (
    <>
      <div className="card_my_own">
        <div className="cardTitle">Instagram</div>
        <InputField
          value={name}
          onChange={onChangeName}
          type="text"
          placeholder="name"
        />
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

        <Submit onClick={onSubmitButtonPressed} nameOfButton="Sign Up" />
        <Link to="/login">Already have an account?</Link>
      </div>
    </>
  );
}
