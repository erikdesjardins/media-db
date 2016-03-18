/* eslint-disable no-console */

import fs from 'fs';
import path from 'path';
import deploy from 'chrome-extension-deploy';

deploy({
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	refreshToken: process.env.REFRESH_TOKEN,
	id: 'INSERT ID HERE',
	zip: fs.readFileSync(path.join(__dirname, 'dist/media-db.zip')),
}).then(() => {
	console.log('Deploy complete!');
}, err => {
	console.error(err);
	process.exit(1);
});
