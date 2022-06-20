import React from "react";
import InputField from "../../shared/InputField";
import Submit from "../../shared/Submit";

import { useContext } from "react";
import { createPostContext } from "../../../Contexts/CreatePostContext";
export default function CreatePost() {
  const {
    onChangeText,
    onChangeDescription,
    onChangeFile,
    onSubmitButtonPressed,
    title,
    body,
  } = useContext(createPostContext);

  return (
    <>
      <div className="card_my_own">
        <div className="cardTitle">Create a post</div>
        <InputField
          onChange={onChangeText}
          value={title}
          type="text"
          placeholder="Title"
        />
        <InputField
          onChange={onChangeDescription}
          type="text"
          placeholder="Description"
          value={body}
        />

        <div className="file-field input-field">
          <div className="btn">
            <span>File</span>
            <input
              onChange={onChangeFile}
              type="file"
              placeholder="file path here"
            />
          </div>
          <div className="file-path-wrapper">
            <input
              type="text"
              placeholder="file path"
              className="file-path validate"
            ></input>
          </div>
        </div>

        <Submit onClick={onSubmitButtonPressed} nameOfButton="Create Post" />
      </div>
    </>
  );
}
