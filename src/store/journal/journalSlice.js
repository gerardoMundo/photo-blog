import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null /*{ id: '', title: '', body: '', date: 123, imageUrls: [] }*/,
  },
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true;
    },

    addMewEmptyNote: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote: (state, action) => {
      state.active = action.payload;
      state.messageSaved = '';
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = '';
    },
    updatedNote: (state, action) => {
      state.isSaving = false;
      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return action.payload;
        }
        return note;
      });
      state.messageSaved = 'La entrada se ha actualizado exitosamente.';
    },
    setPhotosToActiveNote: (state, action) => {
      state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
      state.isSaving = false;
    },
    clearStateAtLogout: (state) => {
      (state.isSaving = false),
        (state.messageSaved = ''),
        (state.notes = []),
        (state.active = null);
    },
    deleteNoteById: (state, action) => {
      (state.active = null),
        (state.isSaving = false),
        (state.notes = state.notes.filter(
          (note) => note.id !== action.payload
        ));
    },
  },
});

export const {
  addMewEmptyNote,
  clearStateAtLogout,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setPhotosToActiveNote,
  setNotes,
  setSaving,
  updatedNote,
} = journalSlice.actions;
