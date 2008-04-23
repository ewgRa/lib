var Localizer = new Object();
Localizer.Languages = new Array();

Localizer.SetLanguages = function( Languages )
{
	this.Languages = Languages;	
}

Localizer.AddLanguage = function( id, abbr )
{
	this.Languages[id] = abbr;	
}

Localizer.GetLanguages = function()
{
	return this.Languages;
}