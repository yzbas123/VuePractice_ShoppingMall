module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                'components': '@/components',
                'content': 'components/content',
                'common': 'components/common',
                'assets': '@/assets',
                'css': 'assets/css',
                'network': '@/network',
                'views': '@/views',
            }
        }
    }
}
