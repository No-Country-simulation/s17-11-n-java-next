package com.nocountry.retrueque.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;

@Configuration
public class S3Config {

    private static final Logger logger = LoggerFactory.getLogger(S3Config.class);

    private final S3ConfigProperties s3ConfigProperties;

    public S3Config(S3ConfigProperties s3ConfigProperties) {
        this.s3ConfigProperties = s3ConfigProperties;
    }

    @Bean
    public AmazonS3 amazonS3() {
        try {
            BasicAWSCredentials awsCreds = new BasicAWSCredentials(
                    s3ConfigProperties.getAccessKeyId(),
                    s3ConfigProperties.getSecretAccessKey()
            );
            return AmazonS3ClientBuilder.standard()
                    .withCredentials(new AWSStaticCredentialsProvider(awsCreds))
                    .withRegion(s3ConfigProperties.getRegion())
                    .build();
        } catch (Exception e) {
            logger.error("Failed to create Amazon S3 client", e);
            throw new IllegalStateException("Could not create Amazon S3 client", e);
        }
    }

    @Bean
    public String bucketName() {
        return s3ConfigProperties.getBucketName();
    }
}