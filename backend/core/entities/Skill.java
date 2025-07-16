package core.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

/**
 * JPA Entity representing a skill in alexjordan98's portfolio
 * This entity will generate the 'skills' table in PostgreSQL database
 * Contains all skill-related information including proficiency, experience, and UI properties
 * 
 * @author alexjordan98
 * @version 0.0.1
 * @since 07-15-2025
 */
@Entity
@Table(name = "skills", indexes = {
    @Index(name = "idx_skill_category", columnList = "category"),
    @Index(name = "idx_skill_proficiency", columnList = "proficiency_level")
})
public class Skill {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "name", nullable = false, unique = true, length = 100)
    @NotBlank(message = "Skill name is required")
    @Size(max = 100, message = "Skill name must be less than 100 characters")
    private String name;
    
    @Column(name = "category", nullable = false, length = 50)
    @NotBlank(message = "Category is required")
    @Size(max = 50, message = "Category must be less than 50 characters")
    private String category; // e.g., "Backend", "Frontend", "Database", "Cloud"
    
    @Column(name = "proficiency_level")
    @Min(value = 1, message = "Proficiency level must be at least 1")
    @Max(value = 5, message = "Proficiency level must be at most 5")
    private Integer proficiencyLevel; // 1-5 scale
    
    @Column(name = "years_experience")
    @Min(value = 0, message = "Years of experience cannot be negative")
    private Integer yearsExperience;
    
    @Column(name = "description", columnDefinition = "TEXT")
    @Size(max = 1000, message = "Description must be less than 1000 characters")
    private String description;
    
    @Column(name = "icon_url")
    @Size(max = 255, message = "Icon URL must be less than 255 characters")
    private String iconUrl; // URL to skill icon/logo
    
    @Column(name = "color_hex", length = 7)
    @Pattern(regexp = "^#[0-9A-Fa-f]{6}$", message = "Color must be a valid hex color code")
    private String colorHex; // For bubble colors in UI
    
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
    
    // Constructors
    public Skill() {}
    
    public Skill(String name, String category, Integer proficiencyLevel, 
                 Integer yearsExperience, String description, String iconUrl, String colorHex) {
        this.name = name;
        this.category = category;
        this.proficiencyLevel = proficiencyLevel;
        this.yearsExperience = yearsExperience;
        this.description = description;
        this.iconUrl = iconUrl;
        this.colorHex = colorHex;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getCategory() {
        return category;
    }
    
    public void setCategory(String category) {
        this.category = category;
    }
    
    public Integer getProficiencyLevel() {
        return proficiencyLevel;
    }
    
    public void setProficiencyLevel(Integer proficiencyLevel) {
        this.proficiencyLevel = proficiencyLevel;
    }
    
    public Integer getYearsExperience() {
        return yearsExperience;
    }
    
    public void setYearsExperience(Integer yearsExperience) {
        this.yearsExperience = yearsExperience;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getIconUrl() {
        return iconUrl;
    }
    
    public void setIconUrl(String iconUrl) {
        this.iconUrl = iconUrl;
    }
    
    public String getColorHex() {
        return colorHex;
    }
    
    public void setColorHex(String colorHex) {
        this.colorHex = colorHex;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    // toString method for debugging
    @Override
    public String toString() {
        return "Skill{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", category='" + category + '\'' +
                ", proficiencyLevel=" + proficiencyLevel +
                ", yearsExperience=" + yearsExperience +
                ", description='" + description + '\'' +
                ", iconUrl='" + iconUrl + '\'' +
                ", colorHex='" + colorHex + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
    
    // equals and hashCode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        
        Skill skill = (Skill) o;
        return id != null ? id.equals(skill.id) : skill.id == null;
    }
    
    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }
}