import React from "react";
import ProfileDetails from "./ProfileDetails.js";
import { useSelector, useDispatch } from "react-redux";

export default function ProfileSearchedUser() {
  const user = useSelector(
    (state) => state.suggestedUserReducers.suggestedUser
  );
  const dispatch = useDispatch();
  console.log("**********************************");
  console.log(user.name);

  return (
    <div>
      <ProfileDetails user={user.name} dispatch={dispatch} />
    </div>
  );
}
