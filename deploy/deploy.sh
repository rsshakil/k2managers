#!/bin/bash

echo "deploy start"

eval $(grep '^REACT_APP_ENVIRONMENT' .env)
echo ${REACT_APP_ENVIRONMENT}

# haga add starts 
#eval $(grep '^REACT_APP_VERSIONS' .env)
#echo ${REACT_APP_VERSIONS}
#DATE=`TZ='Asia/Tokyo' date '+%Y%m%d%H%M%S'`
#sed -e "s/REACT_APP_VERSIONS=${REACT_APP_VERSIONS}/REACT_APP_VERSIONS=${DATE}/" .env > tmp
#mv tmp .env
# haga add end


sed "s/develop/${REACT_APP_ENVIRONMENT}/g" deploy/deploy-fargate.json > deploy/deploy-fargate-${REACT_APP_ENVIRONMENT}.json

#cat deploy/deploy-fargate-${REACT_APP_ENVIRONMENT}.json

aws ecs run-task --cli-input-json file://deploy/deploy-fargate-${REACT_APP_ENVIRONMENT}.json
