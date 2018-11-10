
function getDbUrl() {
	let url = '';
	if (process.env.NODE_ENV === 'production') {
		url = process.env.DATABASE_URL;
	} else if (process.env.NODE_ENV === 'test') {
		url = process.env.TEST_DATABASE_URL || 'mongodb://localhost/restaurant'
	} 
	return url || 'mongodb://localhost/restaurant'
}

exports.PORT = process.env.PORT || 8080;

exports.DB_URL = getDbUrl();

exports.CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'https://.herokuapp.com' ||'http://localhost:3000'

 