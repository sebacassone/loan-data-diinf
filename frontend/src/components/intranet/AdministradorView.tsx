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
} from '@mui/material';
import loanService from '../../services/loan.service';

const AdministradorView: React.FC = () => {
  const [projectors, setProjectors] = useState([]);
  const [selectedProjector, setSelectedProjector] = useState('');
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    fetchProjectors();
  }, []);

  useEffect(() => {
    if (selectedProjector) {
      fetchLoans(selectedProjector);
    }
  }, [selectedProjector]);

  const fetchProjectors = async () => {
    const data = await loanService.getProjectors();
    setProjectors(data);
  };

  const fetchLoans = async (projectorId: string) => {
    const data = await loanService.getLoansByProjector(projectorId);
    setLoans(data);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Reporte de Préstamos
      </Typography>
      <FormControl fullWidth sx={{ mb: 4 }}>
        <InputLabel>Proyector</InputLabel>
        <Select
          value={selectedProjector}
          onChange={(e) => setSelectedProjector(e.target.value)}
        >
          {projectors.map((projector) => (
            <MenuItem key={projector.id} value={projector.id}>
              {projector.brand} {projector.model}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Fecha Préstamo</TableCell>
              <TableCell>Hora Préstamo</TableCell>
              <TableCell>Profesor</TableCell>
              <TableCell>Fecha Devolución</TableCell>
              <TableCell>Hora Devolución</TableCell>
              <TableCell>Horas en Préstamo</TableCell>
              <TableCell>Estado Devolución</TableCell>
              <TableCell>Uso</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loans.map((loan) => (
              <TableRow key={loan.id}>
                <TableCell>{loan.dateLoan}</TableCell>
                <TableCell>{loan.hourLoan}</TableCell>
                <TableCell>{loan.professor}</TableCell>
                <TableCell>{loan.dateReturn}</TableCell>
                <TableCell>{loan.hourReturn}</TableCell>
                <TableCell>{loan.totalHours}</TableCell>
                <TableCell>{loan.stateReturn}</TableCell>
                <TableCell>{loan.use}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdministradorView;
