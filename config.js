module.exports = {
	apiPrefix: '/api',
	apiRoot: typeof window === 'object' ? '/api': 'http://localhost:3000/api',
	dirname: typeof window === 'object' ? '/public' : __dirname,
}