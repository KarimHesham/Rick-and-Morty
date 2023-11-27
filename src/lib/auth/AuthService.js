import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../../config/firebase";

const googleProvider = new GoogleAuthProvider();

class AuthenticationService {
  User = {
    id: null,
    email: null,
    full_name: null,
    username: null,
    photo_url: null,
    role: "regular",
    last_login: null,
    points: null,
    country: null,
    field_of_interest: null,
    emailVerified: null,
    created_at: null,
    updated_at: null,
    deleted_at: null,
  };

  // Helper method
  setUser = (user) => {
    this.User.id = user.uid || this.User.id;
    this.User.email = user.email || this.User.email;
    this.User.full_name = user.displayName || this.User.displayName;
    this.User.username = user.email.split("@")[0];
    this.User.photo_url = user.photoURL || this.User.photo_url;
    this.User.created_at = user.created_at || new Date().getTime();
    this.User.updated_at = user.updated_at || new Date().getTime();
    this.User.deleted_at = user.deleted_at || null;
  };

  // Firebase SDK auth apis
  googleSignIn = async () => {
    const res = await signInWithPopup(auth, googleProvider);

    this.setUser(res.user);
    return res;
  };

  signIn = async (payload) => {
    const res = await signInWithEmailAndPassword(
      auth,
      payload.email,
      payload.password
    );

    this.setUser(res.user);
    return res;
  };

  register = async (payload) => {
    const res = await createUserWithEmailAndPassword(
      auth,
      payload.email,
      payload.password
    );

    this.setUser(res.user);

    await this.sendVerificationLink(auth.currentUser);

    return res;
  };

  sendVerificationLink = async (user) => {
    const res = await sendEmailVerification(user);

    return res;
  };

  resetPassword = async (payload) => {
    const res = await sendPasswordResetEmail(auth, payload);

    return res;
  };

  signOut = async () => {
    const res = await signOut(auth);

    return res;
  };
}

const AuthService = new AuthenticationService();

export default AuthService;
