package diinf.dataloan.income_server.repositories;

import diinf.dataloan.income_server.entities.UsersEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends JpaRepository<UsersEntity, Integer> {
    UsersEntity findByEmailUserAndPasswordUser(String email, String password);
}
