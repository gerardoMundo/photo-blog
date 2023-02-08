import {
  aplicationLogOut,
  loginWithEmailPassword,
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

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const response = await loginWithEmailPassword({ email, password });

    //const { ok, uid, photoURL, displayName, errorMessage } = response;

    if (!response.ok) return dispatch(logOut(response));

    dispatch(login(response));
  };
};

export const startLogOut = () => {
  return async (dispatch) => {
    try {
      aplicationLogOut();

      dispatch(logOut());
    } catch (error) {
      dispatch(logOut(error.errorMessage));
    }
  };
};
