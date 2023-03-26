import { useDispatch } from "react-redux";
import toasts from "../../constants/toasts";
import { logoutUser } from "../../store/appSlice";
import { auth } from "../../utils/firebaseLogin";

const useLogout = () => {
  const dispatch = useDispatch();

  const _logoutUser = async (callback) => {
    try {
      await auth.signOut();
      toasts.generateSuccess("Signed out");
      dispatch(logoutUser());

      callback?.();
    } catch (error) {
      toasts.generateSuccess("Sign out: " + error);
    }
  };

  return _logoutUser;
};

export default useLogout;
