# BFGM E.V. DRESDEN NEUSTADT

Contact: hi@bfgm.eu <br>
Website: www.bfgm.eu

This website is hosted on Firebase (Google Cloud Plattform) and uses the following resources:
- Cloud Functions (backend server)
- Firebase Hosting (static hosting)

## Requirements

1. Install `node` (best with installing nvm https://github.com/nvm-sh/nvm)
2. Install `firebase-tools` globally in node with `npm i -g firebase-tools`
3. Login into firebase CLI with `firebase login`

## Setup

4. `cd` into the project folder
5. Installing dependencies with `npm i`
6. `cd functions` into `functions` folder inside the project folder
7. Download secrets from cloud functions with `firebase functions:config:get > .runtimeconfig.json` <br>
This will download the secrets into your functions folder that will be used by the local server emulator


### Run locally in development

To run the project locally on your machine, you need two terminals opened. Run the following commands inside the project folder.

- `npm run serve` <br>
This starts the website under `localhost:8080`
- `npm run emulator` <br>
This starts a local emulator to server Cloud Functions Backend locally

### Deploy to production

Push to master will auto deploy all changes to production level!
