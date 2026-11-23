package com.devondeck.backend.service;

import com.devondeck.backend.dto.LoginRequest;
import com.devondeck.backend.dto.LoginResponse;
import com.devondeck.backend.dto.RegisterRequest;
import com.devondeck.backend.entity.User;
import com.devondeck.backend.repository.UserRepository;
import com.devondeck.backend.security.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Locale;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public AuthService(
            AuthenticationManager authenticationManager,
            UserRepository userRepository,
            JwtService jwtService,
            PasswordEncoder passwordEncoder) {

        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    public void register(RegisterRequest request) {
        String email = request.getEmail().trim().toLowerCase(Locale.ROOT);

        if (userRepository.existsByEmail(email)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cet email est déjà utilisé.");
        }

        User user = new User(
                request.getFirstName().trim(),
                request.getLastName().trim(),
                email,
                passwordEncoder.encode(request.getPassword()),
                request.getRole()
        );

        userRepository.save(user);
    }

    public LoginResponse login(LoginRequest request) {

        String email = request.getEmail()
                .trim()
                .toLowerCase(Locale.ROOT);

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        email,
                        request.getPassword()
                )
        );

        var user = userRepository.findByEmail(email)
                .orElseThrow();

        String token = jwtService.generateToken(
                user.getEmail(),
                user.getRole().name()
        );

        return new LoginResponse(
                token,
                user.getEmail(),
                user.getRole().name()
        );
    }
}
