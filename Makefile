public/build.js: client.js
	browserify -t brfs client.js > public/build.js

