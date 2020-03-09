module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                'components': '@/components',
                'c_content': 'components/content',
                'c_common': 'components/common',
                'assets': '@/assets',
                'css': 'assets/css',
                'network': '@/network',
                'views': '@/views',
                'common': '@/common'
            }
        }
    }
}
