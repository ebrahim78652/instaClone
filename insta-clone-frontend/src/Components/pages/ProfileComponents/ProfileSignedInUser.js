import React from "react";
import ProfileDetails from "./ProfileDetails.js";
import { useSelector, useDispatch } from "react-redux";

export default function ProfileSignedInUser() {
  const user = useSelector((state) => state.userReducers.user);
  const dispatch = useDispatch();
  console.log("**********************************");
  console.log(user.name);

  return (
    <div>
      <ProfileDetails user={user.name} isProfileOfSignedInUser={true} />
    </div>
  );
}
