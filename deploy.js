import fs from 'fs';
import path from 'path';
import deploy from 'chrome-extension-deploy';

deploy({
	clientId: process.env.CHROME_CLIENT_ID,
	clientSecret: process.env.CHROME_CLIENT_SECRET,
	refreshToken: process.env.CHROME_REFRESH_TOKEN,
	id: 'jhneopniogogjaodebilaefmllbffcmf',
	zip: fs.readFileSync(path.join(__dirname, 'dist/media-db.zip')),
}).then(() => {
	console.log('Deploy complete!'); // eslint-disable-line no-console
}, err => {
	console.error(err); // eslint-disable-line no-console
	process.exit(1);
});
