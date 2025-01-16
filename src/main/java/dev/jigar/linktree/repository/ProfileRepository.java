package dev.jigar.linktree.repository;

import dev.jigar.linktree.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ProfileRepository extends JpaRepository<Profile, UUID> {
    // e.g. find by username
    Profile findByUsername(String username);
}
