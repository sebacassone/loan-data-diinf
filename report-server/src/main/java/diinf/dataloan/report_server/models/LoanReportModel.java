package diinf.dataloan.report_server.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoanReportModel {
    private String fechaPrestamo;
    private String horaPrestamo;
    private Integer profesor;
    private String fechaDevolucion;
    private String horaDevolucion;
    private Boolean estadoDevolucion;
    private String usoProyector;
    private long numeroHoras;
}
