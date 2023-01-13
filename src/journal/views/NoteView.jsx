import { SaveAltOutlined } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';

export const NoteView = () => {
  return (
    <Grid
      container
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight='light'>
          28 de Agosto de 2022.
        </Typography>
      </Grid>

      <Grid item>
        <Button sx={{ padding: 1 }}>
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
          label='Título'
          sx={{ border: 'none', mb: 1 }}
        />
        <TextField
          type='text'
          variant='filled'
          fullWidth
          placeholder='¿Qué sucedió hoy?'
          minRows={5}
          multiline
          sx={{ border: 'none', mb: 1 }}
        />
      </Grid>
    </Grid>
  );
};
