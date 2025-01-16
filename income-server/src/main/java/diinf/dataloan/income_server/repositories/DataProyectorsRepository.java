package diinf.dataloan.income_server.repositories;

import diinf.dataloan.income_server.entities.DataProyectorsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DataProyectorsRepository extends JpaRepository<DataProyectorsEntity, Integer> {
    List<DataProyectorsEntity> findByAvailableProyector(boolean availableProyector);
}
