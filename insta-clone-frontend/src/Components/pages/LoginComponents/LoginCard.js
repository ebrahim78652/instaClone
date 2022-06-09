import React from "react";
import { useState } from "react";
import InputField from "../../shared/InputField";
import Submit from "../../shared/Submit";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import M from "materialize-css";

export default function LoginCard() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onSubmitButtonPressed = async () => {
    console.log("submit button pressed!");

    //add validation for password and email in the end,
    //because might need to make lots of users for testing

    //now do the fetch to the server here.
    //change the link to use the proxy
    const response = await fetch("/user/auth/signin", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
    })
      .then((resp) => resp.json())
      .then((respBody) => respBody)
      .catch((err) => console.log(err));

    if (response.error) {
      M.toast({ html: response.error, classes: "red lighten-2" });
    } else {
      M.toast({ html: response.message, classes: "green lighten-2" });
      navigate("/");
    }
  };

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
