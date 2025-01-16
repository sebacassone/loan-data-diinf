package diinf.dataloan.income_server.services;

import diinf.dataloan.income_server.entities.UsersEntity;
import diinf.dataloan.income_server.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UsersService {

    private final UsersRepository usersRepository;

    @Autowired
    public UsersService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    public UsersEntity save(UsersEntity usersEntity) {
        return usersRepository.save(usersEntity);
    }

    public UsersEntity findById(Integer id) {
        return usersRepository.findById(id).orElse(null);
    }

    public void deleteById(Integer id) {
        usersRepository.deleteById(id);
    }

    public UsersEntity update(UsersEntity user) {
        UsersEntity existingUser = usersRepository.findById(user.getIdUser()).orElse(null);
        if (existingUser != null) {
            existingUser.setNameUser(user.getNameUser());
            existingUser.setFirstlastnameUser(user.getFirstlastnameUser());
            existingUser.setSecondLastnameUser(user.getSecondLastnameUser());
            existingUser.setEmailUser(user.getEmailUser());
            existingUser.setPhoneUser(user.getPhoneUser());
            existingUser.setRoleUser(user.getRoleUser());
            existingUser.setPasswordUser(user.getPasswordUser());
            existingUser.setStateUser(user.isStateUser());
            existingUser.setDamageCount(user.getDamageCount());
            existingUser.setTempDisabledUntil(user.getTempDisabledUntil());
            return usersRepository.save(existingUser);
        }
        return null;
    }

    public UsersEntity login(String email, String password) {
        return usersRepository.findByEmailUserAndPasswordUser(email, password);
    }

    // Método para incrementar el contador de daños y deshabilitar si es necesario
    public UsersEntity handleDamage(Integer userId) {
        UsersEntity user = usersRepository.findById(userId).orElse(null);
        if (user != null) {
            user.setDamageCount(user.getDamageCount() + 1);
            if (user.getDamageCount() >= 3) {
                user.setStateUser(false); // Deshabilitar permanentemente
            }
            usersRepository.save(user);
        }
        return user;
    }

    // Método para establecer la deshabilitación temporal
    public UsersEntity disableTemporarily(Integer userId, LocalDateTime until) {
        UsersEntity user = usersRepository.findById(userId).orElse(null);
        if (user != null) {
            user.setTempDisabledUntil(until);
            usersRepository.save(user);
        }
        return user;
    }

    // Método para habilitar al usuario (después de que pase la deshabilitación temporal)
    public UsersEntity enableUser(Integer userId) {
        UsersEntity user = usersRepository.findById(userId).orElse(null);
        if (user != null) {
            user.setTempDisabledUntil(null);
            usersRepository.save(user);
        }
        return user;
    }

}
