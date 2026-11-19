package config;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Arrays;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * CORS filter to handle cross-origin requests.
 * Processes all requests including OPTIONS preflight requests.
 * <p>
 * Allowed origins are read from the comma-separated {@code ALLOWED_ORIGINS}
 * environment variable. When it is unset or blank, the production
 * {@code jordanthesoftwaredeveloper.com} origins are used.
 * {@code http://localhost:3000} is always allowed for local development.
 *
 * @author George Jordan
 * @version 1.1
 * @since 2025-10-22
 */
@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class CorsFilter implements Filter {

    /** Origin used by the Next.js dev server; always allowed. */
    static final String LOCAL_DEV_ORIGIN = "http://localhost:3000";

    /** Origins used when {@code ALLOWED_ORIGINS} is not set. */
    static final List<String> DEFAULT_ORIGINS = List.of(
            "https://jordanthesoftwaredeveloper.com",
            "https://www.jordanthesoftwaredeveloper.com");

    private final Set<String> allowedOrigins;

    /**
     * Creates the filter using the {@code ALLOWED_ORIGINS} environment variable.
     */
    public CorsFilter() {
        this(System.getenv("ALLOWED_ORIGINS"));
    }

    /**
     * Creates the filter from an explicit comma-separated origin list.
     *
     * @param allowedOriginsCsv comma-separated origins, or {@code null}/blank to use the defaults
     */
    CorsFilter(String allowedOriginsCsv) {
        this.allowedOrigins = parseOrigins(allowedOriginsCsv);
    }

    /**
     * Builds the set of allowed origins from a comma-separated list.
     * Entries are trimmed, trailing slashes are removed and empty entries are ignored.
     * The local development origin is always included.
     *
     * @param csv comma-separated origins, or {@code null}/blank to use the defaults
     * @return the immutable set of allowed origins
     */
    static Set<String> parseOrigins(String csv) {
        Set<String> origins = new LinkedHashSet<>();
        if (csv == null || csv.isBlank()) {
            origins.addAll(DEFAULT_ORIGINS);
        } else {
            origins.addAll(Arrays.stream(csv.split(","))
                    .map(String::trim)
                    .map(o -> o.endsWith("/") ? o.substring(0, o.length() - 1) : o)
                    .filter(o -> !o.isEmpty())
                    .collect(Collectors.toList()));
        }
        origins.add(LOCAL_DEV_ORIGIN);
        return Set.copyOf(origins);
    }

    /**
     * Handles CORS for all requests.
     * Adds CORS headers when the request's {@code Origin} is allowed and
     * answers OPTIONS preflight requests directly with a 200 response.
     *
     * @param req the servlet request
     * @param res the servlet response
     * @param chain the filter chain
     * @throws IOException if an I/O error occurs
     * @throws ServletException if a servlet error occurs
     */
    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        String origin = request.getHeader("Origin");

        if (origin != null && allowedOrigins.contains(origin)) {
            response.setHeader("Access-Control-Allow-Origin", origin);
            response.setHeader("Access-Control-Allow-Credentials", "true");
            response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            response.setHeader("Access-Control-Allow-Headers",
                    "Content-Type, Authorization, X-Requested-With, " + AdminApiKeyFilter.HEADER_NAME);
            response.setHeader("Access-Control-Max-Age", "3600");
            response.addHeader("Vary", "Origin");
        }

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        chain.doFilter(req, res);
    }
}
