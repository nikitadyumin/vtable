/**
 * Created by ndyumin on 25.12.2015.
 */
module.exports = {
    entry: "./src/index.js",
    output: {
        //libraryTarget: "umd",
        path: './dist',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader'
            }
        ]
    }
};