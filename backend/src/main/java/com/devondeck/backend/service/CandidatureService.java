package com.devondeck.backend.service;

import com.devondeck.backend.dto.CandidatureResponse;
import com.devondeck.backend.dto.OffreDeveloppeurResponse;
import com.devondeck.backend.entity.Candidature;
import com.devondeck.backend.entity.Offre;
import com.devondeck.backend.entity.User;
import com.devondeck.backend.repository.CandidatureRepository;
import com.devondeck.backend.repository.OffreRepository;
import com.devondeck.backend.repository.UserRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

// US-12 : un développeur consulte les offres et postule
@Service
public class CandidatureService {

    private final CandidatureRepository candidatureRepository;
    private final OffreRepository offreRepository;
    private final UserRepository userRepository;

    public CandidatureService(CandidatureRepository candidatureRepository,
                              OffreRepository offreRepository,
                              UserRepository userRepository) {
        this.candidatureRepository = candidatureRepository;
        this.offreRepository = offreRepository;
        this.userRepository = userRepository;
    }

    // US-12 : toutes les offres, de la plus récente à la plus ancienne
    @Transactional(readOnly = true)
    public List<OffreDeveloppeurResponse> getOffresDisponibles(String emailDeveloppeur) {

        User developpeur = trouverDeveloppeur(emailDeveloppeur);

        // offres auxquelles le développeur a déjà postulé
        Set<Long> dejaPostule = new HashSet<>(
                candidatureRepository.findOffreIdsByDeveloppeurId(developpeur.getId())
        );

        List<OffreDeveloppeurResponse> resultat = new ArrayList<>();
        for (Offre offre : offreRepository.findAll(Sort.by(Sort.Direction.DESC, "id"))) {
            resultat.add(new OffreDeveloppeurResponse(
                    offre.getId(),
                    offre.getTitre(),
                    offre.getDescription(),
                    offre.getCompetences() == null
                            ? new ArrayList<>()
                            : new ArrayList<>(offre.getCompetences()),
                    offre.getDatePublication(),
                    nomOrganisation(offre.getOrganisation()),
                    dejaPostule.contains(offre.getId())
            ));
        }
        return resultat;
    }

    // US-12 : postuler à une offre
    @Transactional
    public CandidatureResponse postuler(Long offreId, String emailDeveloppeur) {

        User developpeur = trouverDeveloppeur(emailDeveloppeur);

        Offre offre = offreRepository.findById(offreId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Offre introuvable"));

        if (candidatureRepository.existsByDeveloppeurIdAndOffreId(developpeur.getId(), offreId)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT, "Vous avez déjà postulé à cette offre");
        }

        try {
            // saveAndFlush : la contrainte unique est vérifiée tout de suite
            // (cas où le développeur clique deux fois très vite)
            Candidature candidature = candidatureRepository.saveAndFlush(
                    new Candidature(developpeur, offre));

            return new CandidatureResponse(
                    candidature.getId(),
                    offre.getId(),
                    candidature.getDatePostulation(),
                    candidature.getStatut()
            );
        } catch (DataIntegrityViolationException e) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT, "Vous avez déjà postulé à cette offre");
        }
    }

    private User trouverDeveloppeur(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED, "Utilisateur introuvable"));
    }

    private String nomOrganisation(User organisation) {
        return (organisation.getFirstName() + " " + organisation.getLastName()).trim();
    }
}
