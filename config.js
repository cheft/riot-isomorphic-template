module.exports = {
	apiPrefix: '/api',
	// apiRoot  : 'http://localhost:3000/api',
	apiRoot  : 'http://cheft.coding.io/api',
	dirname  : typeof window === 'object' ? '/public' : __dirname,
	blacklist: ['/admin/*', '/api/admin/*']
}