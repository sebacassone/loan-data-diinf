import logo from '../assets/images/logo.png';
import { Box, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const NavBar = () => {
  const location = useLocation();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mt: 0,
        padding: 2,
      }}
    >
      <img src={logo} alt="Logo" width={160} />
      {location.pathname.includes('/intranet') && (
        <Button
          variant="contained"
          sx={{
            backgroundColor: 'red',
            color: 'white',
            borderRadius: '20px',
            padding: '8px 16px',
            display: 'flex',
            alignItems: 'center',
          }}
          onClick={() => {
            window.location.href = '/';
            localStorage.removeItem('user');
          }}
          startIcon={<ExitToAppIcon />}
        >
          Cerrar sesión
        </Button>
      )}
    </Box>
  );
};

export default NavBar;
