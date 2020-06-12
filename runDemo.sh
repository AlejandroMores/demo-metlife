#!/bin/bash
echo 'Entrando a folder backend'
cd backend
./gradlew buildImage

echo 'Regresando a carpeta raiz'

cd ..

echo 'Entrando a folder frontend'
cd frontend
./build-prod.sh

echo 'Regresando a carpeta raiz'

cd ..

docker-compose -f docker-compose.prod.yml up -d