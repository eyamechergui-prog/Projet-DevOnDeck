package com.devondeck.backend.service;

import com.devondeck.backend.dto.SkillsRequest;
import com.devondeck.backend.entity.DeveloperSkill;
import com.devondeck.backend.entity.User;
import com.devondeck.backend.repository.DeveloperSkillRepository;
import com.devondeck.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;

@Service
public class DeveloperSkillService {

    private final DeveloperSkillRepository skillRepository;
    private final UserRepository userRepository;

    public DeveloperSkillService(
            DeveloperSkillRepository skillRepository,
            UserRepository userRepository) {
        this.skillRepository = skillRepository;
        this.userRepository = userRepository;
    }

    public List<String> getSkills(Jwt jwt) {
        User user = getAuthenticatedUser(jwt);

        return skillRepository.findByUserIdOrderByNameAsc(user.getId())
                .stream()
                .map(DeveloperSkill::getName)
                .toList();
    }

    @Transactional
    public List<String> replaceSkills(Jwt jwt, SkillsRequest request) {
        if (request == null || request.getSkills() == null) {
            throw new IllegalArgumentException(
                    "La liste des compétences est obligatoire"
            );
        }

        List<String> trimmedSkills = validateAndTrim(request.getSkills());
        User user = getAuthenticatedUser(jwt);

        skillRepository.deleteByUserId(user.getId());

        List<DeveloperSkill> skills = new ArrayList<>();
        for (String name : trimmedSkills) {
            skills.add(new DeveloperSkill(user, name));
        }
        skillRepository.saveAll(skills);

        return trimmedSkills;
    }

    private User getAuthenticatedUser(Jwt jwt) {
        if (jwt == null || jwt.getSubject() == null) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Authentification requise"
            );
        }

        return userRepository.findByEmail(jwt.getSubject())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "Utilisateur non authentifié"
                ));
    }

    private List<String> validateAndTrim(List<String> skills) {
        if (skills.size() > 30) {
            throw new IllegalArgumentException("Maximum 30 compétences");
        }

        List<String> result = new ArrayList<>();
        Set<String> normalizedNames = new HashSet<>();

        for (String skill : skills) {
            String trimmed = skill == null ? "" : skill.trim();

            if (trimmed.isEmpty()
                    || trimmed.length() > 40) {
                throw new IllegalArgumentException(
                        "Chaque compétence doit contenir entre 1 et 40 caractères"
                );
            }

            String normalized = trimmed.toLowerCase(Locale.ROOT);
            if (!normalizedNames.add(normalized)) {
                throw new IllegalArgumentException(
                        "Les compétences ne doivent pas être dupliquées"
                );
            }

            result.add(trimmed);
        }

        return result;
    }
}
