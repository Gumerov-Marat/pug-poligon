module.exports = function () {
  return {
    module: {
      rules: [{
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        include: [/fonts/],
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        },
      }, ],
    },

  };
};