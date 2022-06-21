import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../shared/Loading";
import { useEffect, useState } from "react";

export default function UnfollowButton({ setNumFollowers, setIsFollowing }) {
  const user = useSelector(
    (state) => state.suggestedUserReducers.suggestedUser
  );
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    console.log("Unfollow button clicked");
    setIsLoading(true);

    const response = await fetch(`/user/unfollow/${user.name}`, {
      method: "PUT",

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((resp) => resp.json())
      .then((respBody) => respBody)
      .catch((err) => console.log(err));

    console.log(response);
    setNumFollowers(response.numFollowersUpdated);
    setIsFollowing((prev) => !prev);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <button onClick={onClick} className="follow">
          Unfollow
        </button>
      )}
    </>
  );
}
