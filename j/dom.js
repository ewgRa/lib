var DOM = new Object;

DOM.getElementById = function( id )
{
	return document.getElementById( id );
}


DOM.createElement = function( tag, attributes )
{
	var attribute_string_array = new Array(), element = null, className = null, checked = null, display = '';
	for ( attribute in attributes ) 
	{
		if( attribute == 'class' )
		{
			className = attributes[attribute];
			continue;
		}
		if( attribute == 'display' )
		{
			display = attributes[attribute];
			continue;
		}
		if( attribute == 'checked' )
		{
			checked = attributes[attribute];
			continue;
		}
		attribute_string_array.push( attribute + '="' + attributes[attribute] + '"' );
	}
	
	try
	{	//IE
		element = document.createElement( '<' + tag + ' ' + attribute_string_array.join( ' ' ) + '></' + tag + '>' );
	}
	catch( E )
	{	//Mozilla, etc.
		element = document.createElement( tag );
		for ( attribute in attributes ) 
		{
			element.setAttribute( attribute, attributes[attribute] );
		}
	}
	if( className )	
	{
		element.className = className;
	}
	if( checked )	
	{
		element.defaultChecked = checked;
		element.checked = checked;
	}
	element.style.display = display;
	
	return element;
}

DOM.createTextNode = function( text )
{
	return document.createTextNode( text );
}


DOM.removeAllChild = function( object )
{
	while( object.childNodes.length )
	{
		object.removeChild( object.childNodes[0] );
	}
}