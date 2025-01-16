package diinf.dataloan.report_server.controllers;

import diinf.dataloan.report_server.services.ReportService;
import diinf.dataloan.report_server.models.LoanReportModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/reports")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @GetMapping("/loan")
    public ResponseEntity<List<LoanReportModel>> getLoanReport(@RequestParam Integer projectorId) {
        return ResponseEntity.ok(reportService.getLoanReport(projectorId));
    }
}