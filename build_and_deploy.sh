#!/bin/bash

set -e

DOCKER_IMAGE=us.gcr.io/MY_PROJECT/ghost-webhook-catcher:0.1

docker build -t $DOCKER_IMAGE .
docker push $DOCKER_IMAGE

gcloud run deploy ghost-webhook-catcher \
  --platform=managed \
  --region=us-east4 \
  --image=$DOCKER_IMAGE \
  --port=3000 \
  --memory=2Gi \
  --cpu=2 \
  --max-instances=50 \
  --concurrency=80 \
  --timeout=900 \
  --allow-unauthenticated \
  --set-env-vars="NODE_ENV=production" \
  --set-env-vars="SENDGRID_TOKEN=token" \
  --set-env-vars="SENDGRID_LIST=demo-23242"