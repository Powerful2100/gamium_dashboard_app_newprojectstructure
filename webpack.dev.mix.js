const mix = require('laravel-mix');

mix.options({
      legacyNodePolyfills: true,
   })
   .js('src/index.js', 'build/js/app.js')
   .react()
   // .version()
   .extract()
   .minify('build/js/vendor.js')
   .minify('build/js/app.js')
   .webpackConfig({
      resolve: {
          fallback: {
              "crypto": require.resolve("crypto-browserify"),
              "stream": require.resolve("stream-browserify"),
              "http": require.resolve("stream-http"),
              "https": require.resolve("https-browserify"),
              "os": require.resolve("os-browserify/browser"),
              // This handles all of them…
              // ...Object.fromEntries(Object.entries(require("node-libs-browser")).filter(e => e[1] !== null)),
              // … but these are likely the most used and as such should be sufficient
              // process: require("node-libs-browser").process,
              // buffer: require("node-libs-browser").buffer,
          },
      },
   // .autoload({
   //   jquery: ['$', 'window.jQuery', 'jQuery'],
   //   'popper.js/dist/umd/popper.js': ['Popper']
   });

// mix.sourceMaps();
    
