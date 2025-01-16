import HttpClient from '../http-common';

const getActiveLoans = async () => {
  const response = await HttpClient.get('/api/v1/loans/active');
  return response.data;
};

const getAvailableProjectors = async () => {
  const response = await HttpClient.get('/api/v1/data-proyectors/available');
  return response.data;
};

const createLoan = async (
  dateLoan: String,
  hourLoan: String,
  idUser: number,
  idProyector: number,
  usage: String,
  isDisabled: boolean,
) => {
  const response = await HttpClient.post('/api/v1/loans/save', {
    dateLoan,
    hourLoan,
    idUser,
    idProyector,
    usage,
    isDisabled,
  });
  return response.data;
};

const returnLoan = async (
  idLoan: string,
  stateRepayment: string,
  dateRepayment: string,
  hourRepayment: string,
) => {
  console.log(
    'Returning loan:',
    idLoan,
    stateRepayment,
    dateRepayment,
    hourRepayment,
  );
  const response = await HttpClient.post('/api/v1/loans/return', {
    idLoan,
    stateRepayment,
    dateRepayment,
    hourRepayment,
  });
  return response.data;
};

const getProjectors = async () => {
  const response = await HttpClient.get('/api/v1/data-proyectors/find-all');
  return response.data;
};

const getLoansByProjector = async (projectorId: string) => {
  const response = await HttpClient.get(
    `/api/v1/loans/projector/${projectorId}`,
  );
  return response.data;
};

const getLoansByUserId = async (userId: string) => {
  try {
    const response = await HttpClient.get(
      `/api/v1/loans/find-by-id-user/${userId}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching loans by user ID:', error);
    throw error;
  }
};

const createProjector = async (
  brand: string,
  model: string,
  state: string,
  isDisabled: boolean,
) => {
  console.log('Creating projector:', brand, model, state, isDisabled);
  const response = await HttpClient.post('/api/v1/data-proyectors/save', {
    brandProyector: brand,
    modelProyector: model,
    stateProyector: state,
    availableProyector: isDisabled,
  });
  console.log('Response:', response);
  return response.data;
};

export default {
  getActiveLoans,
  getAvailableProjectors,
  createLoan,
  returnLoan,
  getProjectors,
  getLoansByProjector,
  getLoansByUserId,
  createProjector,
};
