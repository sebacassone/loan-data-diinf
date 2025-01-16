package diinf.dataloan.management_server.services;

import diinf.dataloan.management_server.entities.RepaymentsEntity;
import diinf.dataloan.management_server.repositories.RepaymentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RepaymentsService {
    private final RepaymentsRepository repaymentsRepository;

    @Autowired
    public RepaymentsService(RepaymentsRepository repaymentsRepository) {
        this.repaymentsRepository = repaymentsRepository;
    }

    public RepaymentsEntity findRepaymentsByLoanId(Integer idLoan) {
        return repaymentsRepository.findByIdLoan(idLoan);
    }
}
