#/bin/bash
# Recupere les informations du build. (date et numéro)

cd src/assets

echo "{ \"build\": { \"date\": \"${BUILD_TIMESTAMP}\", \"number\": ${BUILD_NUMBER} } }" > info.json