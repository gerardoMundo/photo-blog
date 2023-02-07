/* eslint-disable no-extra-boolean-cast */
import { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from '../../hooks';
import { AuthLayout } from '../layout/AuthLayout';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store/auth';

const formData = {
  displayName: '',
  email: '',
  password: '',
};

const formValidations = {
  displayName: [(value) => value.length >= 3, 'El nombre es obligatorio'],
  email: [(value) => value.includes('@'), 'El valor debe ser un correo'],
  password: [(value) => value.length >= 6, 'Debe contener 6 o mas caracteres'],
};

export const RegisterPage = () => {
  const [formSubmited, setFormSubmited] = useState(false);

  const { status, errorMessage } = useSelector((state) => state.auth);

  const isChecking = useMemo(() => status === 'Checking', [status]);

  const dispatch = useDispatch();

  const {
    formState,
    email,
    password,
    displayName,
    onInputChange,

    isFormValid,
    nameValid,
    emailValid,
    passwordValid,
  } = useForm(formData, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();

    if (!isFormValid) return;

    setFormSubmited(true);

    dispatch(startCreatingUserWithEmailPassword(formState));
  };

  return (
    <AuthLayout title='Crear cuenta'>
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <TextField
              label='Nombre'
              type='text'
              placeholder='John Doe'
              name='displayName'
              value={displayName}
              onChange={onInputChange}
              fullWidth
              error={!!nameValid && formSubmited}
              helperText={nameValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <TextField
              label='Correo'
              type='email'
              placeholder='correo@correo.com'
              name='email'
              value={email}
              onChange={onInputChange}
              fullWidth
              error={!!emailValid && formSubmited}
              helperText={emailValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <TextField
              label='Contraseña'
              type='password'
              placeholder='Escribe tu contraseña'
              name='password'
              value={password}
              onChange={onInputChange}
              fullWidth
              error={!!passwordValid && formSubmited}
              helperText={passwordValid}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
          <Grid display={!!errorMessage ? '' : 'none'} item xs={12}>
            <Alert severity='error'>{errorMessage}</Alert>
          </Grid>
          <Grid item xs={12}>
            <Button
              disabled={isChecking}
              fullWidth
              variant='contained'
              type='submit'
            >
              <Typography>Registrarse</Typography>
            </Button>
          </Grid>

          <Grid
            container
            direction='row'
            justifyContent='flex-end'
            sx={{ mt: 2 }}
          >
            <Link component={RouterLink} to='/auth/login' color='inherit'>
              Iniciar sesión
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
