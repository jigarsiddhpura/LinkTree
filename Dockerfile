# compile and package my application
FROM maven:3.8.5-openjdk-17 AS build
COPY . .
RUN mvn clean package -DskipTests

# run my application
FROM openjdk:17.0.1-jdk-slim
COPY --from=build /target/linktree-backend.jar linktree-backend.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "linktree-backend.jar"]