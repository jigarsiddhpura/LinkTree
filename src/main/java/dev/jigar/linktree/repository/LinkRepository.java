package dev.jigar.linktree.repository;

import dev.jigar.linktree.entity.Link;
import dev.jigar.linktree.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface LinkRepository extends JpaRepository<Link, UUID> {

    // Find all links for a profile, ordered by position ascending
    List<Link> findByProfileOrderByPositionAsc(Profile profile);
}
