
<p align="center">
  <a href="https://crescn.app" target="_blank" rel="noreferrer"> <img src="https://github.com/oo-2/crescn/blob/master/client/public/logo192.png" alt="Crescn Logo"/> </a>
</p>

# Crescn - Karaoke Web App
Crescn is a karaoke web app that provides time-synced lyrics and audio playback. Users can access the live version of the app at [Crescn.app](https://crescn.app).

**Note:** Please use Chrome or Firefox for the best experience, as Internet Explorer and Safari are not supported.

## Technologies Used

Crescn is built using the MERN stack:

-   **M**ongoDB: Stores song metadata and lyrics.
-   **E**xpress.js: Provides a RESTful API to communicate with the frontend.
-   **R**eact.js: Renders the dynamic web interface.
-   **N**ode.js: Serves as the backend JavaScript runtime environment.

## Features

- Time-synced lyrics display synchronized with audio playback.
- Search for songs and artists to find karaoke tracks.
- Customize the playback settings, such as volume and audio effects.
- Responsive and intuitive user interface for seamless navigation.

## Requirements for Setup

To run this project locally, you will need the following:

- [Node.js](https://nodejs.org/) (v14.x or above)
- [npm](https://www.npmjs.com/) (Node package manager, usually comes with Node.js)
- [MongoDB](https://www.mongodb.com/) (v4.x or above)

Make sure you have the above requirements installed and properly set up on your development machine before proceeding with the project setup and execution.

Additionally, please note that this project is not compatible with Internet Explorer and Safari browsers. It is recommended to use Google Chrome or Mozilla Firefox for the best experience.

## Setup Locally

1. Clone the master branch and install the required dependencies

```console 
git clone https://github.com/oo-2/crescn.git
cd crescn
cd ./server && npm install
cd ../client && npm install
```
2. Create a `.env` file in the client directory as well as server directory.

#### The client directory uses the following variables:
```
REACT_APP_WEBSITE_NAME=Crescn
REACT_APP_BASE_URL=localhost:3001
REACT_APP_API_URL=http://localhost:3001
REACT_APP_TERMS_DATE=
REACT_APP_TERMS_EMAIL=
REACT_APP_PRIVACY_DATE=
REACT_APP_PRIVACY_EMAIL=
REACT_APP_SUPPORT_EMAIL=
REACT_APP_DMCA_EMAIL=
```

#### The server directory uses the following variables:
```
PORT=3001
MONGO_URI=
SPOTIFY_ID=(Spotify API ID)
SPOTIFY_SECRET=(Spotify API Secret)
SPOTIFY_DC=(Found in Spotify cookies as SP_DC)
```
**Obtaining SPOTIFY_ID and Spotify_SECRET**
- You need to get the client id and client secret from a Spotify Application, check the documentation [here](https://developer.spotify.com/documentation/web-api).

**Obtaining SPOTIFY_DC**\
Chromium Browsers:
- Have [open.spotify.com](https://open.spotify.com) open and be logged in
- Open developer tools using F12 or the right-click context menu
- Click **Application** in the header of the dev tools window
- Under storage on the left-side navigation menu will be a section called "Cookies", expand this submenu
- Select open.spotify.com to view the cookies
- Search for sp_dc in the filter textarea and copy the value

Firefox:
- Have [open.spotify.com](https://open.spotify.com) open and be logged in
- Open developer tools using F12 or the right-click context menu
- Click **Storage** in the header of the dev tools window
- Under storage on the left-side navigation menu will be a section called "Cookies", expand this submenu
- Select open.spotify.com to view the cookies
- Search for sp_dc in the filter items textarea and copy the value


3. Once both `.env` files are setup properly, back in the console you will need to build the client directory and move the newly created `./build` to the server directory. \
**Note:** This assumes you are still in `./client` from step 1. If not, please change your directory to `./client` before proceeding.
```console 
npm run build
mv build ../server && cd ../server
npm start
```
4. The server will now be showing the homepage on `localhost:3001` by default.

