//acciones asíncronas
import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FireBaseDB } from '../../firebase/config';
import { loadNotes } from '../../helpers/loadNotes';
import {
  addMewEmptyNote,
  setActiveNote,
  savingNewNote,
  setNotes,
  setSaving,
} from './';

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());

    const { uid } = getState().auth;

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    };

    const newDoc = doc(collection(FireBaseDB, `${uid}/journal/notes`));

    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;

    dispatch(addMewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    if (!uid) throw new Error('Error al obtener el id de usuario');

    const notes = await loadNotes(uid);

    dispatch(setNotes(notes));
  };
};

export const startSavingNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const noteToFirestore = { ...note };
    delete noteToFirestore.id;

    const docRef = doc(FireBaseDB, `${uid}/journal/notes/${note.id}`);

    await setDoc(docRef, noteToFirestore, { merge: true });
  };
};
