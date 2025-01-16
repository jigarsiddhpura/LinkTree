package dev.jigar.linktree.service;

import dev.jigar.linktree.entity.User;
import dev.jigar.linktree.dto.AuthRequestDTO;
import dev.jigar.linktree.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User signup(AuthRequestDTO authRequestDTO) {
        if (userRepository.findByEmail(authRequestDTO.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email is already registered.");
        }

        User user = User.builder()
                .email(authRequestDTO.getEmail())
                .passwordHash(passwordEncoder.encode(authRequestDTO.getPassword()))
                .isVerified(false)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return userRepository.save(user);
    }

    public User login(AuthRequestDTO authRequestDTO) {
        Optional<User> userOptional = userRepository.findByEmail(authRequestDTO.getEmail());

        if (userOptional.isEmpty() ||
                !passwordEncoder.matches(authRequestDTO.getPassword(), userOptional.get().getPasswordHash())) {
            throw new IllegalArgumentException("Invalid email or password.");
        }

        User user = userOptional.get();
        user.setLastLogin(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);

        return user;
    }
}
