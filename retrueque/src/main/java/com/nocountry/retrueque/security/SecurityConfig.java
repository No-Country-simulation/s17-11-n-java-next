package com.nocountry.retrueque.security;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
  private final JwtAuthenticationFilter jwtAuthenticationFilter;
  private final AuthenticationProvider authenticationProvider;

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http
            .csrf(AbstractHttpConfigurer::disable)
            .cors(Customizer.withDefaults())
            .authorizeHttpRequests(auth -> auth
                    .requestMatchers(
                            "api/v1/auth/**",
                            "/swagger-ui/**",
                            "/v3/api-docs/**").permitAll()
                    .requestMatchers(HttpMethod.GET, "api/v1/category/**").permitAll()
                    .requestMatchers(HttpMethod.GET, "api/v1/service/**").permitAll()
                    .requestMatchers(HttpMethod.GET, "api/v1/provincias/**").permitAll()
                    .requestMatchers(HttpMethod.GET, "api/v1/departamentos/**").permitAll()
                    .requestMatchers(HttpMethod.GET, "api/v1/requests/comments/**").permitAll()
                    .requestMatchers(HttpMethod.GET, "api/v1/user/**").permitAll()


                    .anyRequest().authenticated()
            ).sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authenticationProvider(authenticationProvider)
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
            .exceptionHandling(custom->custom
                    .authenticationEntryPoint(authenticationEntryPoint())
                    .accessDeniedHandler(accessDeniedHandler()))
            .build();
  }

  /**
   * This method customize the message for unauthorized access.
   *
   * @return AuthenticationEntryPoint
   */
  @Bean
  public AuthenticationEntryPoint authenticationEntryPoint() {
    return (request, response, authException) -> {
      response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
      response.getWriter().write("Unauthorized: Please login to access this resource.");
    };
  }

  /**
   * This method handled the logic associated with exceptions for insufficient permissions.
   *
   * @return AccessDeniedHandler
   */
  @Bean
  public AccessDeniedHandler accessDeniedHandler() {
    return (request, response, accessDeniedException) -> {
      response.setStatus(HttpServletResponse.SC_FORBIDDEN);
      response.getWriter().write("Access Denied: You do not have permission to access this resource.");
    };
  }
}
