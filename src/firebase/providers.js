import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { FireBaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FireBaseAuth, googleProvider);
    const { displayName, email, photoURL, uid } = result.user;

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    console.log(error);

    const errorCode = error.code;
    const errorMessage = error.message;

    return {
      ok: false,
      errorCode,
      errorMessage,
    };
  }
};

export const registerUserWithEmailAndPassword = async ({
  displayName,
  email,
  password,
}) => {
  try {
    const response = await createUserWithEmailAndPassword(
      FireBaseAuth,
      email,
      password
    );

    const { uid, photoURL } = response.user;

    await updateProfile(FireBaseAuth.currentUser, { displayName });

    return {
      ok: true,
      uid,
      photoURL,
      displayName,
      email,
    };
  } catch (error) {
    console.log(error);

    return { ok: false, errorMessage: error.message };
  }
};

export const loginWithEmailPassword = async ({ email, password }) => {
  try {
    const response = await signInWithEmailAndPassword(
      FireBaseAuth,
      email,
      password
    );

    const { uid, photoURL, displayName } = response.user;

    return {
      ok: true,
      uid,
      photoURL,
      displayName,
      email,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      errorMessage: error.message,
    };
  }
};

export const aplicationLogOut = async () => {
  await signOut(FireBaseAuth);
};
