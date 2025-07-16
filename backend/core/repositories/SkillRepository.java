package core.repositories;

import core.entities.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for Skill entity
 * Spring Data JPA automatically implements these methods
 * Provides data access layer for skill-related database operations
 * 
 * @author alexjordan98
 * @version 0.0.1
 * @since 07-15-2025
 */
@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {
    
    // Custom query methods (Spring Data JPA auto-implements these)
    
    /**
     * Find skills by category (exact match)
     * 
     * @param category The category to search for
     * @return List of skills in the specified category
     */
    List<Skill> findByCategory(String category);
    
    /**
     * Find skills by category (case insensitive match)
     * 
     * @param category The category to search for (case insensitive)
     * @return List of skills in the specified category
     */
    List<Skill> findByCategoryIgnoreCase(String category);
    
    /**
     * Find skills with proficiency level greater than or equal to specified level
     * Useful for filtering skills by minimum proficiency
     * 
     * @param proficiencyLevel Minimum proficiency level (1-5)
     * @return List of skills meeting the proficiency requirement
     */
    List<Skill> findByProficiencyLevelGreaterThanEqual(Integer proficiencyLevel);
    
    /**
     * Find skills by name containing text (case insensitive partial match)
     * Enables search functionality across skill names
     * 
     * @param name Search term to match against skill names
     * @return List of skills whose names contain the search term
     */
    List<Skill> findByNameContainingIgnoreCase(String name);
    
    /**
     * Find skills by years of experience greater than specified value
     * Useful for filtering experienced skills
     * 
     * @param years Minimum years of experience threshold
     * @return List of skills with more than the specified years of experience
     */
    List<Skill> findByYearsExperienceGreaterThan(Integer years);
    
    /**
     * Find all skills ordered by proficiency level (descending) then by name (ascending)
     * Provides a comprehensive sorted view of all skills
     * 
     * @return List of all skills sorted by proficiency level and name
     */
    List<Skill> findAllByOrderByProficiencyLevelDescNameAsc();
    
    /**
     * Find skills by category ordered by proficiency level (descending)
     * Useful for displaying skills within a specific category by expertise
     * 
     * @param category The category to filter by
     * @return List of skills in the category ordered by proficiency level
     */
    List<Skill> findByCategoryOrderByProficiencyLevelDesc(String category);
    
    /**
     * Check if skill exists by name (case insensitive)
     * Used for duplicate validation during skill creation
     * 
     * @param name The skill name to check for existence
     * @return true if a skill with the name exists, false otherwise
     */
    boolean existsByNameIgnoreCase(String name);
    
    /**
     * Find skill by name (case insensitive exact match)
     * 
     * @param name The exact skill name to search for
     * @return Optional containing the skill if found, empty otherwise
     */
    Optional<Skill> findByNameIgnoreCase(String name);
    
    /**
     * Custom JPQL query to find skills for bubble visualization
     * Returns skills with their essential properties for frontend physics display
     * 
     * @param minLevel Minimum proficiency level for bubble display
     * @return List of skills suitable for bubble visualization
     */
    @Query("SELECT s FROM Skill s WHERE s.proficiencyLevel >= :minLevel ORDER BY s.category, s.proficiencyLevel DESC")
    List<Skill> findSkillsForBubbleDisplay(@Param("minLevel") Integer minLevel);
    
    /**
     * Get all distinct skill categories sorted alphabetically
     * Used for category filters and navigation
     * 
     * @return List of unique category names in alphabetical order
     */
    @Query("SELECT DISTINCT s.category FROM Skill s ORDER BY s.category")
    List<String> findDistinctCategories();
    
    /**
     * Count skills grouped by category
     * Provides statistical data for dashboard and analytics
     * 
     * @return List of Object arrays containing [category_name, skill_count]
     */
    @Query("SELECT s.category, COUNT(s) FROM Skill s GROUP BY s.category")
    List<Object[]> countSkillsByCategory();
    
    /**
     * Find top N skills by proficiency level and years of experience
     * Uses native SQL for performance with LIMIT clause
     * 
     * @param limit Maximum number of top skills to return
     * @return List of top skills ordered by proficiency and experience
     */
    @Query(value = "SELECT * FROM skills ORDER BY proficiency_level DESC, years_experience DESC LIMIT :limit", 
           nativeQuery = true)
    List<Skill> findTopSkillsByProficiency(@Param("limit") Integer limit);
}