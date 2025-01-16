package diinf.dataloan.management_server.controllers;

import diinf.dataloan.management_server.entities.LoansEntity;
import diinf.dataloan.management_server.entities.RepaymentsEntity;
import diinf.dataloan.management_server.services.LoansService;
import diinf.dataloan.management_server.services.RepaymentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/loans")
public class LoansController {

    @Autowired
    private LoansService loansService;
    @Autowired
    private RepaymentsService repaymentsService;

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody LoansEntity loan) {
        try {
            System.out.println(loan);
            LoansEntity savedLoan = loansService.save(loan);
            System.out.println(savedLoan);
            return ResponseEntity.ok(savedLoan);
        } catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @PostMapping("/return")
    public ResponseEntity<?> returnLoan(@RequestBody RepaymentsEntity repayment) {
        try {
            RepaymentsEntity savedRepayment = loansService.returnLoan(repayment);
            return ResponseEntity.ok(savedRepayment);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping("/find-all")
    public ResponseEntity<List<LoansEntity>> findAll() {
        try {
            return ResponseEntity.ok(loansService.findAll());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/projector/{id}")
    public ResponseEntity<List<LoansEntity>> getLoansByProjector(@PathVariable Integer id) {
        try {
            List<LoansEntity> loans = loansService.findLoansByProjector(id);
            return ResponseEntity.ok(loans);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/repayments")
    public ResponseEntity<List<RepaymentsEntity>> getAllRepayments() {
        try {
            List<RepaymentsEntity> repayments = loansService.findRepaymentsByLoanIds(loansService.findAll().stream().map(LoansEntity::getIdLoan).toList());
            return ResponseEntity.ok(repayments);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/get-repayments-by-loanid/{id}")
    public ResponseEntity<RepaymentsEntity> getRepaymentsByLoanId(@PathVariable Integer id) {
        try {
            RepaymentsEntity repayment = repaymentsService.findRepaymentsByLoanId(id);
            return ResponseEntity.ok(repayment);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/find-by-id-user/{id}")
    public ResponseEntity<List<LoansEntity>> getLoansByUser(@PathVariable Integer id) {
        try {
            List<LoansEntity> loans = loansService.findLoansByUser(id);
            return ResponseEntity.ok(loans);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}