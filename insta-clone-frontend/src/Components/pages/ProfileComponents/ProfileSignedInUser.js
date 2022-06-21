import React from "react";
import ProfileDetails from "./ProfileDetails.js";
import { useSelector, useDispatch } from "react-redux";
import ProfileDetailsWrapper from "./ProfileDetailsWrapper.js";

export default function ProfileSignedInUser() {
  const user = useSelector((state) => state.userReducers.user);
  const dispatch = useDispatch();

  return (
    <div>
      <ProfileDetailsWrapper user={user.name} isProfileOfSignedInUser={true} />
    </div>
  );
}
