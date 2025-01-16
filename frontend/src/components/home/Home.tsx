import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import PasswordComponent from '../PasswordComponent';
import NavBar from '../Navbar';
import UserService from '../../services/user.service';
import Register from '../register/Register';
import { CSSTransition } from 'react-transition-group';
import '../auth/auth.css';
import { Login, PersonAdd } from '@mui/icons-material';

const Home: React.FC = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const user = await UserService.login(credentials);
      if (user) {
        // cambia de intranet con h ref y guarda en el localstorage al usuario
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = '/intranet';
      }
    } catch {
      setErrorMsg('Usuario o contraseña incorrectos');
    }
  };

  return (
    <>
      <NavBar />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
          backgroundColor: '#D9EAFD',
        }}
      >
        <CSSTransition
          in={!showRegister}
          timeout={300}
          classNames="slide"
          unmountOnExit
        >
          <Box
            sx={{
              width: 400,
              padding: 4,
              backgroundColor: '#F8FAFC',
              borderRadius: 2,
              boxShadow: 3,
              border: '1px solid #BCCCDC',
            }}
          >
            {errorMsg && (
              <Alert severity="error" sx={{ mb: 2, fontSize: '1.2rem' }}>
                {errorMsg}
              </Alert>
            )}
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Typography variant="h5" sx={{ mt: 1, color: '#9AA6B2' }}>
                Bienvenido a PrestaData del DIINF
              </Typography>
            </Box>
            <TextField
              label="E-mail"
              name="email"
              fullWidth
              margin="normal"
              value={credentials.email}
              onChange={handleChange}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
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
            <PasswordComponent
              value={credentials.password}
              onValueChange={(value) =>
                setCredentials({ ...credentials, password: value })
              }
              errorPassword=""
              width="100%"
              nameComponent="Contraseña"
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 2,
                backgroundColor: '#9AA6B2',
                '&:hover': {
                  backgroundColor: '#BCCCDC',
                },
                borderRadius: '10px',
              }}
              onClick={handleLogin}
              startIcon={<Login />}
            >
              Ingresar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              sx={{
                mt: 1,
                borderColor: '#9AA6B2',
                color: '#9AA6B2',
                '&:hover': {
                  borderColor: '#BCCCDC',
                  color: '#BCCCDC',
                },
                borderRadius: '10px',
              }}
              onClick={() => setShowRegister(true)}
              startIcon={<PersonAdd />}
            >
              Registrarse
            </Button>
          </Box>
        </CSSTransition>
        <CSSTransition
          in={showRegister}
          timeout={300}
          classNames="slide"
          unmountOnExit
        >
          <Box
            sx={{
              width: 400,
              padding: 4,
              backgroundColor: '#F8FAFC',
              borderRadius: 2,
              boxShadow: 3,
              border: '1px solid #BCCCDC',
            }}
          >
            <Register onBack={() => setShowRegister(false)} />
          </Box>
        </CSSTransition>
      </Box>
    </>
  );
};

export default Home;
