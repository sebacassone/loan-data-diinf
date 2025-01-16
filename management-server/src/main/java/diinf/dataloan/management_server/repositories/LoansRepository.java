package diinf.dataloan.management_server.repositories;

import diinf.dataloan.management_server.entities.LoansEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoansRepository extends JpaRepository<LoansEntity, Integer> {
    List<LoansEntity> findByIdProyectorOrderByDateLoanAscHourLoanAsc(Integer idProyector);
}
