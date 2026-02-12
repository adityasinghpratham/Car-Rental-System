package com.project.car_rental.config;

import com.project.car_rental.entity.Role;
import com.project.car_rental.entity.User;
import com.project.car_rental.repository.RoleRepository;
import com.project.car_rental.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Set;

@Configuration
public class DataInitializer implements CommandLineRunner {

    @Autowired private RoleRepository roleRepo;
    @Autowired private UserRepository userRepo;
    @Autowired private BCryptPasswordEncoder encoder;

    @Override
    public void run(String... args) {
        if (roleRepo.findByName("ADMIN") == null) roleRepo.save(new Role(null,"ADMIN"));
        if (roleRepo.findByName("USER") == null) roleRepo.save(new Role(null,"USER"));

        if (!userRepo.findByEmail("admin@carrental.com").isPresent()) {
            User admin = new User();
            admin.setEmail("admin@carrental.com");
            admin.setPassword(encoder.encode("admin123"));
            admin.setRoles(Set.of(roleRepo.findByName("ADMIN")));
            userRepo.save(admin);
        }

        if (!userRepo.findByEmail("user@carrental.com").isPresent()) {
            User user = new User();
            user.setEmail("user@carrental.com");
            user.setPassword(encoder.encode("user123"));
            user.setRoles(Set.of(roleRepo.findByName("USER")));
            userRepo.save(user);
        }
    }
}
