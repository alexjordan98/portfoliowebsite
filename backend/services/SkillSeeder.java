package services;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import core.entities.Skill;
import core.repositories.SkillRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

/**
 * Seeds the skills table from {@code skills-data.json} on application startup.
 * <p>
 * Seeding only happens when the table is empty, so existing data (including
 * skills edited after the initial load) is never overwritten. Replaces the
 * former public {@code /admin/*} population endpoints.
 *
 * @author George Jordan
 * @version 1.0
 * @since 2026-11-19
 */
@Component
public class SkillSeeder implements ApplicationRunner {

    private static final Logger log = LoggerFactory.getLogger(SkillSeeder.class);

    /** Classpath location of the seed data. */
    static final String SEED_RESOURCE = "skills-data.json";

    private final SkillRepository skillRepository;
    private final SkillService skillService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * Creates the seeder.
     *
     * @param skillRepository repository used to check whether the table is empty
     * @param skillService service used to validate and persist each skill
     */
    public SkillSeeder(SkillRepository skillRepository, SkillService skillService) {
        this.skillRepository = skillRepository;
        this.skillService = skillService;
    }

    /**
     * Loads the seed file and inserts its skills if the table is empty.
     *
     * @param args the application arguments (unused)
     * @throws IOException if the seed file cannot be read or parsed
     */
    @Override
    public void run(ApplicationArguments args) throws IOException {
        if (skillRepository.count() > 0) {
            log.info("Skills table already populated; skipping seed");
            return;
        }

        List<Skill> skills = loadSkills();
        int added = 0;
        for (Skill skill : skills) {
            try {
                skillService.createSkill(skill);
                added++;
            } catch (Exception e) {
                log.warn("Failed to seed skill '{}': {}", skill.getName(), e.getMessage());
            }
        }
        log.info("Seeded {} of {} skills from {}", added, skills.size(), SEED_RESOURCE);
    }

    /**
     * Reads and parses {@code skills-data.json} from the classpath.
     *
     * @return the skills described in the file, or an empty list if the file is missing or has no skills
     * @throws IOException if the file cannot be read or parsed
     */
    List<Skill> loadSkills() throws IOException {
        try (InputStream inputStream = getClass().getClassLoader().getResourceAsStream(SEED_RESOURCE)) {
            if (inputStream == null) {
                log.warn("{} not found on classpath; nothing to seed", SEED_RESOURCE);
                return List.of();
            }

            Map<String, List<Map<String, Object>>> jsonData = objectMapper.readValue(inputStream,
                    new TypeReference<Map<String, List<Map<String, Object>>>>() {});
            List<Map<String, Object>> skillsData = jsonData.get("skills");
            if (skillsData == null) {
                return List.of();
            }
            return skillsData.stream().map(SkillSeeder::toSkill).toList();
        }
    }

    /**
     * Maps one JSON skill object to a {@link Skill} entity.
     *
     * @param skillData the parsed JSON object
     * @return a new, unsaved skill
     */
    static Skill toSkill(Map<String, Object> skillData) {
        Skill skill = new Skill();
        skill.setName((String) skillData.get("name"));
        skill.setCategory((String) skillData.get("category"));
        skill.setProficiencyLevel((Integer) skillData.get("proficiencyLevel"));
        skill.setYearsExperience((Integer) skillData.get("yearsExperience"));
        skill.setDescription((String) skillData.get("description"));
        skill.setIconUrl((String) skillData.get("iconUrl"));
        skill.setColorHex((String) skillData.get("colorHex"));
        return skill;
    }
}
