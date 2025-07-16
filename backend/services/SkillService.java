package services;

import core.entities.Skill;
import core.repositories.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service layer for Skill entity
 * Contains business logic and orchestrates repository calls
 * 
 * @author alexjordan98
 * @version 0.0.1
 * @since 07-15-2025
 */
@Service
@Transactional
public class SkillService {
    
    private final SkillRepository skillRepository;
    
    @Autowired
    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }
    
    /**
     * Get all skills from the database
     * 
     * @return List of all skills
     */
    @Transactional(readOnly = true)
    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }
    
    /**
     * Get skill by ID
     * 
     * @param id The skill ID to search for
     * @return Optional containing the skill if found, empty otherwise
     */
    @Transactional(readOnly = true)
    public Optional<Skill> getSkillById(Long id) {
        return skillRepository.findById(id);
    }
    
    /**
     * Get skills by category (case insensitive)
     * 
     * @param category The category to filter by
     * @return List of skills in the specified category
     */
    @Transactional(readOnly = true)
    public List<Skill> getSkillsByCategory(String category) {
        return skillRepository.findByCategoryIgnoreCase(category);
    }
    
    /**
     * Get skills for bubble display with minimum proficiency level
     * Used by the frontend physics bubble component
     * 
     * @param minProficiency Minimum proficiency level (1-5), defaults to 1 if null
     * @return List of skills meeting the proficiency requirement
     */
    @Transactional(readOnly = true)
    public List<Skill> getSkillsForBubbleDisplay(Integer minProficiency) {
        if (minProficiency == null) {
            minProficiency = 1; // Default minimum proficiency
        }
        return skillRepository.findSkillsForBubbleDisplay(minProficiency);
    }
    
    /**
     * Get all skills ordered by proficiency level (descending) then by name (ascending)
     * 
     * @return List of skills sorted by proficiency and name
     */
    @Transactional(readOnly = true)
    public List<Skill> getSkillsOrderedByProficiency() {
        return skillRepository.findAllByOrderByProficiencyLevelDescNameAsc();
    }
    
    /**
     * Get all distinct skill categories
     * 
     * @return List of unique category names
     */
    @Transactional(readOnly = true)
    public List<String> getAllCategories() {
        return skillRepository.findDistinctCategories();
    }
    
    /**
     * Get top N skills by proficiency level and years of experience
     * 
     * @param limit Maximum number of skills to return, defaults to 10 if null or invalid
     * @return List of top skills ordered by proficiency and experience
     */
    @Transactional(readOnly = true)
    public List<Skill> getTopSkills(Integer limit) {
        if (limit == null || limit <= 0) {
            limit = 10; // Default limit
        }
        return skillRepository.findTopSkillsByProficiency(limit);
    }
    
    /**
     * Search skills by name (case insensitive partial match)
     * 
     * @param name Search term to match against skill names
     * @return List of skills containing the search term, or all skills if name is empty
     */
    @Transactional(readOnly = true)
    public List<Skill> searchSkillsByName(String name) {
        if (name == null || name.trim().isEmpty()) {
            return getAllSkills();
        }
        return skillRepository.findByNameContainingIgnoreCase(name.trim());
    }
    
    /**
     * Create a new skill with validation and duplicate checking
     * 
     * @param skill The skill object to create
     * @return The created skill with generated ID and timestamps
     * @throws IllegalArgumentException if skill data is invalid or name already exists
     */
    public Skill createSkill(Skill skill) {
        // Business logic validation
        validateSkill(skill);
        
        // Check if skill already exists
        if (skillRepository.existsByNameIgnoreCase(skill.getName())) {
            throw new IllegalArgumentException("Skill with name '" + skill.getName() + "' already exists");
        }
        
        return skillRepository.save(skill);
    }
    
    /**
     * Update an existing skill with validation
     * 
     * @param id The ID of the skill to update
     * @param updatedSkill The skill object containing updated data
     * @return The updated skill entity
     * @throws IllegalArgumentException if skill ID not found or data is invalid
     */
    public Skill updateSkill(Long id, Skill updatedSkill) {
        Optional<Skill> existingSkill = skillRepository.findById(id);
        
        if (existingSkill.isEmpty()) {
            throw new IllegalArgumentException("Skill with ID " + id + " not found");
        }
        
        validateSkill(updatedSkill);
        
        Skill skill = existingSkill.get();
        skill.setName(updatedSkill.getName());
        skill.setCategory(updatedSkill.getCategory());
        skill.setProficiencyLevel(updatedSkill.getProficiencyLevel());
        skill.setYearsExperience(updatedSkill.getYearsExperience());
        skill.setDescription(updatedSkill.getDescription());
        skill.setIconUrl(updatedSkill.getIconUrl());
        skill.setColorHex(updatedSkill.getColorHex());
        
        return skillRepository.save(skill);
    }
    
    /**
     * Delete a skill by ID
     * 
     * @param id The ID of the skill to delete
     * @throws IllegalArgumentException if skill ID not found
     */
    public void deleteSkill(Long id) {
        if (!skillRepository.existsById(id)) {
            throw new IllegalArgumentException("Skill with ID " + id + " not found");
        }
        skillRepository.deleteById(id);
    }
    
    /**
     * Check if a skill exists by ID
     * 
     * @param id The skill ID to check
     * @return true if skill exists, false otherwise
     */
    @Transactional(readOnly = true)
    public boolean skillExists(Long id) {
        return skillRepository.existsById(id);
    }
    
    /**
     * Check if a skill exists by name (case insensitive)
     * 
     * @param name The skill name to check
     * @return true if skill with name exists, false otherwise
     */
    @Transactional(readOnly = true)
    public boolean skillExistsByName(String name) {
        return skillRepository.existsByNameIgnoreCase(name);
    }
    
    /**
     * Get skill statistics grouped by category
     * 
     * @return List of Object arrays containing [category_name, count]
     */
    @Transactional(readOnly = true)
    public List<Object[]> getSkillStatsByCategory() {
        return skillRepository.countSkillsByCategory();
    }
    
    /**
     * Private method to validate skill data before database operations
     * 
     * @param skill The skill to validate
     * @throws IllegalArgumentException if any validation rules are violated
     */
    private void validateSkill(Skill skill) {
        if (skill.getName() == null || skill.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Skill name is required");
        }
        
        if (skill.getCategory() == null || skill.getCategory().trim().isEmpty()) {
            throw new IllegalArgumentException("Skill category is required");
        }
        
        if (skill.getProficiencyLevel() != null && 
            (skill.getProficiencyLevel() < 1 || skill.getProficiencyLevel() > 5)) {
            throw new IllegalArgumentException("Proficiency level must be between 1 and 5");
        }
        
        if (skill.getYearsExperience() != null && skill.getYearsExperience() < 0) {
            throw new IllegalArgumentException("Years of experience cannot be negative");
        }
        
        if (skill.getColorHex() != null && !skill.getColorHex().matches("^#[0-9A-Fa-f]{6}$")) {
            throw new IllegalArgumentException("Color must be a valid hex color code");
        }
    }
}