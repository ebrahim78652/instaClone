import React from "react";
import CreatePost from "./CreatePost";
import CreatePostContext from "../../../Contexts/CreatePostContext";
export default function CreatePostWrapper() {
  return (
    <>
      <CreatePostContext>
        <CreatePost />
      </CreatePostContext>
    </>
  );
}
