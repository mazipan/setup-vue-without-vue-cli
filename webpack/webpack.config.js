const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const SRC = path.resolve(__dirname, 'src');
const NODE_ENV = process.env.NODE_ENV;

const IS_DEV = NODE_ENV === 'development';

const resolvePath = function(folderName) {
  return path.resolve(path.join(__dirname, folderName));
};

let plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(NODE_ENV)
    }
  }),
  new VueLoaderPlugin(),
  new HtmlWebpackPlugin({
    title: 'History Search',
    filename: 'index.html',
    inject: true,
    template: resolvePath('/src/index.ejs'),
    minify: {
      removeAttributeQuotes: true,
      collapseWhitespace: true,
      html5: true,
      minifyCSS: true,
      removeComments: true,
      removeEmptyAttributes: true
    },
    environment: process.env.NODE_ENV
  })
];

// plugins for production only
if (!IS_DEV) {
  plugins = plugins.concat([
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css'
    }),
    new CompressionPlugin({
      algorithm: 'gzip'
    }),
    new CopyWebpackPlugin(['static/*'])
  ]);
}

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    path: IS_DEV ? path.resolve(__dirname) : resolvePath('dist'),
    publicPath: IS_DEV ? '/' : '/setup-vue-without-vue-cli/', // assume /setup-vue-without-vue-cli is your production path
    filename: IS_DEV ? '[name].js' : '[name].[hash].js'
  },
  mode: IS_DEV ? 'development' : 'production',
  optimization: {
    runtimeChunk: false,
    splitChunks: {
      chunks: 'all'
    }
  },
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': SRC,
      '~': SRC
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: false
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          IS_DEV ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          IS_DEV ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.sass$/,
        use: [
          IS_DEV ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader?indentedSyntax'
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'babel-loader',
            scss: 'vue-style-loader!css-loader!sass-loader',
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
        }
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins
};
