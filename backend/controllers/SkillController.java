package controllers;

import core.entities.Skill;
import services.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * REST Controller for Skill entity
 * Provides HTTP endpoints for skill-related operations
 * Designed to be consumed by Next.js frontend for portfolio website
 * 
 * @author George Jordan
 * @version 1.0
 * @since 2024-12-15
 */
@RestController
@RequestMapping("/api/skills")
@CrossOrigin(origins = {"http://localhost:3000", "https://your-frontend-domain.vercel.app"})
public class SkillController {
    
    private final SkillService skillService;
    
    @Autowired
    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }
    
    /**
     * Get all skills
     * 
     * @return ResponseEntity containing list of all skills
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllSkills() {
        try {
            List<Skill> skills = skillService.getAllSkills();
            Map<String, Object> response = createSuccessResponse(skills, skills.size());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return createErrorResponse("Failed to retrieve skills", e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * Get skill by ID
     * 
     * @param id The skill ID to retrieve
     * @return ResponseEntity containing the skill if found, 404 if not found
     */
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getSkillById(@PathVariable Long id) {
        try {
            Optional<Skill> skill = skillService.getSkillById(id);
            if (skill.isPresent()) {
                Map<String, Object> response = createSuccessResponse(skill.get(), 1);
                return ResponseEntity.ok(response);
            } else {
                return createErrorResponse("Skill not found", "No skill found with ID: " + id, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return createErrorResponse("Failed to retrieve skill", e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * Get skills by category
     * 
     * @param category The category to filter by
     * @return ResponseEntity containing list of skills in the category
     */
    @GetMapping("/category/{category}")
    public ResponseEntity<Map<String, Object>> getSkillsByCategory(@PathVariable String category) {
        try {
            List<Skill> skills = skillService.getSkillsByCategory(category);
            Map<String, Object> response = createSuccessResponse(skills, skills.size());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return createErrorResponse("Failed to retrieve skills by category", e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * Get skills for bubble display (frontend physics component)
     * 
     * @param minProficiency Minimum proficiency level (optional, defaults to 1)
     * @return ResponseEntity containing skills suitable for bubble visualization
     */
    @GetMapping("/bubbles")
    public ResponseEntity<Map<String, Object>> getSkillsForBubbles(
            @RequestParam(required = false, defaultValue = "1") Integer minProficiency) {
        try {
            List<Skill> skills = skillService.getSkillsForBubbleDisplay(minProficiency);
            Map<String, Object> response = createSuccessResponse(skills, skills.size());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return createErrorResponse("Failed to retrieve bubble skills", e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * Get skills ordered by proficiency level
     * 
     * @return ResponseEntity containing skills sorted by proficiency and name
     */
    @GetMapping("/ordered")
    public ResponseEntity<Map<String, Object>> getSkillsOrderedByProficiency() {
        try {
            List<Skill> skills = skillService.getSkillsOrderedByProficiency();
            Map<String, Object> response = createSuccessResponse(skills, skills.size());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return createErrorResponse("Failed to retrieve ordered skills", e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * Get all distinct skill categories
     * 
     * @return ResponseEntity containing list of unique categories
     */
    @GetMapping("/categories")
    public ResponseEntity<Map<String, Object>> getAllCategories() {
        try {
            List<String> categories = skillService.getAllCategories();
            Map<String, Object> response = createSuccessResponse(categories, categories.size());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return createErrorResponse("Failed to retrieve categories", e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * Get top N skills by proficiency
     * 
     * @param limit Maximum number of skills to return (optional, defaults to 10)
     * @return ResponseEntity containing top skills
     */
    @GetMapping("/top")
    public ResponseEntity<Map<String, Object>> getTopSkills(
            @RequestParam(required = false, defaultValue = "10") Integer limit) {
        try {
            List<Skill> skills = skillService.getTopSkills(limit);
            Map<String, Object> response = createSuccessResponse(skills, skills.size());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return createErrorResponse("Failed to retrieve top skills", e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * Search skills by name
     * 
     * @param name Search term for skill names
     * @return ResponseEntity containing matching skills
     */
    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchSkills(@RequestParam String name) {
        try {
            List<Skill> skills = skillService.searchSkillsByName(name);
            Map<String, Object> response = createSuccessResponse(skills, skills.size());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return createErrorResponse("Failed to search skills", e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * Get skill statistics grouped by category
     * 
     * @return ResponseEntity containing category statistics
     */
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getSkillStats() {
        try {
            List<Object[]> stats = skillService.getSkillStatsByCategory();
            Map<String, Object> response = createSuccessResponse(stats, stats.size());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return createErrorResponse("Failed to retrieve skill statistics", e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * Create a new skill (Admin endpoint)
     * 
     * @param skill The skill object to create
     * @return ResponseEntity containing the created skill
     */
    @PostMapping
    public ResponseEntity<Map<String, Object>> createSkill(@Valid @RequestBody Skill skill) {
        try {
            Skill createdSkill = skillService.createSkill(skill);
            Map<String, Object> response = createSuccessResponse(createdSkill, 1);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (IllegalArgumentException e) {
            return createErrorResponse("Invalid skill data", e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return createErrorResponse("Failed to create skill", e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * Update an existing skill (Admin endpoint)
     * 
     * @param id The ID of the skill to update
     * @param skill The updated skill data
     * @return ResponseEntity containing the updated skill
     */
    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateSkill(@PathVariable Long id, @Valid @RequestBody Skill skill) {
        try {
            Skill updatedSkill = skillService.updateSkill(id, skill);
            Map<String, Object> response = createSuccessResponse(updatedSkill, 1);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return createErrorResponse("Invalid skill data or ID", e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return createErrorResponse("Failed to update skill", e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * Delete a skill (Admin endpoint)
     * 
     * @param id The ID of the skill to delete
     * @return ResponseEntity confirming deletion
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteSkill(@PathVariable Long id) {
        try {
            skillService.deleteSkill(id);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Skill deleted successfully");
            response.put("deletedId", id);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return createErrorResponse("Skill not found", e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return createErrorResponse("Failed to delete skill", e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * Check if skill exists by ID
     * 
     * @param id The skill ID to check
     * @return ResponseEntity containing existence status
     */
    @GetMapping("/{id}/exists")
    public ResponseEntity<Map<String, Object>> skillExists(@PathVariable Long id) {
        try {
            boolean exists = skillService.skillExists(id);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("exists", exists);
            response.put("skillId", id);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return createErrorResponse("Failed to check skill existence", e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * Health check endpoint
     * 
     * @return ResponseEntity confirming API is operational
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("status", "healthy");
        response.put("service", "Skills API");
        response.put("timestamp", System.currentTimeMillis());
        return ResponseEntity.ok(response);
    }
    
    /**
     * Create standardized success response format
     * 
     * @param data The data to include in response
     * @param count Number of items returned
     * @return Map containing standardized success response
     */
    private Map<String, Object> createSuccessResponse(Object data, int count) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", data);
        response.put("count", count);
        response.put("timestamp", System.currentTimeMillis());
        return response;
    }
    
    /**
     * Create standardized error response format
     * 
     * @param error Main error message
     * @param details Detailed error information
     * @param status HTTP status for the error
     * @return ResponseEntity containing standardized error response
     */
    private ResponseEntity<Map<String, Object>> createErrorResponse(String error, String details, HttpStatus status) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        response.put("error", error);
        response.put("details", details);
        response.put("timestamp", System.currentTimeMillis());
        return ResponseEntity.status(status).body(response);
    }
}