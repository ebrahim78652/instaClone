import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import M from "materialize-css";
import { postDetails } from "../utils/uploadImage";

export const signupContext = React.createContext();

export default function SignUpContext({ children }) {
  //make the inputs controlled elements
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [imgFile, setImgFile] = useState();

  const navigate = useNavigate();

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeFile = (e) => {
    setImgFile(e.target.files[0]);
  };

  const onSubmitButtonPressed = async () => {
    console.log("submit button pressed!");

    const imgUrl = await postDetails(imgFile);

    //add validation for password and email in the end,
    //because might need to make lots of users for testing

    //now do the fetch to the server here.
    //change the link to use the proxy
    const response = await fetch("/user/auth/new-User", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, password, email, imgUrl }),
    })
      .then((resp) => resp.json())
      .then((respBody) => respBody)
      .catch((err) => console.log(err));

    if (response.error) {
      M.toast({ html: response.error, classes: "red lighten-2" });
    } else {
      M.toast({ html: response, classes: "green lighten-2" });
      navigate("/login");
    }
  };

  return (
    <signupContext.Provider
      value={{
        name,
        onChangeName,
        email,
        onChangeEmail,
        password,
        onChangePassword,
        onChangeFile,
        onSubmitButtonPressed,
      }}
    >
      {children}
    </signupContext.Provider>
  );
}
