package com.devondeck.backend.dto;

import java.util.List;

// DTO : contient seulement les données envoyées par le formulaire React
// Les noms doivent être les mêmes que ceux envoyés par AjouterOffre.jsx
public class OffreRequest {

    private String titre;
    private String description;
    private List<String> competences;

    public OffreRequest() {
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
}