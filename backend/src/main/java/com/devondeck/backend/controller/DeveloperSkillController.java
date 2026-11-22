package com.devondeck.backend.controller;

import com.devondeck.backend.dto.SkillsRequest;
import com.devondeck.backend.service.DeveloperSkillService;
import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/developpeur/me")
public class DeveloperSkillController {

    private final DeveloperSkillService skillService;

    public DeveloperSkillController(DeveloperSkillService skillService) {
        this.skillService = skillService;
    }

    @GetMapping("/skills")
    public List<String> getSkills(@AuthenticationPrincipal Jwt jwt) {
        return skillService.getSkills(jwt);
    }

    @PutMapping("/skills")
    public List<String> replaceSkills(
            @AuthenticationPrincipal Jwt jwt,
            @Valid @RequestBody SkillsRequest request) {
        return skillService.replaceSkills(jwt, request);
    }
}
