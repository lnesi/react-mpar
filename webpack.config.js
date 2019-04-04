module.exports = {
    entry: './src/Renderer.js',
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        }]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    },
    //This will ignotre this dependencies in the build
    //we want this to be used from the peerDependencies
    externals: {
      'react': 'commonjs react',
      'react-dom': 'commonjs react-dom',
      'react-redux':'commonjs react-redux',
      'redux':'commonjs redux'
    }
};
