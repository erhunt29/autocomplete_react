const path = require('path');

module.exports= {
    mode: "development",
    devtool: "source-map",

    entry: [path.join(__dirname, 'src', 'index.js')],

    output: {

        path: path.join(__dirname, 'src'),
        filename: 'bundle.js',
        publicPath: "/static/"

    },

    module: {

        rules: [{

            test : /\.jsx?/,

            loader: 'babel-loader',

            exclude: '/node_modules/'

        }]

    }

};