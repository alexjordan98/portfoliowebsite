package controllers;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import core.entities.Skill;
import services.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Controller to populate the skills database with comprehensive data
 * This will load skills from the JSON file and save them to the database
 * 
 * @author George Jordan
 * @version 1.0
 * @since 2025-07-17
 */
@RestController
@RequestMapping("/api/admin")
public class SkillsDataPopulator {
    
    @Autowired
    private SkillService skillService;
    
    private final ObjectMapper objectMapper = new ObjectMapper();
    
    @PostMapping("/populate-skills")
    public Map<String, Object> populateSkills() {
        Map<String, Object> result = new HashMap<>();
        
        try {
            // Load JSON file from resources
            InputStream inputStream = getClass().getClassLoader()
                .getResourceAsStream("skills-data.json");
            
            if (inputStream == null) {
                result.put("success", false);
                result.put("error", "skills-data.json file not found in resources");
                return result;
            }
            
            // Parse JSON structure
            Map<String, Object> jsonData = objectMapper.readValue(inputStream, 
                new TypeReference<Map<String, Object>>() {});
            
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> skillsData = (List<Map<String, Object>>) jsonData.get("skills");
            
            if (skillsData == null || skillsData.isEmpty()) {
                result.put("success", false);
                result.put("error", "No skills data found in JSON");
                return result;
            }
            
            int successCount = 0;
            int skipCount = 0;
            int errorCount = 0;
            
            // Process each skill
            for (Map<String, Object> skillData : skillsData) {
                try {
                    String skillName = (String) skillData.get("name");
                    
                    // Skip if skill already exists
                    if (skillService.skillExistsByName(skillName)) {
                        skipCount++;
                        continue;
                    }
                    
                    // Create new skill entity
                    Skill skill = new Skill();
                    skill.setName(skillName);
                    skill.setCategory((String) skillData.get("category"));
                    skill.setProficiencyLevel((Integer) skillData.get("proficiencyLevel"));
                    skill.setYearsExperience((Integer) skillData.get("yearsExperience"));
                    skill.setDescription((String) skillData.get("description"));
                    skill.setIconUrl((String) skillData.get("iconUrl"));
                    skill.setColorHex((String) skillData.get("colorHex"));
                    
                    // Save to database
                    skillService.createSkill(skill);
                    successCount++;
                    
                } catch (Exception e) {
                    errorCount++;
                    System.err.println("Error processing skill: " + skillData.get("name") + 
                                     " - " + e.getMessage());
                }
            }
            
            // Prepare response
            result.put("success", true);
            result.put("message", "Skills population completed");
            result.put("totalProcessed", skillsData.size());
            result.put("successfullyAdded", successCount);
            result.put("skipped", skipCount);
            result.put("errors", errorCount);
            result.put("timestamp", System.currentTimeMillis());
            
        } catch (Exception e) {
            result.put("success", false);
            result.put("error", "Failed to populate skills: " + e.getMessage());
            result.put("timestamp", System.currentTimeMillis());
        }
        
        return result;
    }
    
    @PostMapping("/clear-skills")
    public Map<String, Object> clearAllSkills() {
        Map<String, Object> result = new HashMap<>();
        
        try {
            List<Skill> allSkills = skillService.getAllSkills();
            int deleteCount = 0;
            
            for (Skill skill : allSkills) {
                skillService.deleteSkill(skill.getId());
                deleteCount++;
            }
            
            result.put("success", true);
            result.put("message", "All skills cleared from database");
            result.put("deletedCount", deleteCount);
            result.put("timestamp", System.currentTimeMillis());
            
        } catch (Exception e) {
            result.put("success", false);
            result.put("error", "Failed to clear skills: " + e.getMessage());
            result.put("timestamp", System.currentTimeMillis());
        }
        
        return result;
    }
    
    @PostMapping("/reset-and-populate")
    public Map<String, Object> resetAndPopulateSkills() {
        Map<String, Object> result = new HashMap<>();
        
        try {
            // First clear existing data
            Map<String, Object> clearResult = clearAllSkills();
            
            if (!(Boolean) clearResult.get("success")) {
                return clearResult;
            }
            
            // Then populate with new data
            Map<String, Object> populateResult = populateSkills();
            
            result.put("success", populateResult.get("success"));
            result.put("clearResult", clearResult);
            result.put("populateResult", populateResult);
            result.put("timestamp", System.currentTimeMillis());
            
        } catch (Exception e) {
            result.put("success", false);
            result.put("error", "Failed to reset and populate: " + e.getMessage());
            result.put("timestamp", System.currentTimeMillis());
        }
        
        return result;
    }
}