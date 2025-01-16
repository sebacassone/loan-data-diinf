package diinf.dataloan.income_server.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "dataProyector")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DataProyectorsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idProyector;
    private String brandProyector;
    private String modelProyector;
    private String stateProyector;
    private Boolean availableProyector;
}
