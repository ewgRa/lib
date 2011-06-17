var Dictionary = new Object();
Dictionary.Words = new Array();

Dictionary.Set = function( Words )
{
	this.Words = Words;	
}

Dictionary.GetWord = function( Alias )
{
	return this.Words[Alias];
}