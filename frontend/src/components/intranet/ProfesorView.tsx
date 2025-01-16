import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
} from '@mui/material';
import { Add, AssignmentReturn, Edit } from '@mui/icons-material';
import loanService from '../../services/loan.service';
import NavBar from '../Navbar';
import { SelectChangeEvent } from '@mui/material/Select';
import './ProfesorView.css';

interface Projector {
  idProyector: number;
  brandProyector: string;
  modelProyector: string;
  stateProyector: string;
  availableProyector: boolean;
}

interface Loan {
  idLoan: string;
  idProyector: number;
  usage: string;
  dateLoan: string;
  hourLoan: string;
  disabled: boolean;
}

const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const formatTime = (date: Date): string => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

const ProfesorView: React.FC = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [projectorsAll, setProjectorsAll] = useState<Projector[]>([]);
  const [projectrsAvailable, setProjectorsAvailable] = useState<Projector[]>(
    [],
  );
  const [open, setOpen] = useState(false);
  const [newLoan, setNewLoan] = useState({
    date: '',
    time: '',
    projectorId: 0,
    use: '',
  });
  const [returnDialogOpen, setReturnDialogOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [returnState, setReturnState] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      console.log('Usuario almacenado:', user); // Verificar en la consola
      const userId = user.id || user.idUser; // Ajusta según corresponda
      if (userId) {
        fetchLoans(userId);
        fetchProjectorsAll();
        fetchProjectors();
      } else {
        setError('ID de usuario no encontrado.');
      }
    } else {
      setError('Usuario no autenticado.');
    }
  }, []);

  const fetchLoans = async (userId: string) => {
    try {
      const data = await loanService.getLoansByUserId(userId);
      // se filtran los préstamos deshabilitados
      setLoans(data.filter((loan: Loan) => !loan.disabled));
    } catch (err) {
      console.error('Error al cargar préstamos:', err);
      setError('No se pudieron cargar los préstamos.');
    }
  };

  const fetchProjectorsAll = async () => {
    try {
      const data = await loanService.getProjectors(); // Asegúrate de que este endpoint obtiene todos los proyectores
      console.log('Proyectores obtenidos:', data); // Verificar datos
      setProjectorsAll(data);
    } catch (err) {
      console.error('Error al cargar proyectores:', err);
      setError('No se pudieron cargar los proyectores.');
    }
  };

  const fetchProjectors = async () => {
    try {
      const data = await loanService.getAvailableProjectors();
      setProjectorsAvailable(data);
    } catch (err) {
      setError('No se pudieron cargar los proyectores disponibles.');
    }
  };

  const handleSelectChange = (e: SelectChangeEvent<number>) => {
    const { name, value } = e.target;
    setNewLoan({ ...newLoan, [name]: Number(value) });
  };

  const handleNewLoanChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>,
  ) => {
    const { name, value } = e.target;
    setNewLoan({ ...newLoan, [name as string]: value });
  };

  const handleNewLoanSubmit = async () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        setError('Usuario no autenticado.');
        setOpen(false);
        return;
      }
      const user = JSON.parse(storedUser);
      const userId = user.id || user.idUser;
      await loanService.createLoan(
        formatDate(new Date(newLoan.date)),
        newLoan.time,
        userId,
        newLoan.projectorId,
        newLoan.use,
        false,
      );

      if (userId) {
        fetchLoans(userId);
        fetchProjectors();
      }
      setOpen(false);
      // limpia los campos del nuevo préstamo
      setNewLoan({
        date: '',
        time: '',
        projectorId: 0,
        use: '',
      });
      setSuccessMsg('Préstamo creado exitosamente.');
      setError(null);
    } catch (err) {
      setError(`Error al crear el préstamo: ${(err as any).response.data}`);
      setSuccessMsg(null);
      setOpen(false);
    }
  };

  const handleReturnLoan = async () => {
    if (!selectedLoan) return;
    const currentDate = new Date();
    const dateRepayment = formatDate(currentDate);
    const hourRepayment = formatTime(currentDate);
    try {
      await loanService.returnLoan(
        selectedLoan.idLoan,
        returnState,
        dateRepayment,
        hourRepayment,
      );
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        const userId = user.id || user.idUser;
        if (userId) {
          fetchLoans(userId);
          fetchProjectors();
        }
      }
      setReturnDialogOpen(false);
      setSuccessMsg('Préstamo devuelto exitosamente.');
      setError(null);
    } catch (err) {
      setError('Error al devolver el préstamo.');
      setSuccessMsg(null);
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
          flexDirection: 'column',
          padding: 4,
          minHeight: '80vh',
          backgroundColor: '#F8FAFC',
        }}
      >
        <Typography variant="h4" sx={{ mb: 4, color: '#9AA6B2' }}>
          Préstamos Activos
        </Typography>
        <Button
          variant="contained"
          className="button-new-loan"
          sx={{
            mt: 4,
            backgroundColor: '#D9EAFD',
            color: 'black',
            borderRadius: '20px',
            marginBottom: '20px',
          }}
          onClick={() => setOpen(true)}
          startIcon={<Add />}
        >
          Nuevo Préstamo
        </Button>
        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 2,
              width: '100%',
              maxWidth: 600,
              backgroundColor: '#BCCCDC',
              color: '#9AA6B2',
            }}
          >
            {error}
          </Alert>
        )}
        {successMsg && (
          <Alert
            severity="success"
            sx={{ mb: 2, width: '100%', maxWidth: 600 }}
          >
            {successMsg}
          </Alert>
        )}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: 'center',
            width: '100%',
            maxWidth: 1200,
          }}
        >
          {loans.length > 0 ? (
            loans.map((loan) => {
              // Buscar el proyector correspondiente
              const projector = projectorsAll.find(
                (proj) => proj.idProyector == loan.idProyector,
              );

              return (
                <Card
                  key={loan.idLoan}
                  sx={{
                    minWidth: 275,
                    maxWidth: 400,
                    backgroundColor: '#F8FAFC',
                    border: `1px solid #9AA6B2`,
                    borderRadius: '16px',
                    padding: 2,
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {projector
                        ? `${projector.brandProyector} ${projector.modelProyector}`
                        : 'Proyector No Disponible'}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      Uso: {loan.usage}
                    </Typography>
                    <Typography variant="body2">
                      Fecha: {loan.dateLoan}
                      <br />
                      Hora: {loan.hourLoan}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" startIcon={<Edit />} disabled>
                      Editar
                    </Button>
                    <Button
                      size="small"
                      onClick={() => {
                        setSelectedLoan(loan);
                        setReturnDialogOpen(true);
                      }}
                      startIcon={<AssignmentReturn />}
                    >
                      Devolver
                    </Button>
                  </CardActions>
                </Card>
              );
            })
          ) : (
            <Typography>No tienes préstamos activos.</Typography>
          )}
        </Box>
        {/* Nuevo Préstamo Dialog */}
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          sx={{
            '& .MuiDialog-paper': {
              borderRadius: '24px',
              backgroundColor: '#F8FAFC',
              padding: 4,
            },
          }}
        >
          <DialogTitle>Nuevo Préstamo</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Complete los siguientes campos para registrar un nuevo préstamo.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Fecha"
              type="date"
              onChange={(e) =>
                handleNewLoanChange(
                  e as React.ChangeEvent<
                    HTMLInputElement | { name?: string; value: unknown }
                  >,
                )
              }
              name="date"
              fullWidth
              value={newLoan.date}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              margin="dense"
              label="Hora"
              type="time"
              fullWidth
              name="time"
              value={newLoan.time}
              onChange={handleNewLoanChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Proyector</InputLabel>
              <Select
                name="projectorId"
                value={newLoan.projectorId}
                onChange={handleSelectChange}
                label="Proyector"
              >
                {projectrsAvailable.map((projector: Projector) => (
                  <MenuItem
                    key={projector.idProyector}
                    value={projector.idProyector}
                  >
                    {projector.brandProyector} {projector.modelProyector}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="dense">
              <InputLabel id="uso-label">Uso</InputLabel>
              <Select
                labelId="uso-label"
                id="uso-select"
                name="use"
                value={newLoan.use}
                onChange={(e) =>
                  handleNewLoanChange(
                    e as React.ChangeEvent<
                      HTMLInputElement | { name?: string; value: unknown }
                    >,
                  )
                }
                label="Uso"
              >
                <MenuItem value="Dictado de clases">Dictado de clases</MenuItem>
                <MenuItem value="Reuniones varias">Reuniones varias</MenuItem>
                <MenuItem value="Examen de título">Examen de título</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={handleNewLoanSubmit}>Guardar</Button>
          </DialogActions>
        </Dialog>
        {/* Devolver Préstamo Dialog */}
        <Dialog
          open={returnDialogOpen}
          onClose={() => setReturnDialogOpen(false)}
        >
          <DialogTitle>Devolver Préstamo</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Seleccione el estado del proyector al devolverlo.
            </DialogContentText>
            <FormControl fullWidth margin="dense">
              <InputLabel id="estado-label">Estado</InputLabel>
              <Select
                labelId="estado-label"
                id="estado-select"
                name="state"
                label="Estado"
                value={returnState}
                onChange={(e) => setReturnState(e.target.value as string)}
              >
                <MenuItem value="Buenas Condiciones">
                  Buenas Condiciones
                </MenuItem>
                <MenuItem value="Con Daños">Con Daños</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setReturnDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleReturnLoan}>Devolver</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default ProfesorView;
