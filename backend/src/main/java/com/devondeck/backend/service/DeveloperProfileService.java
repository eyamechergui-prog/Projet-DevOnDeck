package com.devondeck.backend.service;

import com.devondeck.backend.dto.DeveloperProfileRequest;
import com.devondeck.backend.dto.DeveloperProfileResponse;
import com.devondeck.backend.entity.DeveloperProfile;
import com.devondeck.backend.entity.User;
import com.devondeck.backend.repository.DeveloperProfileRepository;
import com.devondeck.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Locale;
import java.util.Set;

@Service
public class DeveloperProfileService {

    private final DeveloperProfileRepository profileRepository;
    private final UserRepository userRepository;

    public DeveloperProfileService(
            DeveloperProfileRepository profileRepository,
            UserRepository userRepository) {
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
    }

    public DeveloperProfileResponse getProfile(Jwt jwt) {
        User user = getAuthenticatedUser(jwt);
        return profileRepository.findByUserId(user.getId())
                .map(this::toResponse)
                .orElseGet(() -> new DeveloperProfileResponse(
                        "", "", "", "", "", new ArrayList<>()
                ));
    }

    @Transactional
    public DeveloperProfileResponse updateProfile(
            Jwt jwt,
            DeveloperProfileRequest request) {

        User user = getAuthenticatedUser(jwt);
        DeveloperProfile profile = profileRepository
                .findByUserId(user.getId())
                .orElseGet(() -> new DeveloperProfile(user));

        if (request.getFirstName() != null) {
            user.setFirstName(validateText(
                    "Le prénom",
                    request.getFirstName(),
                    2,
                    50,
                    true
            ));
        }

        if (request.getLastName() != null) {
            user.setLastName(validateText(
                    "Le nom",
                    request.getLastName(),
                    2,
                    50,
                    true
            ));
        }

        userRepository.save(user);

        if (request.getTitle() != null) {
            profile.setTitle(validateText(
                    "Le titre professionnel",
                    request.getTitle(),
                    1,
                    100,
                    true
            ));
        }

        if (request.getLocation() != null) {
            profile.setLocation(validateText(
                    "La localisation",
                    request.getLocation(),
                    1,
                    100,
                    true
            ));
        }

        if (request.getBio() != null) {
            String bio = request.getBio().trim();
            if (bio.length() > 500) {
                throw new IllegalArgumentException(
                        "La bio ne doit pas dépasser 500 caractères"
                );
            }
            profile.setBio(bio);
        }

        if (request.getLanguages() != null) {
            profile.setLanguages(validateLanguages(request.getLanguages()));
        }

        return toResponse(profileRepository.save(profile));
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

    private String validateText(
            String label,
            String value,
            int minimum,
            int maximum,
            boolean required) {

        String trimmed = value == null ? "" : value.trim();

        if (required && trimmed.isEmpty()) {
            throw new IllegalArgumentException(label + " est obligatoire");
        }
        if (trimmed.length() < minimum && !trimmed.isEmpty()) {
            throw new IllegalArgumentException(
                    label + " doit contenir au moins " + minimum + " caractères"
            );
        }
        if (trimmed.length() > maximum) {
            throw new IllegalArgumentException(
                    label + " ne doit pas dépasser " + maximum + " caractères"
            );
        }

        return trimmed;
    }

    private java.util.List<String> validateLanguages(
            java.util.List<String> languages) {

        if (languages == null || languages.size() != 5) {
            throw new IllegalArgumentException(
                    "Sélectionnez exactement 5 langages"
            );
        }

        java.util.List<String> result = new ArrayList<>();
        Set<String> unique = new HashSet<>();

        for (String language : languages) {
            String trimmed = language == null ? "" : language.trim();
            if (trimmed.isEmpty() || trimmed.length() > 30) {
                throw new IllegalArgumentException(
                        "Chaque langage doit contenir entre 1 et 30 caractères"
                );
            }

            String normalized = trimmed.toLowerCase(Locale.ROOT);
            if (!unique.add(normalized)) {
                throw new IllegalArgumentException(
                        "Les langages ne doivent pas être dupliqués"
                );
            }
            result.add(trimmed);
        }

        return result;
    }

    private DeveloperProfileResponse toResponse(DeveloperProfile profile) {
        return new DeveloperProfileResponse(
                profile.getUser().getFirstName(),
                profile.getUser().getLastName(),
                profile.getTitle(),
                profile.getLocation(),
                profile.getBio(),
                new ArrayList<>(profile.getLanguages())
        );
    }
}
