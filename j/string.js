String.prototype.BaseHREF = function()
{
	var regexp = /^https?:\/\/[^/]+/;
	return this.replace( regexp, '' );
}

String.prototype.Copy = function( n ) {
	var s = "", t = this.toString();
	while ( --n >= 0) s += t;
	return s;
}

String.prototype.htmlspecialchars = function()
{
	var Str = this;
	Str = Str.replace( '<', '&lt;' );
	Str = Str.replace( '>', '&gt;' );
	Str = Str.replace( '"', '&quot;' );
	return Str;
}

String.prototype.parseURL = function()
{
	var Result = new Array();
	var parts = this.split( '?' );
	
	Result['path_hash'] = new Array();
	var parts_path = parts[0].BaseHREF().split( '/' );
	for( var i=0; i<parts_path.length; i++ )
	{
		Result['path_hash'].push( parts_path[i] );
	}
	
	Result['query_hash'] = new Array();
	if( parts[1] )
	{
		var parts_query = parts[1].split( '&' );
		for( var i=0; i<parts_query.length; i++ )
		{
			parts_query[i].match( /([^=]*)=(.*)/ );
			Result['query_hash'][RegExp.$1] = RegExp.$2;
		}
	}
	return Result;
}