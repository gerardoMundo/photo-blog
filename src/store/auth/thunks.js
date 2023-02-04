import { signInWithGoogle } from '../../firebase';
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
