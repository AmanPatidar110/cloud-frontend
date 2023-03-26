import { useDispatch } from "react-redux";
import { setShowLoader } from "../../store/appSlice";

const useLoader = () => {
  const dispatch = useDispatch();

  const _showLoader = (text) => dispatch(setShowLoader(text));

  return _showLoader;
};

export default useLoader;
