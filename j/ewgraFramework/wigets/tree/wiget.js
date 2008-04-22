function eF_TreeWiget_Class()
{
	var DataProvider, Renderer;
	
	this.setDataProvider = function( DataProvider )
	{
		this.DataProvider = DataProvider;
	}
	
	this.Render = function( Container, NodeList, Level )
	{
		var Tree = this.DataProvider.getTree();
		var TreePath = this.DataProvider.getTreePath();
		if( !NodeList )
		{
			NodeList = TreePath['group_levels'][1];
			Level = 1;
		}
		
		for( kNode in NodeList )
		{
			NodeContainer = this.Renderer.RenderNodeContainer( Tree[NodeList[kNode]] );
			NodeTitleContainer = this.Renderer.RenderNodeTitleContainer( Tree[NodeList[kNode]] );
			NodeChildrenContainer = this.Renderer.RenderNodeChildrenContainer( Tree[NodeList[kNode]] );

			Container.appendChild( NodeContainer );
			NodeContainer.appendChild( NodeTitleContainer );
			NodeContainer.appendChild( NodeChildrenContainer );

			if( TreePath['children'][NodeList[kNode]].length )
			{
				this.Render( NodeChildrenContainer, TreePath['children'][NodeList[kNode]], Level + 1 );
			}
		}
	}
}