const mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/js')
    .js('resources/js/components/header.js', 'public/js')
    .sass('resources/sass/app.sass', 'public/css')
    .sass('resources/sass/components/header.sass', 'public/css');

