package diinf.dataloan.management_server.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsersModel {
    private Integer idUser;
    private String nameUser;
    private String emailUser;
    private boolean stateUser;
    private int damageCount;
    private LocalDateTime tempDisabledUntil;
}
