import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../redux/reducers/userSlice";
import AuthService from "../../../lib/auth/AuthService";

const useLogout = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logoutAction = async () => {
    try {
      dispatch(setUser(null));

      await AuthService.signOut();

      navigate("/");
    } catch (err) {}
  };

  return logoutAction;
};

export default useLogout;
