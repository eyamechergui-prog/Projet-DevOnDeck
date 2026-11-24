package com.devondeck.backend.dto;

import java.time.LocalDate;

public record CandidatureResponse(
        Long id,
        Long offreId,
        LocalDate datePostulation,
        String statut
) {
}
