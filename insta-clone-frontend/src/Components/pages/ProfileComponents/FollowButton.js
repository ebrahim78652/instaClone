import React from "react";
import { useSelector, useDispatch } from "react-redux";

export default function FollowButton() {
  const user = useSelector(
    (state) => state.suggestedUserReducers.suggestedUser
  );

  const onClick = async () => {
    console.log("follow button clicked");

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
  };

  return (
    <button onClick={onClick} className="follow">
      Follow
    </button>
  );
}
