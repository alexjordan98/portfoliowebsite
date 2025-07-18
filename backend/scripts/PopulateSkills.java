package scripts;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

/**
 * Simple script to populate skills database
 * 
 * How to run 
 * Start Spring Boot with - ./gradlew bootRun
 * 
 * In another terminal, run script with -
 * cd backend
 * javac scripts/PopulateSkills.java
 * java scripts.PopulateSkills
 * 
 * @author alexjordan98
 * @version 0.0.1
 * @since 07-15-2025
 */
public class PopulateSkills {
    
    private static final String API_URL = "http://localhost:8080/api/admin/populate-skills";
    
    public static void main(String[] args) {
        System.out.println("🚀 Starting skills population...");
        System.out.println("📡 Calling: " + API_URL);
        
        try {
            // Create HTTP client
            HttpClient client = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(10))
                .build();
            
            // Create POST request
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(API_URL))
                .timeout(Duration.ofSeconds(30))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.noBody())
                .build();
            
            // Send request
            HttpResponse<String> response = client.send(request, 
                HttpResponse.BodyHandlers.ofString());
            
            // Print results
            System.out.println("📊 Response Status: " + response.statusCode());
            System.out.println("📋 Response Body:");
            System.out.println(response.body());
            
            if (response.statusCode() == 200) {
                System.out.println("✅ Skills population completed successfully!");
            } else {
                System.out.println("❌ Error occurred during population");
            }
            
        } catch (IOException e) {
            System.err.println("❌ Network error: " + e.getMessage());
            System.err.println("💡 Make sure Spring Boot is running on localhost:8080");
        } catch (InterruptedException e) {
            System.err.println("❌ Request interrupted: " + e.getMessage());
        } catch (Exception e) {
            System.err.println("❌ Unexpected error: " + e.getMessage());
        }
    }
}