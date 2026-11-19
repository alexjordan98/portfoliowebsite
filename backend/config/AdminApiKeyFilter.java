package config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Set;

/**
 * Protects write operations on the skills API with a shared admin key.
 * <p>
 * {@code POST}, {@code PUT} and {@code DELETE} requests to {@code /skills} and
 * {@code /skills/**} must send an {@code X-Admin-Key} header equal to the
 * {@code ADMIN_API_KEY} environment variable, compared in constant time.
 * If {@code ADMIN_API_KEY} is unset or blank, every such write is rejected.
 * All other methods (including {@code GET} and {@code OPTIONS}) and all other
 * paths pass through unchanged. Runs immediately after {@link CorsFilter}, so
 * rejected responses still carry CORS headers.
 *
 * @author George Jordan
 * @version 1.0
 * @since 2026-11-19
 */
@Component
@Order(Ordered.HIGHEST_PRECEDENCE + 1)
public class AdminApiKeyFilter extends OncePerRequestFilter {

    /** Request header that carries the admin key. */
    public static final String HEADER_NAME = "X-Admin-Key";

    private static final Set<String> PROTECTED_METHODS = Set.of("POST", "PUT", "DELETE");

    private final byte[] expectedKey;

    /**
     * Creates the filter using the {@code ADMIN_API_KEY} environment variable.
     */
    public AdminApiKeyFilter() {
        this(System.getenv("ADMIN_API_KEY"));
    }

    /**
     * Creates the filter with an explicit admin key.
     *
     * @param adminApiKey the expected key, or {@code null}/blank to reject all writes
     */
    AdminApiKeyFilter(String adminApiKey) {
        this.expectedKey = (adminApiKey == null || adminApiKey.isBlank())
                ? null
                : adminApiKey.getBytes(StandardCharsets.UTF_8);
    }

    /**
     * Skips requests that are not writes to the skills API.
     *
     * @param request the current request
     * @return {@code true} when the request does not need an admin key
     */
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI().substring(request.getContextPath().length());
        boolean skillsPath = path.equals("/skills") || path.startsWith("/skills/");
        return !(skillsPath && PROTECTED_METHODS.contains(request.getMethod().toUpperCase()));
    }

    /**
     * Rejects the request with 403 unless it carries a valid admin key.
     *
     * @param request the current request
     * @param response the current response
     * @param chain the filter chain
     * @throws IOException if an I/O error occurs
     * @throws ServletException if a servlet error occurs
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        if (!isAuthorized(request.getHeader(HEADER_NAME))) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.setContentType("application/json");
            response.getWriter().write("{\"success\":false,\"error\":\"Forbidden\"}");
            return;
        }
        chain.doFilter(request, response);
    }

    /**
     * Compares a supplied key against the configured key in constant time.
     *
     * @param providedKey the key from the request header, may be {@code null}
     * @return {@code true} only when a key is configured and matches exactly
     */
    boolean isAuthorized(String providedKey) {
        if (expectedKey == null || providedKey == null) {
            return false;
        }
        return MessageDigest.isEqual(expectedKey, providedKey.getBytes(StandardCharsets.UTF_8));
    }
}
