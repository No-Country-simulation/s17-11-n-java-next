package com.nocountry.retrueque.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "aws.s3")
@Data // Lombok anotación para generar getters, setters, toString, hashCode y equals
public class S3ConfigProperties {
    private String bucketName;
    private String accessKeyId;
    private String secretAccessKey;
    private String region;
}