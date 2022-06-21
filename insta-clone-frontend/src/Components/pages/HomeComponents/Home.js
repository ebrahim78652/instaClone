import React from "react";
import Post from "./Post";
import { homeContext } from "../../../Contexts/HomeContext";
import { useEffect, useContext, useState } from "react";
import Loading from "../../shared/Loading";
export default function Home() {
  const { posts, isLoading } = useContext(homeContext);

  useEffect(() => {}, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="home">
          {posts
            .slice(0)
            .reverse()
            .map((element, index) => (
              <Post
                title={element.post.title}
                body={element.post.body}
                imgUrl={element.post.imgUrl}
                key={element.post._id}
                isLiked={element.isLiked}
                postedBy={element.post.postedBy.name}
                comments={element.post}
                _id={element.post._id}
              ></Post>
            ))}
        </div>
      )}
    </>
  );
}
