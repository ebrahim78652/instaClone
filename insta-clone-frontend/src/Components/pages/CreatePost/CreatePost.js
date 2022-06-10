import React from "react";
import InputField from "../../shared/InputField";
import Submit from "../../shared/Submit";
export default function CreatePost() {
  return (
    <>
      <div className="card_my_own">
        <div className="cardTitle">Create a post</div>
        <InputField type="text" placeholder="Title" />
        <InputField type="text" placeholder="Description" />

        <div className="file-field input-field">
          <div className="btn">
            <span>File</span>
            <input type="file" placeholder="file path here" />
          </div>
          <div className="file-path-wrapper">
            <input
              type="text"
              placeholder="file path"
              className="file-path validate"
            ></input>
          </div>
        </div>

        <Submit nameOfButton="Create Post" />
      </div>
    </>
  );
}
