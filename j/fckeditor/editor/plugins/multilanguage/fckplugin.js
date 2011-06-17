// ChangeLanguage command
var FCKChangeLanguageCommand = function()
{
	this.Name = 'ChangeLanguageCommand';
}
FCKChangeLanguageCommand.prototype.GetState = function()
{
	return FCK_TRISTATE_ON;
}
FCKChangeLanguageCommand.prototype.Execute = function( LanguageID, Combo )
{
	var Combo = FCK.EditorWindow.parent.FCKToolbarItems.GetItem('ChangeLanguage')._Combo;
	Combo.DeselectAll();
	Combo.SelectItem( LanguageID );
	Combo.SelectItemByLabel( LanguageID );
	Combo.value = LanguageID;
	FCK.Events.FireEvent( "OnChangeLanguage" ) ;
}
FCKCommands.RegisterCommand( 'ChangeLanguageCommand' , new FCKChangeLanguageCommand() ) ;


// Combobox realization
var FCKToolbarChangeLanguageCombo = function( tooltip, style )
{
	this.CommandName = 'ChangeLanguageCommand';
	this.Label		= this.GetLabel() ;
	this.Tooltip	= tooltip ? tooltip : this.Label ;
	this.Style		= style ? style : FCK_TOOLBARITEM_ICONTEXT ;

	this.PanelWidth = 150;
}

// Inherit from FCKToolbarSpecialCombo.
FCKToolbarChangeLanguageCombo.prototype = new FCKToolbarSpecialCombo ;


FCKToolbarChangeLanguageCombo.prototype.GetLabel = function()
{
	return FCKLang.ChooseLanguageLabel;
}

FCKToolbarChangeLanguageCombo.prototype.CreateItems = function( targetSpecialCombo )
{
	targetSpecialCombo.FieldWidth = 150;
}

FCKToolbarItems.RegisterItem( 'ChangeLanguage', new FCKToolbarChangeLanguageCombo() );
