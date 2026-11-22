package com.devondeck.backend.controller;

import com.devondeck.backend.dto.DeveloperProfileRequest;
import com.devondeck.backend.dto.DeveloperProfileResponse;
import com.devondeck.backend.service.DeveloperProfileService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/developpeur/me/profile")
public class DeveloperProfileController {

    private final DeveloperProfileService profileService;

    public DeveloperProfileController(
            DeveloperProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping
    public DeveloperProfileResponse getProfile(
            @AuthenticationPrincipal Jwt jwt) {
        return profileService.getProfile(jwt);
    }

    @PutMapping
    public DeveloperProfileResponse updateProfile(
            @AuthenticationPrincipal Jwt jwt,
            @RequestBody DeveloperProfileRequest request) {
        if (request == null) {
            throw new IllegalArgumentException(
                    "Les données du profil sont obligatoires"
            );
        }
        return profileService.updateProfile(jwt, request);
    }
}
