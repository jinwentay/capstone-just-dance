# capstone

## client - front-end built with React, MobX, ThemeUI
File structure:
<br>
<strong>src > components > UI</strong>
<br>
This directory contains all the reusable UI across the application such as buttons/cards/tabs etc.
<br>
<strong>src > components</strong>
<br>
This directory contains more complicated UI that will be displayed on each page such as the reports and the graphs
<br>
<strong>src > components > Pages</strong>
<br>
This directory contains the parent components for each page navigation in the application, such as home/offline/login/signup
- home: the live dashboard page where the user can view their ongoing live dance session or create/join a session
- offline: the offline dashboard analytics page where the user can view their dance analytics for all their sessions
- signup/login: allows the user to create an account/login to their account to view their analytics
<br>
<strong>src > store</strong>
<br>
This directory contains the logic of the client application using MobX stores, to save a global state for the react components
<br>
<strong>src > theme</strong>
<br>
This directory is where the themes are declared so that the UI will be standardized throughout the application
<br>

## server - back-end built with NodeJS, Express, RabbitMQ, Redis, PostgreSQL
File structure:
<br>
<strong>pubsub</strong>
<br>
This directory contains the publisher and subscriber code to integrate with RabbitMQ for communications with external communications server
- testCloud.subscribe.js: the actual subscriber file connected to rabbitMQ cloud which receives all position/dance/logout data
- dance.producer.js/position.producer.js: publisher file for the initial stage when the dashboard was ran using fake data without integration with external comms
<br>
<strong>routes</strong>
<br>
This directory contains the api routes on the server side
- danceSession.js: create/join/stop/restart a session logic
- offline.js: get all offline data analytics from PostgreSQL to send to the client
- users.js: handles login/signup logic by checking PostgreSQL
<br>
<strong>script.store.js</strong>
<br>
This file handles the writing of data from redis cache to postgreSQL database after stopping a session.
<br>
<strong>index.js</strong>
<br>
This file connects all the backend components together.
<br>
It connects the user to express server and creates a redis client to cache any incoming data. It also sets up the socket to communicate with the client side.
Next, it declares the api routes to handle requests from the client side.
Lastly, it subscribes to the rabbitMQ queue to receive information from external communications server
<br>

## How to start the application
1. yarn install in both the client and server directory to download all the node modules
2. yarn start in client directory
3. yarn start in server directory
**Take note: As the backend database is connected to AWS RDS, you may not have the security permissions to read/write to the database
