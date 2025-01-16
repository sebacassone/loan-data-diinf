FROM openjdk:17
ARG JAR_FILE=./build/libs/*.jar
COPY ${JAR_FILE} income-server.jar
ENTRYPOINT ["java","-jar","/income-server.jar"]