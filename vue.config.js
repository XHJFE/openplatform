const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}

const env = process.env.NODE_ENV;

module.exports = {
    lintOnSave: false,
    publicPath: env === 'production' ? '/dist/' : '/',
    productionSourceMap: env === 'production' ? false : true,
    // outputDir: 'ui',
    configureWebpack: (config) => {
        if(env === 'production') {
            config.externals = {
                vue: 'Vue',
                vuex: 'Vuex',
                'vue-router': 'VueRouter',
                'axios': 'axios',
                "iview": "iview",
              }
        }
    },
    chainWebpack: (config)=>{
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets',resolve('src/assets'))
            .set('components',resolve('src/components'))
            .set('views',resolve('src/views'))
            .set('store',resolve('src/store'))
            .set('util',resolve('src/util'))
            .set('api',resolve('src/api'))
            .set('router',resolve('src/router'));

        config.module
            .rule("vue")
            .use("vue-loader")
            .loader("vue-loader")
            .tap(options => {
              // 去除元素间的空格
              options.compilerOptions.preserveWhitespace = false;
              return options;
            });
       
        config.plugin('html')
            .tap(args => {
                if(env === 'production') {
                    args[0].template = resolve('public/index.prod.html');
                } else {
                    args[0].template = resolve('public/index.dev.html');
                }
                return args
            });         
    },
    css: {
        loaderOptions: {
            // 给 sass-loader 传递选项, 全局使用scss变量和方法
            sass: {
                // @/ 是 src/ 的别名
                data: `@import "@/style/index.scss";`
            }
        }
    },
    devServer: {
        open: false,
        host: '0.0.0.0', 
        port: 8011,   
        https: false, 
        hotOnly: false,
        proxy: null,
        before: app => {}
    }
}