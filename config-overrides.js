const webpack = require("webpack")

module.exports = function override (config, env) {
    console.log('overriding default react webpack config ...')
    config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        tls: false,
        net: false,
        // "zlib": require.resolve("browserify-zlib") ,
        // "path": require.resolve("path-browserify"),
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