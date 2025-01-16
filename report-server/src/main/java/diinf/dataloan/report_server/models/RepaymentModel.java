package diinf.dataloan.report_server.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RepaymentModel {
    private Integer idRepayment;
    private Integer idLoan;
    private String dateRepayment;
    private String hourRepayment;
    private String stateRepayment;
    private long totalHours;
}
