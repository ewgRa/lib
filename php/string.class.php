<?php
	class String
	{
		static $Replacement = array(
			'а' => 'a', 'б' => 'b', 'в' => 'v', 'г' => 'g', 'д' => 'd', 'е' =>'e', 'ё' => 'e', 'ж' => 'zh', 'з' => 'z', 'и' => 'i', 'й' => 'i', 'к' => 'k', 'л' => 'l', 'м' => 'm', 'н' => 'n', 'о' => 'o', 'р' => 'r', 'п' => 'p', 'с' => 's', 'т' => 't', 'у' => 'u', 'ф' => 'f', 'х' => 'h', 'ц' => 'ts', 'ч' => 'ch', 'ш' => 'ch', 'щ' => 'sch', 'ь' => '', 'ъ' => '', 'э' => 'e', 'ю' => 'ju', 'я' => 'ja', 'ы' => 'y',
			'А' => 'A', 'Б' => 'B', 'В' => 'V', 'Г' => 'G', 'Д' => 'D', 'Е' =>'E', 'Ё' => 'E', 'Ж' => 'Zh', 'З' => 'Z', 'И' => 'I', 'Й' => 'I', 'К' => 'K', 'Л' => 'L', 'М' => 'M', 'Н' => 'N', 'О' => 'O', 'П' => 'P', 'Р' => 'R', 'С' => 'S', 'Т' => 'T', 'У' => 'U', 'Ф' => 'F', 'Х' => 'H', 'Ц' => 'Ts', 'Ч' => 'Ch', 'Ш' => 'Ch', 'Щ' => 'ScH', 'Ь' => '', 'Ъ' => '', 'Э' => 'E', 'Ю' => 'Ju', 'Я' => 'Ja', 'Ы' => 'Y' 
		);

		function &Translit( $String )
		{
			$String = strtr( $String, self::$Replacement );
			return $String;
		}

		
		function URLTranslit( $String )
		{
			$String = String::Translit( $String );
			$String = mb_ereg_replace( '\.', '_', $String );
			$String = mb_ereg_replace( '[^\w^\s]', '', $String );
			$String = preg_replace( '/\s/', '_', $String );
			$String = str_replace( '__', '_', $String );
			return mb_convert_case( $String, MB_CASE_LOWER );
		}
	}
?>