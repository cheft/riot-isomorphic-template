var fs      = require('fs');
var path    = require('path');
var webpack = require('webpack');

var config = {
    entry: {
    	main: [
            'webpack/hot/dev-server',
            path.resolve(__dirname, 'client.js')
        ]
    },
    output: {
        path: path.resolve(__dirname, 'public/assets/js'),
        filename: 'app.js',
        publicPath: "/assets/js/"
    },
    plugins: [
	    new webpack.ProvidePlugin({
	    	riot: 'riot'
	    })
	],
	module: {
	    preLoaders: [
	      { test: /\.html$/, exclude: /node_modules/, loader: 'riotjs-loader', query: { type: 'none' } }
	    ]
	}
};

var recurse = function(dir, root) {
    fs.readdirSync(dir).forEach(function(file) {
        var filename = path.join(dir, file), ext;
        if (fs.statSync(filename).isDirectory()) {
            recurse(filename, root);
        } else {
            ext = path.extname(filename);
            if (ext === '.html') {
                filename = path.relative(root, filename)
                filename = path.join(path.dirname(filename), path.basename(filename, ext));
                var e = filename.replace(/\\/g, '/');
                config.entry.main.push(path.resolve(root, e + '.html')); 
            }
        }
    })
}
recurse('./app', './');

module.exports = config;