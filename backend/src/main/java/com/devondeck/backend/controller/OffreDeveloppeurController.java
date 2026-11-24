package com.devondeck.backend.controller;

import com.devondeck.backend.dto.CandidatureResponse;
import com.devondeck.backend.dto.OffreDeveloppeurResponse;
import com.devondeck.backend.service.CandidatureService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Les routes /api/developpeur/** sont réservées au rôle DEVELOPPEUR (voir SecurityConfig)
// Les erreurs (404, 409...) sont renvoyées en JSON {"message": "..."} par DeveloperSkillExceptionHandler
@RestController
@RequestMapping("/api/developpeur/offres")
public class OffreDeveloppeurController {

    private final CandidatureService candidatureService;

    public OffreDeveloppeurController(CandidatureService candidatureService) {
        this.candidatureService = candidatureService;
    }

    // US-12 : GET /api/developpeur/offres
    @GetMapping
    public List<OffreDeveloppeurResponse> getOffres(Authentication authentication) {
        return candidatureService.getOffresDisponibles(authentication.getName());
    }

    // US-12 : POST /api/developpeur/offres/{id}/candidatures
    @PostMapping("/{id}/candidatures")
    public ResponseEntity<CandidatureResponse> postuler(
            @PathVariable Long id,
            Authentication authentication) {

        CandidatureResponse candidature =
                candidatureService.postuler(id, authentication.getName());

        // 201 = créé avec succès
        return ResponseEntity.status(HttpStatus.CREATED).body(candidature);
    }
}
