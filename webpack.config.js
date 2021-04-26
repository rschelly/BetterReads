module.exports = {
  mode: process.env.NODE_ENV,
  entry: './client/index.js',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg|ico)$/,
        use: [
          {
            loader: "url-loader",
            options: {
            limit: 8192,
            },
          },
        ],
      },
    ],
  },
  devServer: {
    publicPath: '/public',
    proxy: {
      '/api': 'http://localhost:3000',
      '/db': 'http://localhost:3000',
      '/': 'http://localhost:3000',
    },
    port: 8080,
    proxy: {
      '/api': 'http://localhost:3000/',
      '/db': 'http://localhost:3000',
      '/': 'http://localhost:3000',
    },
  },
};
