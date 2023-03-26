import { useEffect } from "react";
import { useDispatch } from "react-redux";
import toasts from "../../constants/toasts";
import useLogout from "./useLogout";
import { useHistory } from "react-router-dom";
import { auth } from "../../utils/firebaseLogin";
import { loginUser, logoutUser } from "../../store/appSlice";

export const useAuthListener = () => {
  const dispatch = useDispatch();
  const logout = useLogout();
  const history = useHistory();

  // useEffect(() => {
  //   try {
  //     auth.onAuthStateChanged(async (data) => {
  //       console.log("user changed: ", data?.multiFactor?.user);
  //       if (data?.multiFactor?.user) {
  //         dispatch(
  //           loginUser({
  //             displayName: data?.multiFactor?.user?.displayName,
  //             email: data?.multiFactor?.user?.email,
  //           })
  //         );
  //       } else {
  //         dispatch(logoutUser());
  //         history.replace("/login");
  //       }
  //     });
  //   } catch (error) {
  //     console.log("error: ", error);
  //     toasts.generateError(`${error}`);
  //     return logout();
  //   }
  // }, []);

  useEffect(() => {
    try {
      const user = auth.currentUser;
      console.log("Current User", user);
      // if (user) {
      //   dispatch(loginUser({ ...user }));
      // } else {
      //   dispatch(logoutUser());
      //   history?.replace("/login");
      // }
    } catch (error) {
      console.log("error: ", error);
      toasts.generateError(`${error}`);
      // return logout();
    }
  }, [history]);
};
