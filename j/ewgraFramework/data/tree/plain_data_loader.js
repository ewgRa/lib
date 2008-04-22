/**
 * Class for load data from array: 
 	array(
 		array( 'id' => 1, 'parent_id' => null ),
 		array( 'id' => 2, 'parent_id' => 1 ),
 		array( 'id' => 3, 'parent_id' => 2 ),
 		array( 'id' => 4, 'parent_id' => 1 )
 	)
 	
 	to Tree array:
	 	array( 
	 		1 => array( 'id' => 1, 'parent_id' => null ),
	 		2 => array( 'id' => 2, 'parent_id' => 1 ),
	 		3 => array( 'id' => 3, 'parent_id' => 2 ),
	 		4 => array( 'id' => 4, 'parent_id' => 1 )
	 	)
	 and keep TreePath array:
		 array(
		 	'children' => array(
		 		1 => array( 2, 4 ),
		 		2 => array( 3 ),
		 		3 => array(),
		 		4 => array()
		 	),
		 	'parents' => array(
		 		1 => null,
		 		2 => 1,
		 		3 => 2,
		 		4 => 1
		 	),
		 	'levels' => array(
		 		1 => 1,
		 		2 => 2,
		 		3 => 3,
		 		4 => 2
		 	),
		 	'group_levels' => array(
		 		1 => array( 1 ),
		 		2 => array( 2, 4 ),
		 		3 => array( 3 )
		 	)		 	
		 )
 */
function eF_PlainTreeDataLoader_Class()
{
	var TreeData = new Array(), TreeDataIDString = '', TreeDataParentIDString = '';
	var Tree = new Array();
	var TreePath = new Array();
	
	this.setTreeDataIDString = function( String )
	{
		this.TreeDataIDString = String;
	}
	
	this.setTreeDataParentIDString = function( String )
	{
		this.TreeDataParentIDString = String;
	}
	
	this.setArrayData = function( DataArray )
	{
		this.TreeData = DataArray;
	}
	
	/**
	 * Compile tree from Array
	 */
	this.compileTree = function()
	{
		this.Tree = new Array();
		this.TreePath = { 'children' : new Array(), 'parents' : new Array(), 'levels' : new Array(), 'group_levels' : new Array() };
		
		var WithoutParents = new Array();
		
		for( Node in this.TreeData )
		{
			var ArrayNode = this.TreeData[Node];
			this.Tree[ArrayNode[this.TreeDataIDString]] = this.TreeData[Node];
			this.TreePath['parents'][ArrayNode[this.TreeDataIDString]] = ArrayNode[this.TreeDataParentIDString];
			if( ArrayNode[this.TreeDataParentIDString] == null || ArrayNode[this.TreeDataParentIDString] == '' )
			{
				WithoutParents.push( ArrayNode[this.TreeDataIDString] );
			}
		}
		for( NodeID in this.TreePath['parents'] )
		{
			if( !this.TreePath['children'][NodeID] ) this.TreePath['children'][NodeID] = new Array();

			var NodeIDValue = this.TreePath['parents'][NodeID];
			if( NodeIDValue != null && NodeIDValue != '' )
			{
				if( !this.TreePath['children'][NodeIDValue] ) this.TreePath['children'][NodeIDValue] = new Array();
				this.TreePath['children'][NodeIDValue].push( NodeID );
			}
		}
		
		var NextNodes = new Array();
		for( kWithoutParentNode in WithoutParents )
		{
			var WithoutParentNode = WithoutParents[kWithoutParentNode];
			this.TreePath['levels'][WithoutParentNode] = 1;
			for( k in this.TreePath['children'][WithoutParentNode] )
			{
				NextNodes.push( this.TreePath['children'][WithoutParentNode][k] );
			}
		}
		
		if( NextNodes.length )
		{
			this.setLevels( NextNodes );
		}
		
		this.groupLevels();
		
		this.TreeData = null;
	}
	
	this.setLevels = function( Nodes )
	{
		var NextNodes = new Array();
		for( kNode in Nodes )
		{
			this.TreePath['levels'][Nodes[kNode]] = this.TreePath['levels'][this.TreePath['parents'][Nodes[kNode]]] + 1;
			for( k in this.TreePath['children'][Nodes[kNode]] )
			{
				NextNodes.push( this.TreePath['children'][Nodes[kNode]][k] );
			}
		}
		if( NextNodes.length )
		{
			this.setLevels( NextNodes );
		}
	}
	
	this.groupLevels = function( Nodes )
	{
		for( NodeID in this.TreePath['levels'] )
		{
			if( !this.TreePath['group_levels'][this.TreePath['levels'][NodeID]] ) this.TreePath['group_levels'][this.TreePath['levels'][NodeID]] = new Array();
			this.TreePath['group_levels'][this.TreePath['levels'][NodeID]].push( NodeID );
		}
	}
	
	this.getTree = function()
	{
		return this.Tree;
	}
	
	this.getTreePath = function()
	{
		return this.TreePath;
	}
}

/*

var array = new Array( { 'id' : 1, 'parent_id': null },
 		{ 'id' : 2, 'parent_id' : 1 },
 		{ 'id' : 3, 'parent_id' : 2 },
 		{ 'id' : 4, 'parent_id' : 1 } );
 		
var DataProvider = new eF_PlainTreeDataLoader_Class;
DataProvider.setTreeDataIDString( 'id' );
DataProvider.setTreeDataParentIDString( 'parent_id' );
DataProvider.setArrayData( array );
DataProvider.compileTree();

*/
