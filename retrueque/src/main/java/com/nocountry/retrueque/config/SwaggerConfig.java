package com.nocountry.retrueque.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
  @Bean
  public OpenAPI fimaOpenAPI() {
    return new OpenAPI()
            .info(new Info().title("Retrueque")
                    .description("Aplicación de API Rest para la plataforma retrueque")
                    .version("v1.0.0")
                    .license(new License().name("Retrueque v1.0").url("http://")))
            .externalDocs(new ExternalDocumentation()
                    .description("Documentación de la API")
                    .url("https://"))
            .components(new Components()
                    .addSecuritySchemes("bearer-key",
                            new SecurityScheme().type(SecurityScheme.Type.HTTP).scheme("bearer").bearerFormat("JWT")));
  }

  public SecurityScheme apiKeySecuritySchema() {
    return new SecurityScheme()
            .name("authorization")
            .description("Description about the TOKEN")
            .in(SecurityScheme.In.HEADER)
            .type(SecurityScheme.Type.APIKEY);
  }
}
