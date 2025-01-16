package diinf.dataloan.management_server.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProyectorModel {
    private Integer idProyector;
    private String brandProyector;
    private String modelProyector;
    private String stateProyector;
    private Boolean availableProyector;
}