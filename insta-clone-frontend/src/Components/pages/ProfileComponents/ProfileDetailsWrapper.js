import React from "react";
import ProfileDetails from "./ProfileDetails";
import ProfileDetailsContext from "../../../Contexts/ProfileDetailsContext";
export default function ProfileDetailsWrapper({user, isProfileOfSignedInUser}) {
  return (
    <>
      <ProfileDetailsContext user = {user} isProfileOfSignedInUser = {isProfileOfSignedInUser} >
        <ProfileDetails  />
      </ProfileDetailsContext>
    </>
  );
}
