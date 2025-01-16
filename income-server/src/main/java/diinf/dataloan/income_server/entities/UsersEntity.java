package diinf.dataloan.income_server.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsersEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idUser;

    private String nameUser;
    private String firstlastnameUser;
    private String secondLastnameUser;
    private String roleUser;
    private String emailUser;
    private String passwordUser;
    private String phoneUser;

    // true = enabled, false = disabled
    private boolean stateUser;

    // Número de veces que devolvió con daños
    private int damageCount;

    // Fecha y hora hasta la cual está temporalmente deshabilitado
    private LocalDateTime tempDisabledUntil;
}
