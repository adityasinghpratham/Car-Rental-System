package com.project.car_rental.service;

import com.project.car_rental.entity.User;
import com.project.car_rental.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Fetch user by email
    public User getByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }
}
