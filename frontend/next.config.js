module.exports = {
  // Redirect to backend for API requests, do not cache.
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://ipbackenddev/api/:path*',
      },
    ];
  }
}