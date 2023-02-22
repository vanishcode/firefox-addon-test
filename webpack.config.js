const path = require('path')
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        port: 9000,
        client: {
            logging: 'info',
        },
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                include: path.resolve(__dirname),
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                "targets": "defaults"
                            }],
                            '@babel/preset-react'
                        ]
                    }
                }]
            }
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src', 'index.html'),
                    to: path.resolve(__dirname, 'dist', 'index.html')
                },
                {
                    from: path.resolve(__dirname, 'src', 'style.css'),
                    to: path.resolve(__dirname, 'dist', 'style.css')
                },
                {
                    from: path.resolve(__dirname, 'static', '_locales'),
                    to: path.resolve(__dirname, 'dist', '_locales')
                },
                {
                    from: path.resolve(__dirname, 'static', 'icons'),
                    to: path.resolve(__dirname, 'dist', 'icons')
                },
                {
                    from: path.resolve(__dirname, 'static', 'manifest.json'),
                    to: path.resolve(__dirname, 'dist', 'manifest.json')
                },
            ],
        }),
    ],
}