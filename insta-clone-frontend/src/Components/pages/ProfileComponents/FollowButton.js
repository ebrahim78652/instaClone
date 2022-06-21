import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Loading from "../../shared/Loading";

export default function FollowButton({ setNumFollowers, setIsFollowing }) {
  const user = useSelector(
    (state) => state.suggestedUserReducers.suggestedUser
  );

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    console.log("follow button clicked");
    setIsLoading(true);

    const response = await fetch(`/user/follow/${user.name}`, {
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
          Follow
        </button>
      )}
    </>
  );
}
