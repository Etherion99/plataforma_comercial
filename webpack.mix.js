const mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/js')
    .js('resources/js/components/header.js', 'public/js')
    .js('resources/js/home.js', 'public/js')
    .js('resources/js/viewCompany.js', 'public/js')
    .js('resources/js/access.js', 'public/js')
    .sass('resources/sass/app.sass', 'public/css')
    .sass('resources/sass/components/header.sass', 'public/css')
    .sass('resources/sass/home.sass', 'public/css')
    .sass('resources/sass/viewCompany.sass', 'public/css')
    .sass('resources/sass/access.sass', 'public/css');

