const { createProxyMiddleware } = require('http-proxy-middleware');

// https://create-react-app.dev/docs/proxying-api-requests-in-development/#configuring-the-proxy-manually
// link to proxying in react -- tried to proxy through package.json, and this was the solution

module.exports = function(app) {
  app.use(
      '/api/',
      createProxyMiddleware({
          target: 'http://localhost:3002',
          changeOrigin: true
      })
  )
};