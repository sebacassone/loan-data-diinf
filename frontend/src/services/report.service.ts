import HttpClient from '../http-common';
import { LoanReportModel } from '../models/LoanReportModel';

const getReport = async (): Promise<LoanReportModel[]> => {
  const response = await HttpClient.get('/api/v1/reports/loan');
  return response.data;
};

export default {
  getReport,
};
