<?php
	/**
	 * Класс, реализующий постраничную навигацию
	 */
	class Pager
	{
		/**
		 * Получить данные для построения постраничной навигации
		 * @param int $Count - количество елементов
		 * @param int $ItemsPerPage - элементов на странице
		 * @param int $ActivePage - текущая, выбранная страница
		 * @param int $Radius - радиус навигации
		 * @return array
		 */
		function Get( $Count, $ItemsPerPage, $ActivePage, $Radius = null )
		{
			$PagesCount = ceil( $Count / $ItemsPerPage );
			$Result = array
			( 
				'active_page' => $ActivePage,
				'found_rows' => $Count,
				'pages_count' => $PagesCount,
				'items_per_page' => $ItemsPerPage,
				'pages' => array()
			);
			
			if( !is_null( $Radius ) && $Count )
			{
				for( $i=$ActivePage - $Radius; $i<=$ActivePage+$Radius && $i <= $PagesCount; $i++ )
				{
					if( $i > 0 ) $Result['pages'][] = $i;
				}
			}
			
			return $Result;
		}
	}
?>