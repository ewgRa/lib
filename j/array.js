/*Array.prototype.toString = Object.prototype.toString = function()
{
	ArrayToString( this );
}*/


ArrayToString = function( array_var, level )
{
	var separator = ' ';
	if( !level ) level = 1;
	var v = '\n' + separator.Copy( level - 1 ) + '{\n';
	var Parts = new Array();
	for ( var k in array_var ) 
	{
		if ( array_var[k].constructor == String ) 
			Parts.push( separator.Copy( level ) + k + ' : ' + array_var[k].toString() );
		else 
			Parts.push( separator.Copy( level ) + k + ' : ' + ArrayToString( array_var[k], level + 1 ) );
	}
	v += Parts.join( ',\n' );
	v += '\n' + separator.Copy( level - 1 ) + '}';
	return v;
}


buildURL = function( SArray )
{
	var Result = SArray['path_hash'].join( '/' );
	var query_hash = new Array();
	for( hash in SArray['query_hash'] )
	{
		if( SArray['query_hash'][hash] != null && SArray['query_hash'][hash].constructor == String ) query_hash.push( hash + '=' + SArray['query_hash'][hash] );
	}
	if( query_hash.length ) Result += '?' + query_hash.join( '&' );
	return Result;
}