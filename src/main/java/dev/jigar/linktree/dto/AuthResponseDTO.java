package dev.jigar.linktree.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class AuthResponseDTO {
    private UUID id;                  // Unique identifier for the user
    private String email;             // User's email address
    private Boolean isVerified;       // Indicates if the user is email-verified
    private Boolean isAdmin;          // Indicates if the user has admin privileges
    private LocalDateTime createdAt;  // Timestamp when the user account was created
    private LocalDateTime lastLogin;  // Timestamp of the user's last login
    // private String token;             // JWT token or session token for authentication
}
