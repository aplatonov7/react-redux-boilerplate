const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const cssBundle = new ExtractTextPlugin({ filename: 'styles.css', allChunks: true })

module.exports = (env) => {
  const dev = p => (env.dev ? p : null)
  const prod = p => (env.prod ? p : null)
  const clean = arr => arr.filter(e => !!e)

  return {
    devtool: env.dev ? 'cheap-module-eval-source-map' : false,
    entry: clean([
      'babel-polyfill',
      dev('webpack-hot-middleware/client'),
      path.join(__dirname, 'app/index.js'),
    ]),
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/',
    },
    module: {
      loaders: clean([
        dev({
          test: /\.s?css$/,
          loaders: [
            'style',
            `css?modules&importLoaders=1&localIdentName=${
              env.dev ? '[name]__[local]' : '[hash:base64:5]'
            }`,
            'postcss',
            'sass',
          ],
        }),
        prod({
          test: /\.s?css$/,
          exclude: /node_modules/,
          loaders: cssBundle.extract([
            `css?modules&importLoaders=1&localIdentName=${
              env.dev ? '[name]__[local]' : '[hash:base64:5]'
            }`,
            'postcss',
            'sass',
          ]),
        }),
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loaders: ['babel'],
          include: path.join(__dirname, 'app'),
        },
      ]),
    },
    plugins: clean([
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: env.dev ? '"development"' : '"production"',
        },
      }),
      prod(cssBundle),
      prod(new webpack.optimize.DedupePlugin()),
      new webpack.LoaderOptionsPlugin({
        options: {
          postcss() {
            return [autoprefixer({
              browsers: ['> 1%'],
            })]
          },
          sassLoader: {
            includePaths: [path.resolve(__dirname, 'app/styles')],
          },
        },
      }),
      dev(new webpack.HotModuleReplacementPlugin()),
      dev(new webpack.NoErrorsPlugin()),
      prod(new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      })),
    ]),
  }
}
