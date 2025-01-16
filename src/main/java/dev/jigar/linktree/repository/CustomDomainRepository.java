package dev.jigar.linktree.repository;

import dev.jigar.linktree.entity.CustomDomain;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CustomDomainRepository extends JpaRepository<CustomDomain, UUID> {
}
