package com.devondeck.backend.repository;

import com.devondeck.backend.entity.DeveloperProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DeveloperProfileRepository
        extends JpaRepository<DeveloperProfile, Long> {

    Optional<DeveloperProfile> findByUserId(Long userId);
}
