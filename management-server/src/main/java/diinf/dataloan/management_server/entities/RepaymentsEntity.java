package diinf.dataloan.management_server.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "repayments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RepaymentsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idRepayment;

    private Integer idLoan;               // Referencia al préstamo

    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate dateRepayment;

    @JsonFormat(pattern = "HH:mm")
    private LocalTime hourRepayment;

    private String stateRepayment;        // "Buenas Condiciones" o "Con Daños"

    private long totalHours;             // Horas que estuvo en poder del profesor
}
