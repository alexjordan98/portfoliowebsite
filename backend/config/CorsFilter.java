package config;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * CORS filter to handle cross-origin requests.
 * Processes all requests including OPTIONS preflight requests.
 *
 * @author George Jordan
 * @version 1.0
 * @since 2025-10-22
 */
@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class CorsFilter implements Filter {

    /**
     * Handles CORS for all requests.
     * Explicitly handles OPTIONS preflight requests with 200 response.
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

        // Get allowed origins from environment variables
        String urlWithWww = System.getenv("APPLICATION_URL_WITH_WWW");
        String urlWithoutWww = System.getenv("APPLICATION_URL_WITHOUT_WWW");

        // Check if origin is allowed
        if (origin != null && (
                origin.equals(urlWithWww) ||
                origin.equals(urlWithoutWww) ||
                origin.equals("http://localhost:3000") ||
                origin.equals("https://www.jordanthesoftwaredeveloper.com") ||
                origin.equals("https://jordanthesoftwaredeveloper.com"))) {

            response.setHeader("Access-Control-Allow-Origin", origin);
            response.setHeader("Access-Control-Allow-Credentials", "true");
            response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
            response.setHeader("Access-Control-Max-Age", "3600");
        }

        // Handle OPTIONS preflight request
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        chain.doFilter(req, res);
    }
}