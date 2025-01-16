package diinf.dataloan.management_server.services;

import diinf.dataloan.management_server.entities.LoansEntity;
import diinf.dataloan.management_server.entities.RepaymentsEntity;
import diinf.dataloan.management_server.models.ProyectorModel;
import diinf.dataloan.management_server.models.UsersModel;
import diinf.dataloan.management_server.repositories.LoansRepository;
import diinf.dataloan.management_server.repositories.RepaymentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class LoansService {
    private final LoansRepository loansRepository;
    private final RepaymentsRepository repaymentsRepository;
    private final RestTemplate restTemplate;

    @Autowired
    public LoansService(LoansRepository loansRepository, RepaymentsRepository repaymentsRepository, RestTemplate restTemplate) {
        this.loansRepository = loansRepository;
        this.repaymentsRepository = repaymentsRepository;
        this.restTemplate = restTemplate;
    }

    public LoansEntity save(LoansEntity loan) {
        String proyectorUrl = "http://income-server:3001/api/v1/data-proyectors/find-by-id/" + loan.getIdProyector();
        ProyectorModel proyector = restTemplate.getForObject(proyectorUrl, ProyectorModel.class);
        System.out.println(proyector);

        if (proyector != null && proyector.getAvailableProyector()) {
            // Validar marca y uso
            if (loan.getUsage().equalsIgnoreCase("Dictado de Clases") || loan.getUsage().equalsIgnoreCase("Examen de Título")) {
                if (!proyector.getBrandProyector().equalsIgnoreCase("EPSON")) {
                    throw new IllegalArgumentException("Uso no permitido para este proyector");
                }
            } else if (loan.getUsage().equalsIgnoreCase("Reuniones Varias")) {
                if (!proyector.getBrandProyector().equalsIgnoreCase("ViewSonic")) {
                    throw new IllegalArgumentException("Uso no permitido para este proyector");
                }
            } else {
                throw new IllegalArgumentException("Uso no permitido para este proyector");
            }

            // Verificar si el usuario está habilitado
            String userUrl = "http://income-server:3001/api/v1/users/find-by-id/" + loan.getIdUser();
            UsersModel user = restTemplate.getForObject(userUrl, UsersModel.class);
            if (user != null) {
                if (!user.isStateUser()) {
                    throw new IllegalStateException("El usuario está deshabilitado para realizar préstamos");
                }
                if (user.getTempDisabledUntil() != null && user.getTempDisabledUntil().isAfter(LocalDateTime.now())) {
                    throw new IllegalStateException("El usuario está temporalmente deshabilitado hasta " + user.getTempDisabledUntil());
                }
            } else {
                throw new IllegalArgumentException("Usuario no encontrado");
            }

        } else {
            throw new IllegalArgumentException("Proyector no encontrado");
        }

        // Eliminar la sobrescritura de la fecha y hora
        // loan.setDateLoan(LocalDate.now());
        // loan.setHourLoan(LocalTime.now());

        loan.setDisabled(false);

        return loansRepository.save(loan);
    }

    public RepaymentsEntity returnLoan(RepaymentsEntity repayment) {
        LoansEntity loan = loansRepository.findById(repayment.getIdLoan())
                .orElseThrow(() -> new RuntimeException("No existe el préstamo"));

        if (loan.isDisabled()) {
            throw new IllegalStateException("El préstamo está inactivo y no se puede devolver nuevamente");
        }

        // Calculamos horas en poder:
        LocalDateTime loanDateTime = LocalDateTime.of(loan.getDateLoan(), loan.getHourLoan());
        LocalDateTime repaymentDateTime = LocalDateTime.of(repayment.getDateRepayment(), repayment.getHourRepayment());

        if (repaymentDateTime.isBefore(loanDateTime)) {
            throw new IllegalArgumentException("La fecha de devolución debe ser posterior a la fecha de préstamo");
        }

        // Se obtiene el proyector
        String proyectorUrl = "http://income-server:3001/api/v1/data-proyectors/find-by-id/" + loan.getIdProyector();
        ProyectorModel proyector = restTemplate.getForObject(proyectorUrl, ProyectorModel.class);
        if (proyector == null) {
            throw new IllegalArgumentException("Proyector no encontrado");
        }

        Duration duration = Duration.between(loanDateTime, repaymentDateTime);
        long hours = duration.toHours();
        repayment.setTotalHours(hours);

        // Regla: si > 6 horas => inhabilitar temporalmente por una semana
        if (hours > 6) {
            String disableUrl = "http://income-server:3001/api/v1/users/disable-temporarily/" + loan.getIdUser();
            restTemplate.postForEntity(disableUrl, null, UsersModel.class);
        }

        // Regla: si el estado es "Con Daños", manejar daños
        if ("Con Daños".equalsIgnoreCase(repayment.getStateRepayment())) {
            proyector.setStateProyector("Dañado");
            String handleDamageUrl = "http://income-server:3001/api/v1/users/handle-damage/" + loan.getIdUser();
            restTemplate.postForEntity(handleDamageUrl, null, UsersModel.class);
        }

        // Actualizar el estado del proyector
        proyector.setAvailableProyector(true);
        loan.setDisabled(true);
        loansRepository.save(loan);

        // Actualizar el estado del proyector
        String proyectorUpdateUrl = "http://income-server:3001/api/v1/data-proyectors/update-data";
        restTemplate.put(proyectorUpdateUrl, proyector, ProyectorModel.class);

        repaymentsRepository.save(repayment);
        return repayment;
    }

    public LoansEntity findById(Integer id) {
        return loansRepository.findById(id).orElse(null);
    }

    public List<LoansEntity> findLoansByUser(Integer idUser) {
        return loansRepository.findByIdUserOrderByDateLoanAscHourLoanAsc(idUser);
    }

    public void deleteById(Integer id) {
        loansRepository.deleteById(id);
    }

    public List<LoansEntity> findAll() {
        return loansRepository.findAll();
    }

    public List<LoansEntity> findLoansByProjector(Integer idProjector) {
        return loansRepository.findByIdProyectorOrderByDateLoanAscHourLoanAsc(idProjector);
    }

    public List<RepaymentsEntity> findRepaymentsByLoanIds(List<Integer> loanIds) {
        return repaymentsRepository.findByIdLoanIn(loanIds);
    }
}