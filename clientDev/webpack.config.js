const path = require('path');
console.log(__dirname);
module.exports = [{
  name: 'production',
  mode: 'production',
  devServer: {
    contentBase: 'public',
  },
  entry: [
    '@babel/polyfill', // enables async-await
    path.join(__dirname, 'src', 'index.js')
  ],
  output: {
    path: path.join(__dirname, '../production/public'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
	test: /\.(js|jsx)/,
	exclude: /node_modules/,
	use: {
	  loader: "babel-loader"
	}
      }
    ]
  }
}, {
  name: 'development',
  devServer: {
    contentBase: 'public',
  },
  entry: [
    '@babel/polyfill', // enables async-await
    path.join(__dirname, 'src', 'index.js')
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'main.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
	test: /\.(js|jsx)/,
	exclude: /node_modules/,
	use: {
	  loader: "babel-loader"
	}
      }
    ]
  }
}];
