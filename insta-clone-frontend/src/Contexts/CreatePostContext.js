import React from "react";

import { useState } from "react";
import M from "materialize-css";
import { postDetails } from "../utils/uploadImage";

export const createPostContext = React.createContext();

export default function CreatePostContext({ children }) {
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [imgFile, setImgFile] = useState();

  const onSubmitButtonPressed = async () => {
    console.log("submit button pressed!");

    //img url will be saved in below variable
    const imgUrl = await postDetails(imgFile);
    const response = await fetch("/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title, body, imgUrl }),
    })
      .then((resp) => resp.json())
      .then((respBody) => respBody)
      .catch((err) => console.log(err));

    if (response.error) {
      M.toast({ html: response.error, classes: "red lighten-2" });
    } else {
      M.toast({ html: response.message, classes: "green lighten-2" });
      //also clear all the fields after the post has been created!
    }
  };

  const onChangeText = (e) => {
    setTitle(e.target.value);
  };
  const onChangeDescription = (e) => {
    setBody(e.target.value);
  };
  const onChangeFile = (e) => {
    setImgFile(e.target.files[0]);
  };

  return (
    <createPostContext.Provider
      value={{
        onChangeText,
        onChangeDescription,
        onChangeFile,
        onSubmitButtonPressed,
        title,
        body,
      }}
    >
      {children}
    </createPostContext.Provider>
  );
}
