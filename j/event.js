var EventDispatcher = new Object;

EventDispatcher.attachEvent = function( sobject, name, callback_function )
{
	if( sobject.addEventListener )
	{ //Mozilla, Opera
		sobject.addEventListener( name, callback_function, false );
	}
	else if( sobject.attachEvent )
	{ //IE
		sobject['on' + name] = callback_function;
	}
}

EventDispatcher.cancelEvent = function ( event )
{
	if( !event ) return false; 
	
	if ( event.preventDefault )
	{
		event.preventDefault();
		event.stopPropagation();
	}
	else
	{
		event.cancelBubble = true;
		event.returnValue = false;
	}	
}


EventDispatcher.fireEvent = function( eventName )
{
	var eventTypes = { resize : ['HTMLEvents',1,0],
		submit : ['HTMLEvents',1,1],
		click : ['MouseEvents',1,1]
/*		scroll : ['HTMLEvents',1,0],
		focusin : ['HTMLEvents',0,0],
		focusout : ['HTMLEvents',0,0],
		gainselection : ['HTMLEvents',1,0],
		loseselection : ['HTMLEvents',1,0],
		activate : ['HTMLEvents',1,1],
		//events above should be UIEvents, but Mozilla
		//seems does not support this type
		load : ['HTMLEvents',0,0],
		unload : ['HTMLEvents',0,0],
		abort : ['HTMLEvents',1,0],
		error : ['HTMLEvents',1,0],
		select : ['HTMLEvents',1,0],
		change : ['HTMLEvents',1,0],
		reset : ['HTMLEvents',1,0],
		focus : ['HTMLEvents',0,0],
		blur : ['HTMLEvents',0,0],
		mousedown : ['MouseEvents',1,1],
		mouseup : ['MouseEvents',1,1],
		mouseover : ['MouseEvents',1,1],
		mousemove : ['MouseEvents',1,0],
		mouseout : ['MouseEvents',1,0],
		keypress : ['KeyEvents',1,1],
		keydown : ['KeyEvents',1,1],
		keyup : ['KeyEvents',1,1],
		DOMSubtreeModified : ['MutationEvents',1,0],
		DOMNodeInserted : ['MutationEvents',1,0],
		DOMNodeRemoved : ['MutationEvents',1,0],
		DOMNodeRemovedFromDocument : ['MutationEvents',0,0],
		DOMNodeInsertedIntoDocument : ['MutationEvents',0,0],
		DOMAttrModified : ['MutationEvents',1,0],
		DOMCharacterDataModified : ['MutationEvents',1,0],
*/
	};
	eventName = eventName.substr(2);
	if( !eventTypes[eventName] ) return false;
	var evt = document.createEvent( eventTypes[eventName][0] );
	evt.initEvent( eventName, eventTypes[eventName][1], eventTypes[eventName][2] );
	return this.dispatchEvent( evt );
}

EventDispatcher.defineTarget = function( Event )
{
	Event = (Event) ? Event : event;
	return ( Event.target ) ? Event.target : Event.srcElement;
}


/*
function addEvent(elm, evType, fn, useCapture) {
        if (elm.addEventListener) {
                elm.addEventListener(evType, fn, useCapture);
        return true;
        }
        else if (elm.attachEvent) {
                var r = elm.attachEvent('on' + evType, fn);
                return r;
        }
        else {
                elm['on' + evType] = fn;
        }
}
*/