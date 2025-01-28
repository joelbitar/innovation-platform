module.exports = {
    // Redirect to backend for API requests, do not cache.
    trailingSlash: true,
    async rewrites() {
        return [
            // NOT tested, just a hunch and should only be used for development in any case.
            // In production all media should be served from a CDN.
            {
                source: '/media/:path*',
                destination: process.env.BACKEND_URL + '/media/:path*',
            },
            // Redirect api calls to the backend
            {
                source: '/api/:path*/',
                destination: process.env.BACKEND_URL + '/api/:path*/',
            },
        ];
    },
}