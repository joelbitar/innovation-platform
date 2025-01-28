module.exports = {
  // Redirect to backend for API requests, do not cache.
  trailingSlash: true,
  async rewrites() {
    return [
      // NOT tested, just a hunch
      {
        source: '/media/:path*',
        destination: 'http://backend.dkr:8000/media/:path*',
      },
      // Redirect api calls to the backend
      {
        source: '/api/:path*/',
        destination: 'http://backend.dkr:8000/api/:path*/',
      },
    ];
  },
}