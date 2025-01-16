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
mvn clean install -DskipTests=True
docker build -t sebacassone/prueba-server .
docker push sebacassone/prueba-server

cd ../management-server
./gradlew clean build -x test
docker build -t sebacassone/addresses-server .
docker push sebacassone/addresses-server

cd ../report-server
./gradlew clean build -x test
docker build -t sebacassone/debts-server .
docker push sebacassone/debts-server

# cd ../../Monolítica/frontend/
# docker build --build-arg VITE_PAYROLL_BACKEND_SERVER=192.168.49.2:30000 -t sebacassone/frontend-server .
# docker push sebacassone/frontend-server
