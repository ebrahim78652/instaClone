import React from "react";
import CreatePost from "./CreatePost";
import CreatePostContext from "../../../Contexts/CreatePostContext";
import ErrorBoundary from "../../shared/Error";
export default function CreatePostWrapper() {
  return (
    <>
      <ErrorBoundary>
        <CreatePostContext>
          <CreatePost />
        </CreatePostContext>
      </ErrorBoundary>
    </>
  );
}
