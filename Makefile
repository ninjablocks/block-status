public/build.js: public/index.js
	browserify -t brfs public/index.js > public/build.js

