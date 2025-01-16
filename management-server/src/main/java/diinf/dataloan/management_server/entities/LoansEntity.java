package diinf.dataloan.management_server.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "loans")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoansEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idLoan;

    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate dateLoan;

    @JsonFormat(pattern = "HH:mm")
    private LocalTime hourLoan;

    private Integer idUser;          // ID del usuario en income-service
    private Integer idProyector;     // ID del proyector
    private String usage;            // Uso que se le da al proyector
    private boolean isDisabled;     // Indicador de si el préstamo está deshabilitado
}