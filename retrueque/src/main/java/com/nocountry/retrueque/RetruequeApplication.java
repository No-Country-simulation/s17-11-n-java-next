package com.nocountry.retrueque;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@EnableWebMvc
public class RetruequeApplication {

	public static void main(String[] args) {
		SpringApplication.run(RetruequeApplication.class, args);
	}

}
