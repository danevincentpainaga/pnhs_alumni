const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css');

mix.combine(['resources/assets/controller/*'], 'public/controller/bundleCtrl.js');
mix.js('resources/assets/services/alertServices.js', 'public/alertServices')
mix.js('resources/assets/services/httpServices.js', 'public/httpServices')
mix.copyDirectory('node_modules/@uirouter', 'public/node_modules/@uirouter');
mix.copyDirectory('node_modules/angular', 'public/node_modules/angular');
mix.copyDirectory('node_modules/angular-animate', 'public/node_modules/angular-animate');
mix.copyDirectory('node_modules/angular-cookies', 'public/node_modules/angular-cookies');
mix.copyDirectory('node_modules/angular-resource', 'public/node_modules/angular-resource');
mix.copyDirectory('node_modules/angular-sanitize', 'public/node_modules/angular-sanitize');
mix.copyDirectory('node_modules/angular-touch', 'public/node_modules/angular-touch');
mix.copyDirectory('node_modules/angular-route', 'public/node_modules/angular-route');
mix.copyDirectory('node_modules/sweetalert2', 'public/node_modules/sweetalert2');
mix.copyDirectory('node_modules/socket.io-client', 'public/node_modules/socket.io-client');
mix.copyDirectory('node_modules/jquery', 'public/node_modules/jquery');
