package com.devondeck.backend.dto;

import java.util.List;

public class DeveloperProfileResponse {

    private final String firstName;
    private final String lastName;
    private final String title;
    private final String location;
    private final String bio;
    private final List<String> languages;

    public DeveloperProfileResponse(
            String firstName,
            String lastName,
            String title,
            String location,
            String bio,
            List<String> languages) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.title = title;
        this.location = location;
        this.bio = bio;
        this.languages = languages;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getTitle() {
        return title;
    }

    public String getLocation() {
        return location;
    }

    public String getBio() {
        return bio;
    }

    public List<String> getLanguages() {
        return languages;
    }
}
