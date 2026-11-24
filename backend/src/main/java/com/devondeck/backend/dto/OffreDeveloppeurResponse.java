package com.devondeck.backend.dto;

import java.time.LocalDate;
import java.util.List;

// Offre vue par un développeur (US-12) : on n'envoie jamais les infos sensibles de l'organisation
// "dejaPostule" permet au frontend de désactiver le bouton "Postuler"
public record OffreDeveloppeurResponse(
        Long id,
        String titre,
        String description,
        List<String> competences,
        LocalDate datePublication,
        String organisation,
        boolean dejaPostule
) {
}
