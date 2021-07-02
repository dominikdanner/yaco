# Getting Started with Create React App

## Available Scripts

In the project directory, you can run:

### `npm run server`

Runs the websocket and the rest-api
Server uses `Port 4000 and 5000`.

Its possible that the server will have some problems.\
You will also see any lint errors in the console.

### `npm run client`

Launches React App in `Dev Mode`.\
Run `npm run build` in the /client directory to build the project.

### `npm run app`

Runs the Electron Instance in Development mode.\
This electron app runs a proxy and depends on the react app.
For Production build the project by using the instruction on the [Electron Builder Page](https://www.electron.build/).

The build is minified and the filenames include the hashes.
