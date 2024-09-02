# Etapa 1: Construcción del proyecto
FROM maven:3.8.6-eclipse-temurin-17-alpine AS build

WORKDIR /app

COPY ../retrueque/pom.xml .
RUN mvn dependency:go-offline -B

COPY ../retrueque/src ./src
RUN mvn package -DskipTests

# Etapa 2: Imagen para ejecutar la aplicación
FROM openjdk:17-jdk-alpine

WORKDIR /app

COPY --from=build /app/target/*.jar ./app.jar

# Asegura que el archivo JAR tenga permisos de ejecución
RUN chmod +x /app/app.jar

EXPOSE 8080

CMD ["java", "-jar", "app/app.jar"]
