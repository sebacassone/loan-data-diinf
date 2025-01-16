package diinf.dataloan.report_server.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

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
