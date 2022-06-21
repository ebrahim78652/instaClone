import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FollowButton from "./FollowButton";
import UnfollowButton from "./UnfollowButton";
import { useContext } from "react";
import { contextProfileDetails } from "../../../Contexts/ProfileDetailsContext";
import Loading from "../../shared/Loading";

export default function ProfileDetails() {
  const {
    userDetails,
    numPosts,
    numFollowers,
    numFollowing,
    isFollowing,
    setIsFollowing,
    setNumFollowers,
    posts,
    isProfileOfSignedInUser,
    isLoading,
  } = useContext(contextProfileDetails);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="main_description">
            <div className="profile_image">
              <img
                src={userDetails.imgUrl ? userDetails.imgUrl : ""}
                alt="profile pic"
              />
            </div>

            <div className="user_description">
              <div className="name">{userDetails.name}</div>
              <div className="user_stats">
                <div className="posts">{numPosts} Posts</div>
                <div className="followers">{numFollowers} followers</div>
                <div className="following">{numFollowing} following</div>
              </div>
              {!isProfileOfSignedInUser && !isFollowing && (
                <FollowButton
                  setIsFollowing={setIsFollowing}
                  setNumFollowers={setNumFollowers}
                />
              )}
              {!isProfileOfSignedInUser && isFollowing && (
                <UnfollowButton
                  setNumFollowers={setNumFollowers}
                  setIsFollowing={setIsFollowing}
                />
              )}
            </div>
          </div>
          <div className="divider"></div>
          <div className="picture_grid">
            {posts.map((element) => (
              <div key={element._id} className="grid_item">
                <img src={element.imgUrl} alt="random" />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
