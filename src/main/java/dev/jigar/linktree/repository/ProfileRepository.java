package dev.jigar.linktree.repository;

import dev.jigar.linktree.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface ProfileRepository extends JpaRepository<Profile, UUID> {
    // e.g. find by username
    Profile findByUsername(String username);

    @Query("select count(p) from Profile p where p.user.id = :userId")
    int profileCountbyUserId(@Param("userId") UUID userId);

    @Query("SELECT p FROM Profile p WHERE p.user.id = :userId")
    List<Profile> findByUserId(@Param("userId") UUID userId);

    @Query("SELECT p.username FROM Profile p")
    List<String> findAllProfileNames();
}
