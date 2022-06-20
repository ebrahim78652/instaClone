import React from "react";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../store/userSlice";

export const homeContext = React.createContext();

export default function HomeContext({ children }) {
  //here will be the logic for fetching the data.
  //after the component has mounted , we can do a fetch
  console.log("HOME COMPONENT!");
  //store the posts in local state.
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log("HOME USE EFFECT!");

    const fetchPosts = async () => {
      //fetch the  posts that are stored in DB
      const response = await fetch("/posts", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((resp) => {
          console.log(resp);
          return resp.json();
        })
        .then((respBody) => respBody)
        .catch((err) => console.log(err));

      console.log("THIS IS THE RESPONSE");
      console.log(response);
      setPosts(response);
    };

    fetchPosts();
  }, []);

  return (
    <homeContext.Provider
      value={{
        posts,
      }}
    >
      {children}
    </homeContext.Provider>
  );
}
