package diinf.dataloan.management_server.repositories;

import diinf.dataloan.management_server.entities.RepaymentsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepaymentsRepository extends JpaRepository<RepaymentsEntity, Integer> {
    List<RepaymentsEntity> findByIdLoanIn(List<Integer> loanIds);
    RepaymentsEntity findByIdLoan(Integer idLoan);
}
