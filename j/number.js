Number.prototype.formatNumber = String.prototype.formatNumber = function()
{
	var number = this.toString();
	number = number.split( '.' );
	if( number.length == 1 ) number[1] = '00';
	else if( number[1].length == 1 ) number[1] += '0';
	number = number.join( '.' );
	return number;
}