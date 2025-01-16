FROM openjdk:17
ARG JAR_FILE=./build/libs/*.jar
COPY ${JAR_FILE} report-server.jar
ENTRYPOINT ["java","-jar","/report-server.jar"]