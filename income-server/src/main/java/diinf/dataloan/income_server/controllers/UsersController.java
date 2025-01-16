package diinf.dataloan.income_server.controllers;

import diinf.dataloan.income_server.entities.UsersEntity;
import diinf.dataloan.income_server.services.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/users")
public class UsersController {
    private final UsersService usersService;

    @Autowired
    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    @PostMapping("/save")
    public ResponseEntity<Boolean> save(@RequestBody UsersEntity usersEntity) {
        try {
            usersService.save(usersEntity);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/find-by-id/{id}")
    public ResponseEntity<UsersEntity> findById(@PathVariable("id") Integer id) {
        try {
            return ResponseEntity.ok(usersService.findById(id));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/delete-by-id/{id}")
    public ResponseEntity<Boolean> deleteById(@PathVariable("id") Integer id) {
        try {
            usersService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/update")
    public ResponseEntity<UsersEntity> update(@RequestBody UsersEntity usersEntity) {
        try {
            return ResponseEntity.ok(usersService.update(usersEntity));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<UsersEntity> login(@RequestBody Map<Object, String> body) {
        try {
            return ResponseEntity.ok(usersService.login(body.get("email"), body.get("password")));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // Endpoint para manejar daños
    @PostMapping("/handle-damage/{userId}")
    public ResponseEntity<UsersEntity> handleDamage(@PathVariable("userId") Integer userId) {
        try {
            UsersEntity user = usersService.handleDamage(userId);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // Endpoint para deshabilitar temporalmente
    @PostMapping("/disable-temporarily/{userId}")
    public ResponseEntity<UsersEntity> disableTemporarily(@PathVariable("userId") Integer userId) {
        try {
            LocalDateTime until = LocalDateTime.now().plusWeeks(1);
            UsersEntity user = usersService.disableTemporarily(userId, until);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // Endpoint para habilitar al usuario
    @PostMapping("/enable-user/{userId}")
    public ResponseEntity<UsersEntity> enableUser(@PathVariable("userId") Integer userId) {
        try {
            UsersEntity user = usersService.enableUser(userId);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
