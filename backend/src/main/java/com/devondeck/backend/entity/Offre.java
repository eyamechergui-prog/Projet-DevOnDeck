package com.devondeck.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

// @Entity : cette classe devient la table "offres" dans PostgreSQL
@Entity
@Table(name = "offres")
public class Offre {

    // clé primaire, générée automatiquement
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titre;

    // length = 2000 : la description peut contenir jusqu'à 2000 caractères
    @Column(nullable = false, length = 2000)
    private String description;

    // les compétences recherchées pour le poste (liste de textes)
    // @ElementCollection : crée une table à part pour stocker la liste
    @ElementCollection(fetch=FetchType.EAGER)
    private List<String> competences;

    private LocalDate datePublication;

    // l'utilisateur (de rôle ORGANISATION) qui a publié l'offre
    // @JsonIgnore : on n'envoie pas ses infos (mot de passe...) au frontend
    @ManyToOne
    @JoinColumn(name = "organisation_id", nullable = false)
    @JsonIgnore
    private User organisation;

    public Offre() {
    }

    public Long getId() {
        return id;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getCompetences() {
        return competences;
    }

    public void setCompetences(List<String> competences) {
        this.competences = competences;
    }

    public LocalDate getDatePublication() {
        return datePublication;
    }

    public void setDatePublication(LocalDate datePublication) {
        this.datePublication = datePublication;
    }

    public User getOrganisation() {
        return organisation;
    }

    public void setOrganisation(User organisation) {
        this.organisation = organisation;
    }
}
