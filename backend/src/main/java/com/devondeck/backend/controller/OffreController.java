package com.devondeck.backend.controller;

import com.devondeck.backend.dto.OffreRequest;
import com.devondeck.backend.entity.Offre;
import com.devondeck.backend.service.OffreService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// @RestController : cette classe reçoit les requêtes HTTP et répond en JSON
@RestController
// Les routes commencent par /api/organisation : SecurityConfig les réserve
// automatiquement au rôle ORGANISATION. Le CORS (port 5173) est déjà réglé dans SecurityConfig.
@RequestMapping("/api/organisation/offres")
public class OffreController {

    private final OffreService offreService;

    public OffreController(OffreService offreService) {
        this.offreService = offreService;
    }

    // US-09 : POST /api/organisation/offres
    // Authentication : contient l'utilisateur connecté, lu dans le token JWT
    // authentication.getName() = l'email de l'organisation (le "subject" du token)
    // @RequestBody : les données JSON du formulaire sont transformées en OffreRequest
    @PostMapping
    public ResponseEntity<?> publierOffre(@RequestBody OffreRequest request, Authentication authentication) {
        try {
            Offre offre = offreService.publierOffre(request, authentication.getName());
            // 201 = créé avec succès
            return ResponseEntity.status(HttpStatus.CREATED).body(offre);
        } catch (RuntimeException e) {
            // 400 = erreur, on renvoie le message (ex : "Le titre est obligatoire")
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // US-10 : GET /api/organisation/offres
    @GetMapping
    public List<Offre> getMesOffres(Authentication authentication) {
        return offreService.getOffresOrganisation(authentication.getName());
    }
}
