import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Google } from '@mui/icons-material';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { useForm } from '../../hooks';
import { checkinAuthentication, googleAuthentication } from '../../store/auth';
import { AuthLayout } from '../layout/AuthLayout';
import { useMemo } from 'react';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);

  const { email, password, onInputChange } = useForm({
    email: '',
    password: '',
  });

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onSubmit = (event) => {
    event.preventDefault();

    dispatch(checkinAuthentication());
  };

  const onSignGoogle = () => {
    console.log('onSignGoogle');

    dispatch(googleAuthentication());
  };

  return (
    <AuthLayout title='Iniciar sesión'>
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <TextField
              label='Correo'
              type='email'
              name='email'
              value={email}
              onChange={onInputChange}
              placeholder='correo@correo.com'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <TextField
              label='Contraseña'
              type='password'
              name='password'
              value={password}
              onChange={onInputChange}
              placeholder='Escribe tu contraseña'
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Button
              disabled={isAuthenticating}
              type='submit'
              fullWidth
              variant='contained'
            >
              <Typography>Iniciar sesión</Typography>
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              disabled={isAuthenticating}
              onClick={onSignGoogle}
              fullWidth
              variant='contained'
            >
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
