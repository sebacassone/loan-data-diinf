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
  Button,
} from '@mui/material';
import NavBar from '../Navbar';
import reportService from '../../services/report.service';
import AddIcon from '@mui/icons-material/Add';

// Definición de la interfaz basada en LoanReportModel
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

const AdministradorView: React.FC = () => {
  const [reports, setReports] = useState<LoanReportModel[]>([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const data = await reportService.getReport();
      setReports(data);
    } catch (error) {
      console.error('Error al obtener el reporte:', error);
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
        <TableContainer
          component={Paper}
          sx={{ backgroundColor: '#BCCCDC', width: '100%', maxWidth: 1000 }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#9AA6B2' }}>Fecha Préstamo</TableCell>
                <TableCell sx={{ color: '#9AA6B2' }}>Hora Préstamo</TableCell>
                <TableCell sx={{ color: '#9AA6B2' }}>Profesor ID</TableCell>
                <TableCell sx={{ color: '#9AA6B2' }}>
                  Fecha Devolución
                </TableCell>
                <TableCell sx={{ color: '#9AA6B2' }}>Hora Devolución</TableCell>
                <TableCell sx={{ color: '#9AA6B2' }}>
                  Estado Devolución
                </TableCell>
                <TableCell sx={{ color: '#9AA6B2' }}>Uso Proyector</TableCell>
                <TableCell sx={{ color: '#9AA6B2' }}>Número de Horas</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.map((report, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ color: '#9AA6B2' }}>
                    {report.fechaPrestamo}
                  </TableCell>
                  <TableCell sx={{ color: '#9AA6B2' }}>
                    {report.horaPrestamo}
                  </TableCell>
                  <TableCell sx={{ color: '#9AA6B2' }}>
                    {report.profesor}
                  </TableCell>
                  <TableCell sx={{ color: '#9AA6B2' }}>
                    {report.fechaDevolucion}
                  </TableCell>
                  <TableCell sx={{ color: '#9AA6B2' }}>
                    {report.horaDevolucion}
                  </TableCell>
                  <TableCell sx={{ color: '#9AA6B2' }}>
                    {report.estadoDevolucion ? 'Devuelto' : 'Pendiente'}
                  </TableCell>
                  <TableCell sx={{ color: '#9AA6B2' }}>
                    {report.usoProyector}
                  </TableCell>
                  <TableCell sx={{ color: '#9AA6B2' }}>
                    {report.numeroHoras}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default AdministradorView;
