import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { setUser } from "./store/appSlice";
import Dashboard from "./UI/Views/Dashboard";
import Login from "./UI/Views/Login";
import { auth } from "./utils/firebaseLogin";

const App = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.app.user);
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
      // errorElement: <ErrorPage />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      // errorElement: <ErrorPage />,
    },
  ]);

  console.log(user ?? "No user in App");

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      const { displayName, email } = user;
      console.log("user changed: ", email);
      dispatch(
        setUser({
          displayName,
          email,
        })
      );
      <Navigate to="/dashboard" replace={true} />;
    });
  }, []);

  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
