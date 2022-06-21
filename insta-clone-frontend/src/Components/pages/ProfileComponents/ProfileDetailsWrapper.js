import React from "react";
import ProfileDetails from "./ProfileDetails";
import ProfileDetailsContext from "../../../Contexts/ProfileDetailsContext";
import ErrorBoundary from "../../shared/Error";

export default function ProfileDetailsWrapper({
  user,
  isProfileOfSignedInUser,
}) {
  return (
    <>
      <ErrorBoundary>
        <ProfileDetailsContext
          user={user}
          isProfileOfSignedInUser={isProfileOfSignedInUser}
        >
          <ProfileDetails />
        </ProfileDetailsContext>
      </ErrorBoundary>
    </>
  );
}
