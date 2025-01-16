package diinf.dataloan.report_server.services;

import diinf.dataloan.report_server.models.LoanModel;
import diinf.dataloan.report_server.models.LoanReportModel;
import diinf.dataloan.report_server.models.RepaymentModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class ReportService {
    private final RestTemplate restTemplate;

    @Autowired
    public ReportService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<LoanReportModel> getLoanReport(Integer projectorId) {
        String loansUrl = "http://management-server:3002/api/v1/loans/projector/" + projectorId;

        // Usa ParameterizedTypeReference para mapear correctamente la lista
        ResponseEntity<List<LoanModel>> response = restTemplate.exchange(
                loansUrl,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<LoanModel>>() {}
        );

        List<LoanModel> loans = response.getBody();

        if (loans == null || loans.isEmpty()) {
            return new ArrayList<>();
        }

        List<LoanReportModel> report = new ArrayList<>();

        for (LoanModel loan : loans) {
            if (loan == null) {
                continue;
            }
            String paymentUrl = "http://management-server:3002/api/v1/loans/get-repayments-by-loanid/" + loan.getIdLoan();
            RepaymentModel repayment = restTemplate.getForObject(paymentUrl, RepaymentModel.class);
            System.out.println("Repayment: " + repayment);
            if (repayment == null) {
                continue;
            }

            LoanReportModel reportModel = getLoanReportModel(loan, repayment);

            report.add(reportModel);
        }

        report.sort(Comparator.comparing(LoanReportModel::getFechaPrestamo)
                              .thenComparing(LoanReportModel::getHoraPrestamo));

        System.out.println(report);
        return report;
    }

    private static LoanReportModel getLoanReportModel(LoanModel loan, RepaymentModel repayment) {
        String fechaPrestamo = loan.getDateLoan();
        String horaPrestamo = loan.getHourLoan();
        Integer profesor = loan.getIdUser();
        String fechaDevolucion = repayment.getDateRepayment();
        String horaDevolucion = repayment.getHourRepayment();
        long numeroHoras = repayment.getTotalHours();
        Boolean estado = loan.isDisabled();
        String uso = loan.getUsage();

        LoanReportModel reportModel = new LoanReportModel();
        reportModel.setFechaPrestamo(fechaPrestamo);
        reportModel.setHoraPrestamo(horaPrestamo);
        reportModel.setProfesor(profesor);
        reportModel.setFechaDevolucion(fechaDevolucion);
        reportModel.setHoraDevolucion(horaDevolucion);
        reportModel.setNumeroHoras(numeroHoras);
        reportModel.setEstadoDevolucion(estado);
        reportModel.setUsoProyector(uso);
        return reportModel;
    }
}
