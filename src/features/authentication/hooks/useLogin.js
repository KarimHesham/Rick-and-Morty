import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import login from "../services/loginService";
import AuthService from "../../../lib/auth/AuthService";
import {
  createUser,
  getUser,
  updateUser,
} from "../../../common/services/user/userService";
import { setUser } from "../../../redux/reducers/userSlice";

import User from "../../../models/User";

const useLogin = ({ setLoadingState, setErrorState }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const loginAction = async (provider, payload) => {
    setLoadingState({
      isOpen: true,
      fullScreen: false,
      message: "",
      canvas: false,
    });

    try {
      const user = await login(provider, payload);

      if (user) {
        const userDocSnapshot = await getUser(user.uid);

        if (userDocSnapshot.exists()) {
          const existingUser = new User(userDocSnapshot.data());

          dispatch(setUser(existingUser));

          await updateUser(user.uid, { ...existingUser });
        } else {
          const newUser = new User(AuthService.User);

          await createUser(newUser);

          dispatch(setUser(newUser));
        }

        navigate("/workspace");
      }
    } catch (err) {
      switch (err.code) {
        case "auth/user-not-found":
          setErrorState({
            isOpen: true,
            message: "User Not Found",
          });
          break;
        case "auth/wrong-password":
          setErrorState({
            isOpen: true,
            message: "Incorrect Password",
          });
          break;
        case "auth/email-already-in-use":
          setErrorState({ isOpen: true, message: "Email already in use" });
          break;
        case "auth/popup-closed-by-user":
          setErrorState({ isOpen: true, message: "Auth pop up closed" });
          break;
        default:
          setErrorState({ isOpen: true, message: err.message });
          break;
      }
    }

    setLoadingState({
      isOpen: false,
      message: "",
      fullScreen: false,
      canvas: false,
    });
  };

  return loginAction;
};

export default useLogin;
