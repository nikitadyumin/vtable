/**
 * Created by ndyumin on 25.12.2015.
 */
module.exports = {
    entry: "./src/vtable.js",
    output: {
        libraryTarget: "umd",
        path: './dist',
        filename: "vtable.js"
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