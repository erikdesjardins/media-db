/* eslint-disable */

'use strict';

const fs = require('fs');
const path = require('path');
const deploy = require('chrome-extension-deploy');

deploy({
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	refreshToken: process.env.REFRESH_TOKEN,
	id: 'INSERT ID HERE',
	zip: fs.readFileSync(path.join(__dirname, 'dist/media-db.zip'))
}).then(function() {
	console.log('Deploy complete!');
}, function(err) {
	console.error(err);
	process.exit(1);
});