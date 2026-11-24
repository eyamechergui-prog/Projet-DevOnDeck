package com.devondeck.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(
        name = "developer_skills",
        uniqueConstraints = @UniqueConstraint(
                name = "uk_developer_skill_user_name",
                columnNames = {"user_id", "name"}
        )
)
public class DeveloperSkill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 40)
    private String name;

    public DeveloperSkill() {
    }

    public DeveloperSkill(User user, String name) {
        this.user = user;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public String getName() {
        return name;
    }
}
