# ghost-webhook-catcher
Catches new-member webhook event from ghost and sends them to sendgrid.

## Getting started
Install dependencies and start server
```
npm install
npm start
```

## Deploy 
Deploys a new version to google cloud run. Customize parameters and image tags.

```
./build_and_deploy.sh
```

## Features
- deploy script
- winston for structured logging in google cloud run