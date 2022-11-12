package com.example.server.controller;

import com.example.server.exception.ResourceNotFoundException;
import com.example.server.model.User;
import com.example.server.payload.*;
import com.example.server.repository.UserRepository;
import com.example.server.security.UserPrincipal;
import com.example.server.security.CurrentUser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    // @GetMapping("/user/checkUsernameAvailability")
    // public UserIdentityAvailability checkUsernameAvailability(@RequestParam(value = "username") String username) {
    //     Boolean isAvailable = !userRepository.existsByUsername(username);
    //     return new UserIdentityAvailability(isAvailable);
    // }

    @GetMapping("/user/checkEmailAvailability")
    public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
        Boolean isAvailable = !userRepository.existsByEmail(email);
        return new UserIdentityAvailability(isAvailable);
    }


}
