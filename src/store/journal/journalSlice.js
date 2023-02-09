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
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
    },
    updatedNote: (state, action) => {
      state.isSaving = false;
      state.notes = state.notes.map((note) => {
        return note.id === action.payload;
      });
    },
    deleteNoteById: (state, action) => {},
  },
});

export const {
  addMewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setSaving,
  updatedNote,
} = journalSlice.actions;
