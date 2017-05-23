const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPLugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './scripts/index.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPLugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins() {
                  return [
                    require('cssnext'),
                    require('precss')(),
                    require('autoprefixer')()
                  ];
                },
                sourceMap: true,
              }
            },
            'sass-loader?sourceMap'
          ]
        })
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?name=images/[name].[ext]',
          // 'file-loader?name=[name].[ext]&outputPath=images/',
          {
            loader: 'image-webpack-loader',
            options: {
              query: {
                progressive: true,
                optimizationLevel: 7,
                pngquant: {
                  quality: '65-90',
                  speed: 4
                },
                mozjpeg: {
                  quality: 65
                },
                svgo: {
                  plugins: [
                    {
                      removeViewBox: false
                    },
                    {
                      removeEmptyAttrs: false
                    }
                  ]
                }
              }
            }
          }
        ]
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        exclude: [/images/],
        use: 'file-loader?name=fonts/[name].[ext]'
      },
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    open: true,
    stats: 'errors-only',
    watchContentBase: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Recipe Box',
      minify: {
        collapseWhitespace: false,
      },
      hash: true,
      template: './src/index.html'
    }),
    new ExtractTextPLugin({
      filename: './css/[name].css',
      allChunks: true
    })
  ],
};
