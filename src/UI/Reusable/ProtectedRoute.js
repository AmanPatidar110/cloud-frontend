import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebaseLogin";
import useLoader from "../../helpers/hooks/useLoader";

const ProtectedRoute = ({ component: Component, path, ...props }) => {
  const [user, loading, error] = useAuthState(auth);
  const loader = useLoader();
  const [redirectUrl, setRedirectUrl] = useState("");

  useEffect(() => {
    if (loading) return;
    setRedirectUrl(window.location.pathname);
  }, [loading]);

  if (loading) {
    loader("Loading...");
    return <></>;
  } else {
    loader();
  }

  return (
    <Route
      {...props}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect to={`/login?redirect=${redirectUrl}`} />
        )
      }
    />
  );
};

export default ProtectedRoute;
