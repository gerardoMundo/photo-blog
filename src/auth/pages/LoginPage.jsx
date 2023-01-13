import { Google } from '@mui/icons-material';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { AuthLayout } from '../layout/AuthLayout';

export const LoginPage = () => {
  return (
    <AuthLayout title='Iniciar sesión'>
      <form>
        <Grid container>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <TextField
              label='Correo'
              type='email'
              placeholder='correo@correo.com'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <TextField
              label='Contraseña'
              type='password'
              placeholder='Escribe tu contraseña'
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Button fullWidth variant='contained'>
              <Typography>Login</Typography>
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button fullWidth variant='contained'>
              <Google />
              <Typography sx={{ ml: 1 }}>Google</Typography>
            </Button>
          </Grid>
          <Grid
            container
            direction='row'
            justifyContent='flex-end'
            sx={{ mt: 2 }}
          >
            <Link component={RouterLink} to='/auth/register' color='inherit'>
              Registrarse en la plataforma
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
