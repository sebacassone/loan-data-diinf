package diinf.dataloan.report_server.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoanModel {
    private Integer idLoan;
    private String dateLoan;
    private String hourLoan;
    private Integer idUser;
    private Integer idProyector;
    private String usage;
    private boolean isDisabled;
}
