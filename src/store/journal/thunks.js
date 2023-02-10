//acciones asíncronas
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FireBaseDB } from '../../firebase/config';
import { loadNotes } from '../../helpers/loadNotes';
import { uploadFile } from '../../helpers/uploadFile';
import {
  addMewEmptyNote,
  setActiveNote,
  savingNewNote,
  setNotes,
  setSaving,
  updatedNote,
  setPhotosToActiveNote,
  deleteNoteById,
} from './';

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());

    const { uid } = getState().auth;

    const newNote = {
      title: '',
      body: '',
      imageUrls: [],
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

    dispatch(updatedNote(note));
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());

    //await uploadFile(files[0]);

    const filesOnPromise = [];

    for (const file of files) {
      filesOnPromise.push(uploadFile(file));
    }
    const photosUrl = await Promise.all(filesOnPromise);

    dispatch(setPhotosToActiveNote(photosUrl));
  };
};

export const startgDeletingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const docRef = doc(FireBaseDB, `${uid}/journal/notes/${note.id}`);

    await deleteDoc(docRef);

    dispatch(deleteNoteById(note.id));
  };
};
