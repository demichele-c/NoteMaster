const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    // Setting the mode to development for easier debugging during development
    mode: 'development',
    
    // Entry points for our main JavaScript file and install logic
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
    },
    
    // Where to output the final bundled files
    output: {
      filename: '[name].bundle.js', // Dynamic naming based on entry points
      path: path.resolve(__dirname, 'dist'), // Output directory
    },
    
    plugins: [
      // Generates an HTML file and injects bundled files
      new HtmlWebpackPlugin({
        template: './index.html', // Source HTML file
        title: 'NoteMaster', // Title of the web page
      }),
      
      // Injects the custom service worker into the project
      new InjectManifest({
        swSrc: './src-sw.js', // Path to the custom service worker
        swDest: 'service-worker.js', // Output file name for the service worker
      }),

      // Creates the PWA manifest file (for enabling installation of the app)
      new WebpackPwaManifest({
        name: 'NoteMaster', // Full name of the app
        short_name: 'NoteMaster', // Short name when installed
        description: 'Take notes with or without an internet connection!', // App description
        background_color: '#ffffff', // Background color of the splash screen
        theme_color: '#ffffff', // Theme color for the browser UI
        start_url: '/', // Start page when the app is launched
        publicPath: '/', // Base path for loading files
        icons: [
          {
            src: path.resolve('src/images/logo.png'), // Icon image
            sizes: [96, 128, 192, 256, 384, 512], // Icon sizes for various platforms
            destination: path.join('assets', 'icons'), // Destination for icons in the build
          },
        ],
      }),
    ],

    // Loaders for handling various file types
    module: {
      rules: [
        // Loader for CSS files
        {
          test: /\.css$/i, // Regex to match .css files
          use: ['style-loader', 'css-loader'], // Use these loaders to handle CSS
        },
        // Loader for JavaScript files, with Babel for transpiling modern JS
        {
          test: /\.m?js$/, // Regex to match .js files
          exclude: /node_modules/, // Exclude node_modules folder
          use: {
            loader: 'babel-loader', // Use Babel to transpile JS
            options: {
              presets: ['@babel/preset-env'], // Preset to compile modern JS to older versions
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
