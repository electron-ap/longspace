const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    console.log("createProxyMiddleware")
    app.use(
        createProxyMiddleware(
            '/api', {
                target: 'http://fuzhi.forwap.cn', // http://mall.org
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '/api': '/api'
                }
            }
        )
    );
};
