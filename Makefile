public/build.js: client.js lib/status/* lib/restart/*
	browserify -t brfs client.js > public/build.js

