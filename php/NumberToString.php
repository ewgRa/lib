<?php
/**
 * Класс для написания числа прописью
 * @author Eugene Sokolov, ewgra@rambler.ru
 * @example 
 * $NumberToString = new NumberToString();
 * print_r( $NumberToString->Process( 1123987123 ) );
 *  
 */
class NumberToString
{
	const MILLIARD = 1000000000;
	const MILLION = 1000000;
	const THOUSAND = 1000;
	const RUBL = 1;
	var $KOPEYKA = "0.01";
	
	var $Words, $DimensionWords, $DimensionWordsKopeyka;
	var $SymanticLink = array( 
		array( 1 ),
		array( 2, 3, 4 ),
		array( 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900 )
	);
	
	function __construct()
	{
		$this->Words = array(
			0 => 'ноль',
			1 => array( 'один', self::THOUSAND => 'одна', $this->KOPEYKA => 'одна' ),
			2 => array( 'два', self::THOUSAND => 'две', $this->KOPEYKA => 'две' ),
			3 => 'три',
			4 => 'четыре',
			5 => 'пять',
			6 => 'шесть',
			7 => 'семь',
			8 => 'восемь',
			9 => 'девять',
			10 => 'десять',
			11 => 'одиннацать',
			12 => 'двенадцать',
			13 => 'тринадцать',
			14 => 'четырнадцать',
			15 => 'пятнадцать',
			16 => 'шестнадцать',
			17 => 'семнадцать',
			18 => 'восемнадцать',
			19 => 'девятнадцать',
			20 => 'двадцать',
			30 => 'тридцать',
			40 => 'сорок',
			50 => 'пятьдесят',
			60 => 'шестьдесят',
			70 => 'семьдесят',
			80 => 'восемдесят',
			90 => 'девяносто',
			100 => 'сто',
			200 => 'двести',
			300 => 'триста',
			400 => 'четыреста',
			500 => 'пятьсот',
			600 => 'шестьсот',
			700 => 'семьсот',
			800 => 'восемьсот',
			900 => 'девятьсот'
		);		

		$this->DimensionWords = array(
			self::RUBL => array( 'рубль' => &$this->SymanticLink[0], 'рубля' => &$this->SymanticLink[1], 'рублей' => &$this->SymanticLink[2] ),
			self::THOUSAND => array( 'тысяча' => &$this->SymanticLink[0], 'тысячи' => &$this->SymanticLink[1], 'тысяч' => &$this->SymanticLink[2] ),
			self::MILLION => array( 'миллион' => &$this->SymanticLink[0], 'миллиона' => &$this->SymanticLink[1], 'миллионов' => &$this->SymanticLink[2] ),
			self::MILLIARD => array( 'миллиард' => &$this->SymanticLink[0], 'миллиарда' => &$this->SymanticLink[1], 'миллиардов' => &$this->SymanticLink[2] )
		);
		$this->DimensionWordsKopeyka = array(
			"$this->KOPEYKA" => array( 'копейка' => &$this->SymanticLink[0], 'копейки' => &$this->SymanticLink[1], 'копеек' => &$this->SymanticLink[2] ),
			self::THOUSAND => array( 'тысяча' => &$this->SymanticLink[0], 'тысячи' => &$this->SymanticLink[1], 'тысяч' => &$this->SymanticLink[2] ),
			self::MILLION => array( 'миллион' => &$this->SymanticLink[0], 'миллиона' => &$this->SymanticLink[1], 'миллионов' => &$this->SymanticLink[2] ),
			self::MILLIARD => array( 'миллиард' => &$this->SymanticLink[0], 'миллиарда' => &$this->SymanticLink[1], 'миллиардов' => &$this->SymanticLink[2] )
		);
	}
	
	function Process( $Number )
	{
		$N = explode( '.', $Number );
		$R = self::ProcessD( $N[0], $this->DimensionWords );
		if( array_key_exists( 1, $N ) )
		{
			if( strlen( $N[1] ) == 1 ) $N[1] *= 10;
			$R = array_merge( $R, self::ProcessD( $N[1] / 100, $this->DimensionWordsKopeyka ) );
		}
		else 
		{
//			$R = array_merge( $R, array( 'ноль', 'копеек' ) );
		}
		return $R;
	}
	
