module.exports = ( file, statistic ) => {
	if( ( /node_modules|bower_components/g ).test( file ) ){
		return false;
	}

	return ( file.split( "." ) || [ ] ).reverse( )[ 0 ] in {
		"jsx": true,
		"scss": true,
		"json": true
	};
};
