/* eslint-disable import/no-commonjs */
const fs = require('fs');
const path = require('path');
const deploy = require('chrome-extension-deploy');

deploy({
	clientId: process.env.CHROME_CLIENT_ID,
	clientSecret: process.env.CHROME_CLIENT_SECRET,
	refreshToken: process.env.CHROME_REFRESH_TOKEN,
	id: 'jhneopniogogjaodebilaefmllbffcmf',
	zip: fs.readFileSync(path.join(__dirname, 'dist/media-db.zip')),
}).then(() => {
	console.log('Deploy complete!'); // eslint-disable-line no-console
}, err => {
	process.exitCode = 1;
	console.error(err); // eslint-disable-line no-console
});
