import React from "react";
import { useSelector } from "react-redux";
import ProfileDetailsWrapper from "./ProfileDetailsWrapper.js";

export default function ProfileSignedInUser() {
  const user = useSelector((state) => state.userReducers.user);

  return (
    <div>
      <ProfileDetailsWrapper user={user.name} isProfileOfSignedInUser={true} />
    </div>
  );
}
