# Event-Planner-CS-E4400-
This is a React + Firebase application made in the Aalto University Master's course CS-E4400.
This application hosts a client-side React application along side a Firebase BaaS (Backend as a Service).

# Project setup

## Configuring Firebase

In `firebase.js`, we configure our application to use a specific Firebase project like so:

```js
const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
	measurementId: process.env.REACT_APP_MEASUREMENT_ID
}
```

In order to link your own Firebase project to this application, simply create a `.env.local` file in the `/frontend` directory.
with the required environment variables.

So, first navigate to the correct directory:

```bash
cd ./frontend
```

The `.env.local` file should look something like this:

```bash
REACT_APP_API_KEY="example_api_key"
REACT_APP_AUTH_DOMAIN="example_auth_domain"
REACT_APP_PROJECT_ID="example_project_id"
REACT_APP_STORAGE_BUCKET="example_storage_bucket"
REACT_APP_MESSAGE_SENDER_ID=123456
REACT_APP_APP_ID="example_app_id"
REACT_APP_MEASUREMENT_ID="example_measurement_id"
```

Just remember to replace these values with your own Firebase projects credentials.

For more instructions, visit <a href="https://firebase.google.com/docs/web/setup">Firebase docs</a>

### Adding hard coded data

Additionally, in order to gain full functionality of this application, your Firestore database will require
some hard coded data to be inserted into the application, specifically the venues which are shown when creating an event.

To add these harcoded venues, simply navigate to your Firestore database window on your browser and do the following:

1. Click 'Start collection' and call it `venues`
2. Now start adding new venue documents under this `venues` collection by clicking 'Add document'. Each venue document will be of the following format (represented in object format here):
```js
// Just an example venue object
{
	name: "venue name",
	location: "venue location",
	filter_label: "Afterwork",
	type: "Office party"
}
```
Here, the `filter_label` field refers to the different main tags that are presented to the user when creating an event:
1. Afterwork
2. Team day
3. Education
4. Cultural sharing

So set the `filter_label` field to one of those and you can see that venue when clicking said theme tag in the
event creation modal.

To get the application running, you need only add 1 hard coded venue.


## Run the application

Assuming you are in the `/frontend` directory of the application, run these commands:

```bash
npm install

npm start
```

This will install the necessary dependencies and start the project locally.

## Hosting

To host this application, assuming you have already linked your Firebase project to the application and are in the `/frontend` directory, run the following:

```bash
npm install -g firebase-tools

npm run build

firebase deploy
```

This will deploy the application to the web.