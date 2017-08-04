"use strict";

const babel = require( "gulp-babel" );
const changed = require( "gulp-changed" );
const debug = require( "gulp-debug" );
const gulp = require( "gulp" );
const plumber = require( "gulp-plumber" );
const rename = require( "gulp-rename" );
const replace = require( "gulp-replace" );
const sourcemap = require( "gulp-sourcemaps" );
const yargs = require( "yargs" );

const clientPattern = /\/\/\:\s*\@client\:(.+?|[^]+?)\/\/\:\s*\@end\-client/gm;
const negateClientPattern = /\/\/\:\s*\@\!client\:(.+?|[^]+?)\/\/\:\s*\@end\-client/gm;
const serverPattern = /\/\/\:\s*\@server\:(.+?|[^]+?)\/\/\:\s*\@end\-server/gm;
const negateServerPattern = /\/\/\:\s*\@\!server\:(.+?|[^]+?)\/\/\:\s*\@end\-server/gm;
const bridgePattern = /\/\/\:\s*\@bridge\:(.+?|[^]+?)\/\/\:\s*\@end\-bridge/gm;
const negateBridgePattern = /\/\/\:\s*\@\!bridge\:(.+?|[^]+?)\/\/\:\s*\@end\-bridge/gm;
const visualPattern = /\/\/\:\s*\@visual\:(.+?|[^]+?)\/\/\:\s*\@end\-visual/gm;
const negateVisualPattern = /\/\/\:\s*\@\!visual\:(.+?|[^]+?)\/\/\:\s*\@end\-visual/gm;
const ignorePattern = /\/\/\:\s*\@ignore\:(.+?|[^]+?)\/\/\:\s*\@end\-ignore/gm;

const ignoreOpenPattern = /\/\/\:\s*\@ignore\:/gm;
const ignoreOpenReplace = "//: @ignore:\n/*";
const ignoreOpenCommentPattern = /\/\/\:\s*\@ignore\:\s*\n\s*\/\*/gm;
const ignoreOpenCommentReplace = "//: @ignore:";
const ignoreClosePattern = /\/\/\:\s*\@end\-ignore/gm;
const ignoreCloseReplace = "*/\n//: @end-ignore";
const ignoreCloseCommentPattern = /\*\/\s*\n\s*\/\/\:\s*\@end\-ignore/gm;
const ignoreCloseCommentReplace = "//: @end-ignore";

let parameter = yargs
	.boolean( "client" )
	.boolean( "server" )
	.boolean( "bridge" )
	.boolean( "visual" )
	.boolean( "jsx" )
	.boolean( "all" )
	.coerce( "module", ( name ) => name.split( /\,/ ) )
	.argv

let list = parameter.module;

gulp.task( "server", function formatServer( ){
	return gulp.src( list.map( ( name ) => `${ name }.module.js` ) )
		.pipe( plumber( ) )
		.pipe( debug( { "title": "Server File:" } ) )
		.pipe( rename( ( path ) => {
			path.basename = path.basename.replace( ".module", "" );
			return path;
		} ) )
		.pipe( replace( negateServerPattern, "" ) )
		.pipe( replace( clientPattern, "" ) )
		.pipe( replace( bridgePattern, "" ) )
		.pipe( replace( visualPattern, "" ) )
		.pipe( changed( "./", {
			"hasChanged": changed.compareContents
		} ) )
		.pipe( debug( { "title": "Server File Done:" } ) )
		.pipe( gulp.dest( "./" ) );
} );

gulp.task( "client", function formatClient( ){
	return gulp.src( list.map( ( name ) => `${ name }.module.js` ) )
		.pipe( plumber( ) )
		.pipe( debug( { "title": "Client File:" } ) )
		.pipe( rename( ( path ) => {
			path.basename = path.basename.replace( ".module", ".support" );
			return path;
		} ) )
		.pipe( replace( negateClientPattern, "" ) )
		.pipe( replace( serverPattern, "" ) )
		.pipe( replace( bridgePattern, "" ) )
		.pipe( replace( visualPattern, "" ) )
		.pipe( sourcemap.init( ) )
		.pipe( babel( ) )
		.pipe( sourcemap.write( "./" ) )
		.pipe( changed( "./", {
			"hasChanged": changed.compareContents,
		} ) )
		.pipe( debug( { "title": "Client File Done:" } ) )
		.pipe( gulp.dest( "./" ) );
} );

