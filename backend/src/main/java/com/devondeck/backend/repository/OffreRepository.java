package com.devondeck.backend.repository;

import com.devondeck.backend.entity.Offre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// JpaRepository<Offre, Long> : Offre = la table, Long = le type de l'id
public interface OffreRepository extends JpaRepository<Offre, Long> {

    // retourne toutes les offres d'une organisation
    // (Spring comprend : chercher les offres où organisation.id = organisationId)
    List<Offre> findByOrganisationId(Long organisationId);
}