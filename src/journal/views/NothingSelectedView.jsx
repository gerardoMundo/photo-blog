import { StarOutline } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';

export const NothingSelectedView = () => {
  return (
    <Grid
      className='animate__animated animate__fadeIn'
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='center'
      sx={{
        minHeight: '85vh',
        backgroundColor: 'primary.main',
        padding: 4,
        borderRadius: 2,
      }}
    >
      <Grid item sx={12}>
        <StarOutline sx={{ fontSize: 100, color: 'white' }} />
      </Grid>
      <Typography variant='h5' color='whitesmoke'>
        Selecciona o crea una entrada
      </Typography>
    </Grid>
  );
};
