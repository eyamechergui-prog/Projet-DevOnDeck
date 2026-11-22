package com.devondeck.backend.dto;

import jakarta.validation.constraints.Size;

import java.util.List;

public class SkillsRequest {

    @Size(max = 30, message = "Maximum 30 compétences")
    private List<String> skills;

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }
}
