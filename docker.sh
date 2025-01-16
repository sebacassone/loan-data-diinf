#!/bin/bash

cd config-server
mvn clean install -DskipTests=True
docker build -t sebacassone/config-server .
docker push sebacassone/config-server

cd ../gateway-server
mvn clean install -DskipTests=True
docker build -t sebacassone/gateway-server .
docker push sebacassone/gateway-server

cd ../income-server
./gradlew clean build -x test
docker build -t sebacassone/income-server .
docker push sebacassone/income-server

cd ../management-server
./gradlew clean build -x test
docker build -t sebacassone/management-server .
docker push sebacassone/management-server

cd ../report-server
./gradlew clean build -x test
docker build -t sebacassone/report-server .
docker push sebacassone/report-server

# cd ../../Monolítica/frontend/
# docker build --build-arg VITE_PAYROLL_BACKEND_SERVER=192.168.49.2:30000 -t sebacassone/frontend-server .
# docker push sebacassone/frontend-server
