import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Grid, Alert } from '@mui/material';
import PasswordComponent from '../PasswordComponent';
import UserService from '../../services/user.service';
import UserInterface from '../../interfaces/UserInterface';
import { ValidateEmail } from '../../utils/functions/ValidateEmail';
import {
  formatPhone,
  validatePhone,
} from '../../utils/functions/FunctionsPhone';
import { ArrowBack, PersonAdd } from '@mui/icons-material';

interface RegisterProps {
  onBack: () => void;
}

const Register: React.FC<RegisterProps> = ({ onBack }) => {
  const [user, setUser] = useState<Partial<UserInterface>>({
    nameUser: '',
    firstlastnameUser: '',
    secondLastnameUser: '',
    emailUser: '',
    phoneUser: '',
    passwordUser: '',
    roleUser: 'Profesor',
    stateUser: true,
    damageCount: 0,
  });

  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'phoneUser') {
      setUser({ ...user, [name]: formatPhone(value) });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleRegister = async () => {
    if (!ValidateEmail(user.emailUser || '')) {
      setErrorMsg('Formato de email inválido');
      return;
    }
    if (!validatePhone(user.phoneUser || '')) {
      setErrorMsg('Formato de teléfono inválido');
      return;
    }

    try {
      await UserService.register(user as any);
      setSuccess(true);
      setErrorMsg('');
    } catch {
      setSuccess(false);
      setErrorMsg('Hubo un error al registrar al usuario');
    }
  };

  return (
    <Box>
      {success && (
        <Alert severity="success" sx={{ mb: 2, fontSize: '1.2rem' }}>
          ¡Usuario registrado exitosamente!
        </Alert>
      )}
      {errorMsg && (
        <Alert severity="error" sx={{ mb: 2, fontSize: '1.2rem' }}>
          {errorMsg}
        </Alert>
      )}
      <Typography variant="h5" sx={{ mb: 2, color: '#9AA6B2' }}>
        Registro de Usuario
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Nombre"
            name="nameUser"
            fullWidth
            value={user.nameUser}
            onChange={handleChange}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
                '& fieldset': {
                  borderColor: '#BCCCDC',
                },
                '&:hover fieldset': {
                  borderColor: '#9AA6B2',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#9AA6B2',
                },
              },
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Primer Apellido"
            name="firstlastnameUser"
            fullWidth
            value={user.firstlastnameUser}
            onChange={handleChange}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
                '& fieldset': {
                  borderColor: '#BCCCDC',
                },
                '&:hover fieldset': {
                  borderColor: '#9AA6B2',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#9AA6B2',
                },
              },
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Segundo Apellido (Opcional)"
            name="secondLastnameUser"
            fullWidth
            value={user.secondLastnameUser}
            onChange={handleChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
                '& fieldset': {
                  borderColor: '#BCCCDC',
                },
                '&:hover fieldset': {
                  borderColor: '#9AA6B2',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#9AA6B2',
                },
              },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="E-mail"
            name="emailUser"
            fullWidth
            value={user.emailUser}
            onChange={handleChange}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
                '& fieldset': {
                  borderColor: '#BCCCDC',
                },
                '&:hover fieldset': {
                  borderColor: '#9AA6B2',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#9AA6B2',
                },
              },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Teléfono"
            name="phoneUser"
            fullWidth
            value={user.phoneUser}
            onChange={handleChange}
            required
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
                '& fieldset': {
                  borderColor: '#BCCCDC',
                },
                '&:hover fieldset': {
                  borderColor: '#9AA6B2',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#9AA6B2',
                },
              },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <PasswordComponent
            value={user.passwordUser || ''}
            onValueChange={(value) => setUser({ ...user, passwordUser: value })}
            errorPassword=""
            nameComponent="Contraseña"
            width="100%"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              backgroundColor: '#9AA6B2',
              '&:hover': {
                backgroundColor: '#BCCCDC',
              },
              borderRadius: '10px',
            }}
            onClick={handleRegister}
            startIcon={<PersonAdd />}
          >
            Registrarse
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{
              borderColor: '#9AA6B2',
              color: '#9AA6B2',
              '&:hover': {
                borderColor: '#BCCCDC',
                color: '#BCCCDC',
              },
              borderRadius: '10px',
            }}
            onClick={onBack}
            startIcon={<ArrowBack />}
          >
            Volver al Login
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Register;
