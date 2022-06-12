import React from "react";
import Post from "./Post";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../../../store/userSlice";

export default function Home() {
  //here will be the logic for fetching the data.
  //after the component has mounted , we can do a fetch

  //store the posts in local state.
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      //fetch the  posts that are stored in DB
      const response = await fetch("/posts", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((resp) => resp.json())
        .then((respBody) => respBody)
        .catch((err) => console.log(err));
      console.log(response);
      setPosts(response);
    };

    fetchPosts();
  }, []);

  return (
    <div className="home">
      {posts
        .slice(0)
        .reverse()
        .map((element, index) => (
          <Post
            title={element.title}
            body={element.body}
            imgUrl={element.imgUrl}
            key={index}
          ></Post>
        ))}
    </div>
  );
}