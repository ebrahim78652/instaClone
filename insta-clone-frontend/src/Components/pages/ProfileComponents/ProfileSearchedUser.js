import React from "react";
import ProfileDetails from "./ProfileDetails.js";
import { useSelector, useDispatch } from "react-redux";
import ProfileDetailsWrapper from "./ProfileDetailsWrapper.js";

export default function ProfileSearchedUser() {
  const user = useSelector(
    (state) => state.suggestedUserReducers.suggestedUser
  );

  return (
    <div>
      <ProfileDetailsWrapper user={user.name} isProfileOfSignedInUser={false} />
    </div>
  );
}
