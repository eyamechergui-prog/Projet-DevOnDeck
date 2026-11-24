package com.devondeck.backend.repository;

import com.devondeck.backend.entity.Candidature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CandidatureRepository extends JpaRepository<Candidature, Long> {

    // true si ce développeur a déjà postulé à cette offre
    boolean existsByDeveloppeurIdAndOffreId(Long developpeurId, Long offreId);

    // les ids des offres auxquelles ce développeur a déjà postulé
    @Query("select c.offre.id from Candidature c where c.developpeur.id = :developpeurId")
    List<Long> findOffreIdsByDeveloppeurId(@Param("developpeurId") Long developpeurId);

    // supprime toutes les candidatures d'une offre (utilisé par US-11)
    void deleteByOffreId(Long offreId);
}