gulp.task( "bridge", function formatBridge( ){
	return gulp.src( list.map( ( name ) => `${ name }.module.js` ) )
		.pipe( plumber( ) )
		.pipe( debug( { "title": "Bridge File:" } ) )
		.pipe( rename( ( path ) => {
			path.basename = path.basename.replace( ".module", ".bridge" );
			return path;
		} ) )
		.pipe( replace( negateBridgePattern, "" ) )
		.pipe( replace( serverPattern, "" ) )
		.pipe( replace( clientPattern, "" ) )
		.pipe( replace( visualPattern, "" ) )
		.pipe( replace( ignoreOpenPattern, ignoreOpenReplace ) )
		.pipe( replace( ignoreClosePattern, ignoreCloseReplace ) )
		.pipe( sourcemap.init( ) )
		.pipe( babel( ) )
		.pipe( sourcemap.write( "./" ) )
		.pipe( replace( ignoreOpenCommentPattern, ignoreOpenCommentReplace ) )
		.pipe( replace( ignoreCloseCommentPattern, ignoreCloseCommentReplace ) )
		.pipe( changed( "./", {
			"hasChanged": changed.compareContents,
		} ) )
		.pipe( debug( { "title": "Bridge File Done:" } ) )
		.pipe( gulp.dest( "./" ) );
} );

gulp.task( "visual", function formatVisual( ){
	return gulp.src( list.map( ( name ) => `${ name }.module.js` ) )
		.pipe( plumber( ) )
		.pipe( debug( { "title": "Visual File:" } ) )
		.pipe( rename( ( path ) => {
			path.basename = path.basename.replace( ".module", ".visual" );
			return path;
		} ) )
		.pipe( replace( negateVisualPattern, "" ) )
		.pipe( replace( serverPattern, "" ) )
		.pipe( replace( clientPattern, "" ) )
		.pipe( replace( bridgePattern, "" ) )
		.pipe( replace( ignoreOpenPattern, ignoreOpenReplace ) )
		.pipe( replace( ignoreClosePattern, ignoreCloseReplace ) )
		.pipe( sourcemap.init( ) )
		.pipe( babel( ) )
		.pipe( sourcemap.write( "./" ) )
		.pipe( replace( ignoreOpenCommentPattern, ignoreOpenCommentReplace ) )
		.pipe( replace( ignoreCloseCommentPattern, ignoreCloseCommentReplace ) )
		.pipe( changed( "./", {
			"hasChanged": changed.compareContents,
		} ) )
		.pipe( debug( { "title": "Visual File Done:" } ) )
		.pipe( gulp.dest( "./" ) );
} );

gulp.task( "jsx", function formatJSX( ){
	return gulp.src( list.map( ( name ) => `${ name }.module.jsx` ) )
		.pipe( plumber( ) )
		.pipe( debug( { "title": "JSX File:" } ) )
		.pipe( rename( ( path ) => {
			path.basename = path.basename.replace( ".module", "" );
			return path;
		} ) )
		.pipe( replace( ignorePattern, "" ) )
		.pipe( changed( "./", {
			"hasChanged": changed.compareContents
		} ) )
		.pipe( debug( { "title": "JSX File Done:" } ) )
		.pipe( gulp.dest( "./" ) );
} );

let defaultTask = [ ];
if( parameter.all ){
	defaultTask.push( "server" );
	defaultTask.push( "client" );

}else if( parameter.server ){
	defaultTask.push( "server" );

}else if( parameter.client ){
	defaultTask.push( "client" );

}else if( parameter.bridge ){
	defaultTask.push( "bridge" );

}else if( parameter.visual ){
	defaultTask.push( "visual" );

}else if( parameter.jsx ){
	defaultTask.push( "jsx" );

}else{
	throw new Error( "no task specified" );
}

gulp.task( "default", defaultTask );
