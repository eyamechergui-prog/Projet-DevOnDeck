package com.devondeck.backend.repository;

import com.devondeck.backend.entity.DeveloperSkill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DeveloperSkillRepository extends JpaRepository<DeveloperSkill, Long> {

    List<DeveloperSkill> findByUserIdOrderByNameAsc(Long userId);

    void deleteByUserId(Long userId);
}
