const baseConfig = require('./webpack.config.base');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = function override (config, env) {

    // Load base webpack config
    config = baseConfig(config, env); // CRA + base config

    // Update with production config

    config.plugins = [
        ...config.plugins,
        //Add new plugins here
    ]
    config.optimization = {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                minify: TerserPlugin.uglifyJsMinify,
                extractComments: true,
                terserOptions: {
                    compress: {
                        drop_console: true,
                    },
                },
            }),
        ],
    };
  
    return config; // CRA + base config + prod config
};
