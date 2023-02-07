import {
  registerUserWithEmailAndPassword,
  signInWithGoogle,
} from '../../firebase';
import { checkingCredentials, login, logOut } from './authSlice';

export const checkinAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const googleAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await signInWithGoogle();

    if (!result.ok) return dispatch(logOut(result.errorMessage));

    dispatch(login(result));
  };
};

export const startCreatingUserWithEmailPassword = ({
  displayName,
  email,
  password,
}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const { ok, uid, photoURL, errorMessage } =
      await registerUserWithEmailAndPassword({
        email,
        password,
      });

    if (!ok) return dispatch(logOut({ errorMessage }));

    dispatch(login({ email, uid, displayName, photoURL }));
  };
};
