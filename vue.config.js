module.exports = {
    devServer: {
        compress: true,
        port: 1800,

        proxy: {
            '/api': {
                target: 'http://localhost:2500',
                changeOrigin: true
            }
        }
    }
}