	function ProcessD( $Number, $DimensionWords )
	{
		$Result = array();
		end( $DimensionWords );
		for( $i=0; $i<count( $DimensionWords ); $i++ )
		{
			$Dimension = key( $DimensionWords );
			$Count = floor( $Number / $Dimension );
			
			if( $Count == 0 )
			{
				prev( $DimensionWords );
				continue;
			}
			$LastNumber = null;
			$Result = array_merge( $Result, $this->getString( $Count, $Dimension, $LastNumber ) );
			$DimensionResult = $this->getDimensionalityString( $LastNumber, $Dimension, $DimensionWords );
			if( $DimensionResult ) $Result = array_merge( $Result, array( $DimensionResult ) );
			$Number -= $Count * $Dimension;
			prev( $DimensionWords );
		}
		return $Result;
	}
	

	/**
	 * Функция возвращает числа в строковом виде в зависимости от размерности
	 * @example 133 => сто тридцать три
	 *
	 * @param int $Number
	 * @param int $dec
	 * @param int $LastNumber последнее число, необходимо для выяснения падежа размерности
	 * @return string
	 */
	function getString( $Number, $dec, &$LastNumber )
	{
		$Result = array();
		if( $Number == 0 ) return $Result;
		
		if( array_key_exists( (string)$Number, $this->Words ) )
		{
			$Result[] = $this->getSingleString( $Number, $dec );
			$LastNumber = $Number;
		}
		else 
		{
			$Step = 0;
			if( $Number >= self::MILLIARD ) $Step = self::MILLIARD;
			elseif( $Number >= self::MILLION ) $Step = self::MILLION;
			elseif( $Number >= self::THOUSAND ) $Step = self::THOUSAND;
			elseif( $Number >= 100 ) $Step = 100;
			elseif( $Number >= 10 ) $Step = 10;
			elseif( $Number >= 1 ) $Step = 1;
			else die( __FILE__ . __LINE__ ); 
			
			$Count = floor( $Number / $Step );
			if( $Step < self::THOUSAND ) $Result = array_merge( $Result, $this->getString( (string)$Count * $Step, $dec, $LastNumber ) );
			else $Result = array_merge( $Result, $this->getString( (string)$Count, $dec, $LastNumber ) );
			
			$Number -= $Count * $Step;
			$Result = array_merge( $Result, $this->getString( $Number, $dec, $LastNumber ) );
		}
		return $Result;
	}
	

	/**
	 * Функция фозвращает количество строкой в нужном падеже ( "один", "одна" ) для $Number
	 * @example 1 => "один" миллион, 1 => "одна" тысяча
	 *
	 * @param int $Number
	 * @param int $dec размерность числа, тысяча, миллион и т.п.
	 * @return string
	 */
	function getSingleString( $Number, $dec )
	{
		$Result = '';
		if( is_array( $this->Words[$Number] ) && array_key_exists( $dec, $this->Words[$Number] ) )
		{
			$Result = $this->Words[$Number][$dec];
		}
		elseif( is_array( $this->Words[$Number] ) && array_key_exists( 0, $this->Words[$Number] ) ) 
		{
			$Result = $this->Words[$Number][0];
		}
		else $Result = $this->Words[$Number];
		return $Result;
	}
	
	/**
	 * Функция фозвращает размерность в нужном падеже в зависимости от количества ( "тысяча", "тысяч" ) для $Number
	 * @example 5 => пять "тысяч", 1 => одна "тысяча"
	 *
	 * @param int $Number
	 * @param int $dec размерность числа, тысяча, миллион и т.п.
	 * @return string
	 */
	function getDimensionalityString( $Number, $dec, $DimensionWords )
	{	
		if( array_key_exists( $dec, $DimensionWords ) )
		{
			foreach( $DimensionWords[$dec] as $k => $v )
			{
				if( in_array( $Number, $v ) ) return $k;
			}
		}
		return null;
	}
}
?>