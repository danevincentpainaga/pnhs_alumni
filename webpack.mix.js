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

mix.combine(['resources/assets/controller/*'], 'public/controller/bundleCtrl.js')
	.js('resources/js/app.js', 'public/js')
	.js('resources/assets/services/alertServices.js', 'public/alertServices')
	.js('resources/assets/services/httpServices.js', 'public/httpServices')
   	.sass('resources/sass/app.scss', 'public/css')
   	.options({processCssUrls: false})
   	.browserSync({
    	proxy: process.env.APP_URL,
    	browser: ["chrome"],
	    files: [
	    	'resources/views/index.blade.php',
	        'public/views/*.html',
	        'public/controller/bundleCtrl.js',
	    ],
	});

// mix.browserSync({
//     proxy: process.env.APP_URL,
//     files: [
//         'public/views/*.html',
//         'public/js',
//         'public/css',
//     ],
//     watchOptions: {
//         usePolling: true,
//         interval: 500
//     }
// });
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
mix.copyDirectory('node_modules/@mikepol', 'public/node_modules/@mikepol');
mix.copyDirectory('node_modules/video.js', 'public/node_modules/video.js');
mix.copyDirectory('node_modules/placeholder-loading', 'public/node_modules/placeholder-loading');
mix.copyDirectory('node_modules/emojionearea', 'public/node_modules/emojionearea');