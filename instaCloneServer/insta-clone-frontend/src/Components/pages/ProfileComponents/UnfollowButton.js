import React from "react";
import { useSelector, useDispatch } from "react-redux";

export default function UnfollowButton({ setNumFollowers, setIsFollowing }) {
  const user = useSelector(
    (state) => state.suggestedUserReducers.suggestedUser
  );

  const onClick = async () => {
    console.log("Unfollow button clicked");

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
  };

  return (
    <button onClick={onClick} className="follow">
      Unfollow
    </button>
  );
}
