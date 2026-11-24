package com.devondeck.backend.service;

import com.devondeck.backend.dto.OffreRequest;
import com.devondeck.backend.entity.Offre;
import com.devondeck.backend.entity.User;
import com.devondeck.backend.repository.OffreRepository;
import com.devondeck.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

// @Service : cette classe contient la logique de l'application
@Service
public class OffreService {

    private final OffreRepository offreRepository;
    private final UserRepository userRepository;

    // Spring donne automatiquement les deux repositories (comme dans AuthService)
    public OffreService(OffreRepository offreRepository, UserRepository userRepository) {
        this.offreRepository = offreRepository;
        this.userRepository = userRepository;
    }

    // US-09 : publier une offre
    public Offre publierOffre(OffreRequest request, String emailOrganisation) {

        // vérification des champs
        if (request.getTitre() == null || request.getTitre().isBlank()) {
            throw new RuntimeException("Le titre est obligatoire");
        }
        if (request.getDescription() == null || request.getDescription().isBlank()) {
            throw new RuntimeException("La description est obligatoire");
        }
        if (request.getCompetences() == null || request.getCompetences().isEmpty()) {
            throw new RuntimeException("Il faut ajouter au moins une compétence");
        }

        // on cherche l'utilisateur connecté grâce à son email (qui vient du token JWT)
        User organisation = userRepository.findByEmail(emailOrganisation)
                .orElseThrow(() -> new RuntimeException("Organisation introuvable"));

        // on crée l'offre et on remplit ses champs
        Offre offre = new Offre();
        offre.setTitre(request.getTitre());
        offre.setDescription(request.getDescription());
        offre.setCompetences(request.getCompetences());
        offre.setDatePublication(LocalDate.now()); // date d'aujourd'hui
        offre.setOrganisation(organisation);

        // save : enregistre l'offre dans PostgreSQL
        return offreRepository.save(offre);
    }

    // US-10 : consulter les offres créées par l'organisation connectée
    public List<Offre> getOffresOrganisation(String emailOrganisation) {

        User organisation = userRepository.findByEmail(emailOrganisation)
                .orElseThrow(() -> new RuntimeException("Organisation introuvable"));

        // retourne seulement les offres de cette organisation
        return offreRepository.findByOrganisationId(organisation.getId());
    }
}