package diinf.dataloan.income_server.services;

import diinf.dataloan.income_server.entities.DataProyectorsEntity;
import diinf.dataloan.income_server.repositories.DataProyectorsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DataProyectorsService {
    private final DataProyectorsRepository dataProyectorsRepository;

    @Autowired
    public DataProyectorsService(DataProyectorsRepository dataProyectorsRepository) {
        this.dataProyectorsRepository = dataProyectorsRepository;
    }

    public void save(DataProyectorsEntity dataProyectorsEntity) {
        dataProyectorsRepository.save(dataProyectorsEntity);
    }

    public DataProyectorsEntity findById(Integer id) {
        return dataProyectorsRepository.findById(id).orElse(null);
    }

    public void deleteById(Integer id) {
        dataProyectorsRepository.deleteById(id);
    }

    public List<DataProyectorsEntity> findAll() {
        return dataProyectorsRepository.findAll();
    }

    public DataProyectorsEntity update(DataProyectorsEntity dataProyectorsEntity) {
        DataProyectorsEntity existingProyector = dataProyectorsRepository.findById(dataProyectorsEntity.getIdProyector()).orElse(null);
        if (existingProyector != null) {
            existingProyector.setBrandProyector(dataProyectorsEntity.getBrandProyector());
            existingProyector.setModelProyector(dataProyectorsEntity.getModelProyector());
            existingProyector.setStateProyector(dataProyectorsEntity.getStateProyector());
            existingProyector.setAvailableProyector(dataProyectorsEntity.getAvailableProyector());
            return dataProyectorsRepository.save(existingProyector);
        }
        return null;
    }

    public List<DataProyectorsEntity> findDataAvailables() {
        // Se obtienen los datas que estén disponibles
        return dataProyectorsRepository.findByAvailableProyector(true);
    }
}
