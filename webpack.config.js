import path from 'path'
import webpack from 'webpack'
import autoprefixer from 'autoprefixer'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const cssBundle = new ExtractTextPlugin({ filename: 'styles.css', allChunks: true })

export const dist = path.join(__dirname, 'dist')

export default (env) => {
  const dev = p => (env.dev ? p : null)
  const prod = p => (env.prod ? p : null)
  const clean = arr => arr.filter(e => !!e)

  const cssLoader = clean([
    dev('style'),
    `css?modules&importLoaders=1&localIdentName=${
      env.dev ? '[name]__[local]' : '[hash:base64:5]'
    }`,
    'postcss',
    'sass',
  ])

  return {
    devtool: env.dev ? 'cheap-module-eval-source-map' : false,
    entry: clean([
      'babel-polyfill',
      dev('webpack-hot-middleware/client'),
      path.join(__dirname, 'app/index.js'),
    ]),
    output: {
      path: dist,
      filename: 'main.js',
      publicPath: '/',
    },
    module: {
      loaders: clean([
        {
          test: /\.s?css$/,
          loaders: env.dev ? cssLoader : cssBundle.extract(cssLoader),
        },
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
