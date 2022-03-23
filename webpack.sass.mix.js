const mix = require('laravel-mix');

mix.sass('resources/sass/gamium/gamium.scss', 'src/styles/gamium.min.css')
   .minify('src/styles/gamium.min.css')
   .options({ 
      processCssUrls: false,
      // legacyNodePolyfills: true,
      // purifyCss: true,
    });

mix.copy('src/styles/gamium.min.css', 'public/css/gamium.min.css')
mix.copy('src/styles/gamium.min.css', 'build/css/gamium.min.css')
