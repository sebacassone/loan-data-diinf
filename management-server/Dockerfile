FROM openjdk:17
ARG JAR_FILE=./build/libs/*.jar
COPY ${JAR_FILE} management-server.jar
ENTRYPOINT ["java","-jar","/management-server.jar"]