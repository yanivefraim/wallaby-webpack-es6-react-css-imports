var wallabyWebpack = require('wallaby-webpack');

module.exports = function (wallaby) {

  var webpackPostprocessor = wallabyWebpack({
    // webpack options
    module: {
      loaders: [{ test: /\.css$/, loader: "css-loader" }]
    },
    externals: {
      // Use external version of React instead of rebuilding it
      "react": "React"
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    }
  });

  return {
    files: [
      // not required if using PhantomJs2 - http://wallabyjs.com/docs/integration/phantomjs2.html
      {pattern: 'node_modules/phantomjs-polyfill/bind-polyfill.js', instrument: false},
      {pattern: 'node_modules/react/dist/react-with-addons.js', instrument: false},

      {pattern: 'src/**', load: false}
    ],

    tests: [
      {pattern: 'test/**/*Spec.js*', load: false}
    ],

    compilers: {
      '**/*.js*': wallaby.compilers.babel()
    },

    preprocessors: {
      'src/**/*.scss': file => require('node-sass').renderSync(
        { data: file.changeExt('css').content || ' ' }
      ).css.toString()
    },

    postprocessor: webpackPostprocessor,

    bootstrap: function () {
      window.__moduleBundler.loadTests();
    }
  };
};
