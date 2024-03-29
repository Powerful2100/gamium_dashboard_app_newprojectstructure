const webpack = require("webpack");
const path = require('path');

module.exports = function override (config, env) {
    console.log('Overriding default React Webpack config (from CRA)...');

    // Update with base config
    config.resolve.alias = {
        abi: path.resolve(__dirname, '../src/abi'),
        app: path.resolve(__dirname, '../src/app'),
        assets: path.resolve(__dirname, '../src/assets'),
        base: path.resolve(__dirname, '../src/base'),
        modules: path.resolve(__dirname, '../src/modules'),
        utils: path.resolve(__dirname, '../src/utils'),
        styles: path.resolve(__dirname, '../src/styles'),
     };
    config.resolve.fallback = {
        ...config.resolve.fallback,
        util: require.resolve("util/"),
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        http: require.resolve("stream-http"),
        https: require.resolve("https-browserify"),
        os: require.resolve("os-browserify/browser"),
        // This handles all of them…
        // ...Object.fromEntries(Object.entries(require("node-libs-browser")).filter(e => e[1] !== null)),
        // … but these are likely the most used and as such should be sufficient
        process: require("node-libs-browser").process,
        buffer: require("node-libs-browser").buffer,
    }
    config.resolve.extensions = [...config.resolve.extensions, ".ts", ".js"]
    config.plugins = [
        ...config.plugins,
        new webpack.ProvidePlugin({
            process: "process/browser",
            Buffer: ["buffer", "Buffer"],
        }),
    ]
  
    return config
}