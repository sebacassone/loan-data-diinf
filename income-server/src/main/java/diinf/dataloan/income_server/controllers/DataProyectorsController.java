package diinf.dataloan.income_server.controllers;

import diinf.dataloan.income_server.entities.DataProyectorsEntity;
import diinf.dataloan.income_server.services.DataProyectorsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/data-proyectors")
public class DataProyectorsController {
    private final DataProyectorsService dataProyectorsService;

    @Autowired
    public DataProyectorsController(DataProyectorsService dataProyectorsService) {
        this.dataProyectorsService = dataProyectorsService;
    }

    @PostMapping("/save")
    public ResponseEntity<Boolean> save(@RequestBody DataProyectorsEntity dataProyectorsEntity) {
        try{
            dataProyectorsService.save(dataProyectorsEntity);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/find-by-id/{id}")
    public ResponseEntity<DataProyectorsEntity> findById(@PathVariable("id") Integer id) {
        try{
            return ResponseEntity.ok(dataProyectorsService.findById(id));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/delete-by-id/{id}")
    public ResponseEntity<Boolean> deleteById(@PathVariable("id") Integer id) {
        try{
            dataProyectorsService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/find-all")
    public ResponseEntity<List<DataProyectorsEntity>> findAll() {
        try{
            return ResponseEntity.ok(dataProyectorsService.findAll());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/update-data")
    public ResponseEntity<DataProyectorsEntity> update(@RequestBody DataProyectorsEntity dataProyectorsEntity) {
        try{
            return ResponseEntity.ok(dataProyectorsService.update(dataProyectorsEntity));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

}
