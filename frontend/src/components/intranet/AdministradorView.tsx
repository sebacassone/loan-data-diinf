import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
  Modal,
  TextField,
} from '@mui/material';
import NavBar from '../Navbar';
import reportService from '../../services/report.service';
import loanService from '../../services/loan.service';

interface LoanReportModel {
  fechaPrestamo: string;
  horaPrestamo: string;
  profesor: number;
  fechaDevolucion: string;
  horaDevolucion: string;
  estadoDevolucion: boolean;
  usoProyector: string;
  numeroHoras: number;
}

interface Projector {
  idProyector: number;
  brandProyector: string;
  modelProyector: string;
  stateProyector: string;
  availableProyector: boolean;
}

const AdministradorView: React.FC = () => {
  const [reports, setReports] = useState<LoanReportModel[]>([]);
  const [projectors, setProjectors] = useState<Projector[]>([]);
  const [selectedProjector, setSelectedProjector] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [brandProyector, setBrandProyector] = useState('');
  const [modelProyector, setModelProyector] = useState('');

  useEffect(() => {
    fetchProjectors();
  }, []);

  useEffect(() => {
    if (!loading) {
      fetchReports();
    }
  }, [selectedProjector, loading]);

  const fetchProjectors = async () => {
    setLoading(true);
    try {
      const response = await loanService.getProjectors();
      console.log('Projectors response:', response);

      // Verifica que response.data es un arreglo y contiene los campos correctos
      if (response) {
        // Asegúrate de que cada proyector tiene el campo 'idProyector'
        const validProjectors = response.filter(
          (p: Projector) => p.idProyector !== undefined,
        );
        if (validProjectors.length !== response.length) {
          console.warn('Algunos proyectores no tienen el campo idProyector');
        }
        setProjectors(validProjectors);
        setError(null);
      } else {
        console.error(
          'Respuesta inesperada al obtener proyectores:',
          response.data,
        );
        setError('Datos de proyectores inválidos');
        setProjectors([]);
      }
    } catch (error) {
      console.error('Error al obtener proyectores:', error);
      setError('Error al obtener proyectores');
      setProjectors([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchReports = async () => {
    try {
      let data: LoanReportModel[] = [];
      if (selectedProjector === 'all') {
        data = await reportService.getAllReports();
      } else {
        const projectorId = Number(selectedProjector);
        if (!isNaN(projectorId)) {
          data = await reportService.getReportByProjector(projectorId);
        } else {
          console.error('Projector ID inválido:', selectedProjector);
          setError('ID de proyector inválido');
          data = [];
        }
      }
      setReports(data);
    } catch (error) {
      console.error('Error al obtener el reporte:', error);
      setError('Error al obtener el reporte');
      setReports([]);
    }
  };

  const handleProjectorChange = (event: SelectChangeEvent<string>) => {
    setSelectedProjector(event.target.value as string);
  };

  const handleClose = () => setOpen(false);

  const handleSave = async () => {
    try {
      const response = await loanService.createProjector(
        brandProyector,
        modelProyector,
        'Nuevo',
        true,
      );
      // Actualizar la lista de proyectores después de agregar
      setProjectors([...projectors, response.data]);
      setOpen(false);
      setBrandProyector('');
      setModelProyector('');
      fetchProjectors();
    } catch (error) {
      console.error('Error al guardar el proyector:', error);
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
          Administración de Préstamos
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            marginBottom: 2,
          }}
        >
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="proyector-label">Proyector</InputLabel>
            <Select
              labelId="proyector-label"
              value={selectedProjector}
              onChange={handleProjectorChange}
              sx={{ color: 'primary.main' }}
            >
              <MenuItem value="" disabled>
                Seleccionar proyector
              </MenuItem>
              <MenuItem value="all" sx={{ color: '#9AA6B2' }}>
                Todos
              </MenuItem>
              {projectors &&
                projectors.map((projector) =>
                  projector ? (
                    <MenuItem
                      key={projector.idProyector}
                      value={projector.idProyector.toString()}
                      sx={{ color: '#9AA6B2' }}
                    >
                      {projector.brandProyector} {projector.modelProyector}
                    </MenuItem>
                  ) : null,
                )}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            sx={{ borderRadius: '50px', backgroundColor: 'secondary.main' }}
          >
            Añadir nuevo proyector
          </Button>
        </Box>
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: 'absolute' as 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
              borderRadius: '10px',
            }}
          >
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
              Añadir Nuevo Proyector
            </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="brand-select-label">Marca</InputLabel>
              <Select
                labelId="brand-select-label"
                value={brandProyector}
                label="Marca"
                onChange={(e) => setBrandProyector(e.target.value as string)}
              >
                <MenuItem value="EPSON">EPSON</MenuItem>
                <MenuItem value="ViewSonic">ViewSonic</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Modelo"
              value={modelProyector}
              onChange={(e) => setModelProyector(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button variant="contained" color="primary" onClick={handleSave}>
              Guardar
            </Button>
          </Box>
        </Modal>
        {error && <Typography sx={{ color: 'red', mb: 2 }}>{error}</Typography>}
        <TableContainer
          component={Paper}
          sx={{ backgroundColor: '#BCCCDC', width: '100%', maxWidth: 1000 }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: 'black' }}>Fecha Préstamo</TableCell>
                <TableCell sx={{ color: 'black' }}>Hora Préstamo</TableCell>
                <TableCell sx={{ color: 'black' }}>Profesor ID</TableCell>
                <TableCell sx={{ color: 'black' }}>Fecha Devolución</TableCell>
                <TableCell sx={{ color: 'black' }}>Hora Devolución</TableCell>
                <TableCell sx={{ color: 'black' }}>Estado Devolución</TableCell>
                <TableCell sx={{ color: 'black' }}>Uso Proyector</TableCell>
                <TableCell sx={{ color: 'black' }}>Número de Horas</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.length > 0 ? (
                reports.map((report, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ color: 'black' }}>
                      {report.fechaPrestamo}
                    </TableCell>
                    <TableCell sx={{ color: 'black' }}>
                      {report.horaPrestamo}
                    </TableCell>
                    <TableCell sx={{ color: 'black' }}>
                      {report.profesor}
                    </TableCell>
                    <TableCell sx={{ color: 'black' }}>
                      {report.fechaDevolucion}
                    </TableCell>
                    <TableCell sx={{ color: 'black' }}>
                      {report.horaDevolucion}
                    </TableCell>
                    <TableCell sx={{ color: 'black' }}>
                      {report.estadoDevolucion ? 'Devuelto' : 'Pendiente'}
                    </TableCell>
                    <TableCell sx={{ color: 'black' }}>
                      {report.usoProyector}
                    </TableCell>
                    <TableCell sx={{ color: 'black' }}>
                      {report.numeroHoras}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    sx={{ textAlign: 'center', color: '#9AA6B2' }}
                  >
                    No hay reportes disponibles
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default AdministradorView;
