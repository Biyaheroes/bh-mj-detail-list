require( "graceful-fs" ).gracefulify( require( "fs" ) );

const llamalize = require( "llamalize" );
const path = require( "path" );
const webpack = require( "webpack" );

const HotModuleReplacementPlugin = webpack.HotModuleReplacementPlugin;
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const BowerResolvePlugin = require( "bower-resolve-webpack-plugin" );

const mode = process.env.NODE_ENV;
const directory = process.cwd( );

module.exports = function build( parameter ){
	parameter = parameter || { };

	return {
		"entry": parameter.test? "./test.js" : "./detail-list.support.js",

		"resolve": {
			"descriptionFiles": [
				"bower.json",
				"package.json"
			],
			"modules": [
				"bower_components",
				"node_modules"
			],
			"mainFields": [
				"support",
				"browser",
				"module",
				"main"
			],
			"plugins": [ new BowerResolvePlugin( ) ]
		},

		"output": {
			"library": parameter.test? "test" : "detail-list",
			"libraryTarget": "umd",
			"filename": parameter.test? "test.deploy.js" : "detail-list.deploy.js"
		},

		"module": {
			"rules": [
				{ "test": /\.css$/, "loaders": [ "style-loader?singleton", "css-loader", "resolve-url-loader" ] },
				{ "test": /\.(ttf|svg|eot|woff2?)$/, "loaders": [ "url-loader" ] }
			]
		},

		"externals": {
			"React": "react",
			"ReactDOM": "react-dom",
			"$": "jquery",
			"jQuery": "jquery"
		},

		"plugins": [
			( ( mode === "production" || mode === "test" )? new UglifyJsPlugin( {
				"compress": {
					"keep_fargs": true,
					"keep_fnames": true,
					"warnings": false
				},
				"comments": false,
				"sourceMap": true,
				"mangle": false
			} ) : null ),

			( mode === "test"? new HotModuleReplacementPlugin( ) : null )
		].filter( ( plugin ) => { return !!plugin; } ),

		"devtool": "#source-map",

		"stats": { "warnings": false },

		"devServer": {
			"clientLogLevel": "none",
			"compress": true,
			"historyApiFallback": {
				"index": "test-index.html",
				"rewrites": [
					{ "from": /^\/.*/, "to": "test-index.html" }
				]
			},
			"hot": true,
			"inline": true,
			"port": 4000,
			"stats": { "warnings": false },
			"watchOptions": {
				"aggregateTimeout": 1500,
			}
		}
	}
};
