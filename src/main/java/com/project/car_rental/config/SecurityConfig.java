package com.project.car_rental.config;

import com.project.car_rental.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authProvider() {
        DaoAuthenticationProvider auth = new DaoAuthenticationProvider();
        auth.setUserDetailsService(userDetailsService);
        auth.setPasswordEncoder(passwordEncoder());
        return auth;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers("/api/cars/add", "/api/cars/**").hasRole("ADMIN")
//                        .requestMatchers("/api/cars/images/**").authenticated()
//                        .requestMatchers("/api/cars").authenticated()
//                        .anyRequest().permitAll()
//                        .requestMatchers("/api/cars/add").hasRole("ADMIN")
//                        .requestMatchers("/api/cars/**").hasRole("ADMIN")
// Any authenticated user can GET cars list
//                          .requestMatchers(HttpMethod.GET, "/api/cars", "/api/cars/images/**").authenticated()
//                                .anyRequest().permitAll()
                                // ADMIN-only endpoints
                                .requestMatchers("/api/cars/add", "/api/cars/**").permitAll()
//                                .requestMatchers("/api/cars/add").hasRole("ADMIN")
//                                .requestMatchers(HttpMethod.PUT, "/api/cars/**").hasRole("ADMIN")
//                                .requestMatchers(HttpMethod.DELETE, "/api/cars/**").hasRole("ADMIN")

                                // USERS + ADMIN can book + view their bookings
                                .requestMatchers(HttpMethod.POST, "/api/cars/book/**").hasAnyRole("USER", "ADMIN")
                                .requestMatchers(HttpMethod.GET, "/api/bookings/my").hasAnyRole("USER", "ADMIN")

                                // Users can view cars
                                .requestMatchers(HttpMethod.GET, "/api/cars", "/api/cars/images/**").authenticated()

                                .anyRequest().permitAll()

                )
                .httpBasic(Customizer.withDefaults());
        return http.build();
    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000")); // frontend origin
        configuration.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
