import HttpClient from '../http-common';
import { LoanReportModel } from '../models/LoanReportModel';

const getReport = async (): Promise<LoanReportModel[]> => {
  const response = await HttpClient.get('/api/v1/reports/loan');
  return response.data;
};

const getReportByProjector = async (
  projectorId: number,
): Promise<LoanReportModel[]> => {
  const response = await HttpClient.get(`/api/v1/reports/loan`, {
    params: { projectorId },
  });
  return response.data;
};

const getAllReports = async (): Promise<LoanReportModel[]> => {
  const response = await HttpClient.get('/api/v1/reports/all');
  return response.data;
};

export default {
  getReport,
  getReportByProjector,
  getAllReports,
};
