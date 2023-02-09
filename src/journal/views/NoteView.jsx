import { useDispatch, useSelector } from 'react-redux';
import { SaveAltOutlined } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useForm } from '../../hooks/useForm';
import { useEffect, useMemo } from 'react';
import { setActiveNote } from '../../store/journal/journalSlice';
import { startSavingNote } from '../../store/journal';

export const NoteView = () => {
  const dispatch = useDispatch();
  const { active: note } = useSelector((state) => state.journal);

  const { title, body, date, onInputChange, formState } = useForm(note);

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  const onSaveNote = () => {
    dispatch(startSavingNote());
  };

  return (
    <Grid
      className='animate__animated animate__fadeIn'
      container
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight='light'>
          {dateString}
        </Typography>
      </Grid>

      <Grid item>
        <Button onClick={onSaveNote} sx={{ padding: 1 }}>
          <SaveAltOutlined sx={{ mr: 1, fontSize: 30 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type='text'
          variant='filled'
          fullWidth
          placeholder='Ingrese un título'
          name='title'
          value={title}
          onChange={onInputChange}
          label='Título'
          sx={{ border: 'none', mb: 1 }}
        />
        <TextField
          type='text'
          variant='filled'
          fullWidth
          placeholder='¿Qué sucedió hoy?'
          name='body'
          value={body}
          onChange={onInputChange}
          minRows={5}
          multiline
          sx={{ border: 'none', mb: 1 }}
        />
      </Grid>
    </Grid>
  );
};
