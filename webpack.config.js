'use strict';
const webpack=require('webpack');
const prod = process.env.NODE_ENV === 'production';
const config = {
  entry: {
    app: './src'
  },
  output: {
    filename: 'app.js',
    path: './dist'
  },
  module: {
    loaders: [
      {
        loader: 'ng-annotate?add!babel?presets[]=es2015!eslint',
        test: /\.js$/,
        exclude: /(node_modules|spec|angular-locale)/
      },
      {
        loader: 'style!css',
        test: /\.css$/
      },
      {
        loader: `ngtemplate?relativeTo=src/&prefix=dist/!template-html?engine=jade&doctype=html&basedir=${__dirname}/src`,
        test: /\.jade$/,
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  externals: {
    angular: 'angular',
    MathJax: 'MathJax',
    jstat: 'jStat'
  }
};
if(prod){
  config.plugins = [
    new webpack.optimize.DedupePlugin()
  ];
}
module.exports = config;
