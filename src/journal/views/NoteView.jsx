import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DeleteOutline,
  SaveAltOutlined,
  UploadFileOutlined,
} from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useForm } from '../../hooks/useForm';
import { setActiveNote } from '../../store/journal/journalSlice';
import {
  startgDeletingNote,
  startSavingNote,
  startUploadingFiles,
} from '../../store/journal';
import { ImageGallery } from '../../ui/components/ImageGallery';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export const NoteView = () => {
  const inputFileRef = useRef();

  const dispatch = useDispatch();
  const {
    active: note,
    messageSaved,
    isSaving,
  } = useSelector((state) => state.journal);

  const { title, body, date, onInputChange, formState } = useForm(note);

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire('¡Éxito!', messageSaved, 'success');
    }
  }, [messageSaved]);

  const onSaveNote = () => {
    dispatch(startSavingNote());
  };

  const onDeleteNote = () => {
    dispatch(startgDeletingNote());
  };

  const onInputFileChange = ({ target }) => {
    if (target.files === 0) return;

    dispatch(startUploadingFiles(target.files));
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

      <input
        ref={inputFileRef}
        type='file'
        multiple
        onChange={onInputFileChange}
        style={{ display: 'none' }}
      />

      <Grid item>
        <Button
          disabled={isSaving}
          onClick={() => inputFileRef.current.click()}
        >
          <UploadFileOutlined />
          Subir fotos
        </Button>
      </Grid>

      <Grid item>
        <Button disabled={isSaving} onClick={onSaveNote} sx={{ padding: 1 }}>
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
      <Grid container justifyContent='flex-start' alignItems='center'>
        <Button onClick={onDeleteNote} sx={{ mt: 2 }} color='error'>
          <DeleteOutline />
          Eliminar nota
        </Button>
      </Grid>

      <ImageGallery images={note.imageUrls} />
    </Grid>
  );
};
