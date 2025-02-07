# First stage: Build the application
FROM ubuntu:latest AS build

RUN apt-get update
RUN apt-get install openjdk-17-jdk -y

# Copy the project files
COPY . .

# Build the application using Maven Wrapper
RUN ./mvnw package

# Second stage: Create a minimal runtime image
FROM openjdk:17-jdk-slim

# Expose application port
EXPOSE 8080

# Copy the built JAR from the target directory
COPY --from=target /target/linktree-backend.jar app.jar

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
