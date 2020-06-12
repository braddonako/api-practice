const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = function(app) {
    app.use(createProxyMiddleware('/api/users', // replace with your endpoint
        { target: 'http://localhost:3002',
          changeOrigin: true
    } // replace with your target
    ));
}