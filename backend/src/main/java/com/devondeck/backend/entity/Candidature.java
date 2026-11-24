package com.devondeck.backend.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

// @Entity : cette classe devient la table "candidatures" dans PostgreSQL
// Un développeur ne peut postuler qu'une seule fois à la même offre (contrainte unique)
@Entity
@Table(
        name = "candidatures",
        uniqueConstraints = @UniqueConstraint(
                name = "uk_candidature_developpeur_offre",
                columnNames = {"developpeur_id", "offre_id"}
        )
)
public class Candidature {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // le développeur (utilisateur de rôle DEVELOPPEUR) qui postule
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "developpeur_id", nullable = false)
    private User developpeur;

    // l'offre à laquelle il postule
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "offre_id", nullable = false)
    private Offre offre;

    @Column(nullable = false)
    private LocalDate datePostulation;

    // statut de la candidature : "EN_ATTENTE" à la création
    @Column(nullable = false, length = 30)
    private String statut = "EN_ATTENTE";

    public Candidature() {
    }

    public Candidature(User developpeur, Offre offre) {
        this.developpeur = developpeur;
        this.offre = offre;
        this.datePostulation = LocalDate.now();
    }

    public Long getId() {
        return id;
    }

    public User getDeveloppeur() {
        return developpeur;
    }

    public Offre getOffre() {
        return offre;
    }

    public LocalDate getDatePostulation() {
        return datePostulation;
    }

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }
}
