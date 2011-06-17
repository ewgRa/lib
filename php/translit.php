<?php
/*
  Translit PHP class.
  v.1.2 
  12 November 2005

  ---------

  Транслитерация ссылок (приведение их в соответствие с форматом URL).
  Латинские буквы и цифры остаются, а русские + знаки препинания преобразуются
  одним из способов (способы нужны каждый для своей задачи)

  Подробнее: http://pixel-apes.com/translit

  ---------

  Методы этого класса можно использовать как статические, 
  например, Translit::UrlTranslit("Свежая новость из цирка")

  ---------

  * UrlTranslit( $string, $allow_slashes = TR_NO_SLASHES ) 
    -- преобразовать строку в "красивый читаемый URL"

  * Supertag( $string, $allow_slashes = TR_NO_SLASHES )    
    -- преобразовать строку в "супертаг" -- короткий простой 
       идентификатор, состоящий из латинских букв и цифр.

  * BiDiTranslit( $string, $direction=TR_ENCODE, $allow_slashes = TR_NO_SLASHES ) 
    -- преобразовать строку в "формально правильный URL"
       с возможностью восстановления.
       Другое значение $direction позволяет восстановить
       строку обратно с незначительными потерями

  * Wikify( $string, $allow_slashes = TR_NO_SLASHES )    
    -- преобразовать произвольную строку в вики-адрес
       например: "Привет мир" => "ПриветМир"

  * DeWikify( $string )
    -- попробовать восстановить примерный вид исходной строки по вики-адресу
       например: "ПриветМир" => "Привет Мир"

  * во всех функциях параметр $allow_slashes управляет тем, игнорировать ли символ "/",
    пропуская его неисправленным, либо удалять его из строки

=============================================================== (Kukutz)

  TODO:
  * strtolower replacement for non-locale systems
*/

define("TR_ENCODE", 0);
define("TR_DECODE", 1);
define("TR_NO_SLASHES", 0);
define("TR_ALLOW_SLASHES", 1);

class Translit
{

  //пустой конструктор, чтобы методы могли работать через ::
  function Translit() {}

  //URL transliterating
  function UrlTranslit($string, $allow_slashes = TR_NO_SLASHES)
  {
   $slash = "";
   if ($allow_slashes) $slash = "\/";

   static $LettersFrom = "абвгдезиклмнопрстуфыэйхё";
   static $LettersTo   = "abvgdeziklmnoprstufyejxe";
   static $Consonant = "бвгджзйклмнпрстфхцчшщ";
   static $Vowel = "аеёиоуыэюя";
   static $BiLetters = array( 
     "ж" => "zh", "ц"=>"ts", "ч" => "ch", 
     "ш" => "sh", "щ" => "sch", "ю" => "ju", "я" => "ja",
   );

   $string = preg_replace("/[_\s\.,?!\[\](){}]+/", "_", $string);
   $string = preg_replace("/-{2,}/", "--", $string);
   $string = preg_replace("/_-+_/", "--", $string);
   $string = preg_replace("/[_\-]+$/", "", $string);
   
   $string = strtolower( $string );
   //here we replace ъ/ь 
   $string = preg_replace("/(ь|ъ)([".$Vowel."])/", "j\\2", $string);
   $string = preg_replace("/(ь|ъ)/", "", $string);
   //transliterating
   $string = strtr($string, $LettersFrom, $LettersTo );
   $string = strtr($string, $BiLetters );

   $string = preg_replace("/j{2,}/", "j", $string);

   $string = preg_replace("/[^".$slash."0-9a-z_\-]+/", "", $string);

   return $string;
  }

  //Supertag cooking
  function Supertag($string, $allow_slashes = TR_NO_SLASHES)
  {
   $slash = "";
   if ($allow_slashes) $slash = "\/";

   $string = Translit::UrlTranslit($string, $allow_slashes);
   $string = preg_replace("/[^".$slash."0-9a-zA-Z\-]+/", "", $string);
   $string = preg_replace("/[\-_]+/", "-", $string);
   $string = preg_replace("/-+$/", "", $string);
   return $string;
  }


  //Bidirectional translit
  function BiDiTranslit($string, $direction=TR_ENCODE, $allow_slashes = TR_NO_SLASHES)
  {
   $slash = "";
   if ($allow_slashes) $slash = "\/";

   static $Tran = array (
    "А" => "A",  "Б" => "B",  "В" => "V",  "Г" => "G",  "Д" => "D",  "Е" => "E",  "Ё" => "JO",  "Ж" => "ZH",  "З" => "Z",  "И" => "I",
    "Й" => "JJ", "К" => "K",  "Л" => "L",  "М" => "M",  "Н" => "N",  "О" => "O",  "П" => "P",   "Р" => "R",   "С" => "S",  "Т" => "T",
    "У" => "U",  "Ф" => "F",  "Х" => "KH",  "Ц" => "C",  "Ч" => "CH", "Ш" => "SH", "Щ" => "SHH", "Ъ" => "_~",   "Ы" => "Y",  "Ь" => "_'",
    "Э" => "EH", "Ю" => "JU", "Я" => "JA", "а" => "a",  "б" => "b",  "в" => "v",  "г" => "g",   "д" => "d",   "е" => "e",  "ё" => "jo",
    "ж" => "zh", "з" => "z",  "и" => "i",  "й" => "jj", "к" => "k",  "л" => "l",  "м" => "m",   "н" => "n",   "о" => "o",  "п" => "p",
    "р" => "r",  "с" => "s",  "т" => "t",  "у" => "u",  "ф" => "f",  "х" => "kh",  "ц" => "c",   "ч" => "ch",  "ш" => "sh", "щ" => "shh",
    "ъ" => "~",  "ы" => "y",  "ь" => "'",  "э" => "eh", "ю" => "ju", "я" => "ja", " " => "__", "_" => "__", );
   static $DeTran = array (
    "A"    => "А",   "B"    => "Б",  "V"    => "В",  "G"    => "Г",  "D"    => "Д",  "E"    => "Е",  "JO"   => "Ё",  "ZH"   => "Ж",
    "Z"    => "З",   "I"    => "И",  "JJ"   => "Й",  "K"    => "К",  "L"    => "Л",  "M"    => "М",  "N"    => "Н",  "O"    => "О",
    "P"    => "П",   "R"    => "Р",  "S"    => "С",  "T"    => "Т",  "U"    => "У",  "F"    => "Ф",  "KH"    => "Х",  "C"    => "Ц",
    "CH"   => "Ч",   "SHH"  => "Щ",  "SH"   => "Ш",  "Y"    => "Ы",  "EH"   => "Э",  "JU"   => "Ю",  "_'"=>"Ь", "_~"=>"Ъ",
    "JA"   => "Я",   "a"    => "а",  "b"    => "б",  "v"    => "в",  "g"    => "г",  "d"    => "д",  "e"    => "е",  "jo"   => "ё",
    "zh"   => "ж",   "z"    => "з",  "i"    => "и",  "jj"   => "й",  "k"    => "к",  "l"    => "л",  "m"    => "м",  "n"    => "н",
    "o"    => "о",   "p"    => "п",  "r"    => "р",  "s"    => "с",  "t"    => "т",  "u"    => "у",  "f"    => "ф",  "kh"    => "х",
    "c"    => "ц",   "ch"   => "ч",  "shh"  => "щ",  "sh"   => "ш",  "~"    => "ъ",  "y"    => "ы",  "'"    => "ь",  "eh"   => "э",
    "ju"   => "ю",   "ja"   => "я",  "__" => " ", );            

   if ($direction==TR_ENCODE) 
   {
     $string = preg_replace("/[^\- _0-9a-zA-Z\xC0-\xFFёЁ".$slash."]/", "", $string);
     $russians = preg_split("/[0-9A-Za-z\_\-\.\/\']+/", $string, -1, PREG_SPLIT_NO_EMPTY);//\xc0-\xff

     for ($i=0;$i<count($russians);$i++)
       $russians[$i] = strtr($russians[$i], $Tran);

     $others = preg_split('/[\xc0-\xff\xa8\xb8 ]+/', $string, -1, PREG_SPLIT_NO_EMPTY); 

     if (preg_match('/[\xc0-\xff\xa8\xb8 ]/', $string[0])) 
     {      
       $fr="russians";
       $sr="others";
       $string = "+";
     } 
     else 
     { 
       $fr="others";
       $sr="russians";
       $string = "";
     }

     for ($i=0;$i<min(count($$fr),count($$sr));$i++)
      $string.=${$fr}[$i]."+".${$sr}[$i]."+";

     if (count($$fr)>count($$sr))
       $string.=${$fr}[count($$fr)-1];
     else
       $string=substr($string,0,strlen($string)-1);
   } 
   else 
   {
     $pgs = explode("/", $string);
     for ($j=0;$j<count($pgs);$j++) 
     {
       $strings = explode("+", $pgs[$j]);
       for ($i=1;$i<count($strings);$i=$i+2)
         $strings[$i] = strtr($strings[$i], $DeTran);
       $pgs[$j] = implode("", $strings);
     }
     $string = implode(($allow_slashes!=TR_NO_SLASHES)?"/":"", $pgs);
   }
   return rtrim($string, "/");
  }



  // Convert string to wiki address
  // "Привет мир" => "ПриветМир"
  function Wikify( $string, $allow_slashes = TR_NO_SLASHES)
  {
    $slash = "";
    if ($allow_slashes) $slash = "\/";
    $string = preg_replace("/[^\- 0-9a-zA-Z\xC0-\xFFёЁ".$slash."]+/", " ", $string);
    // wordglue
    $strings = explode( " ", $string );
    foreach( $strings as $k=>$v )
      $strings[$k] = ucfirst($v);
    $string = implode("",$strings);
    return $string;
  }

  // Reconstruct string by given wiki address
  // "ПриветМир" => "Привет Мир"
  // "-"   -- nomatter "Аква-Парк"
  // "0-9" -- nomatter "R 3 Читать", "С 13 Мая" "С Дороги" "СССР Разрушили"
  function Dewikify( $string )
  {
    $string = preg_replace( "/([^\-\/])([A-ZАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЬЪЫЭЮЯ]".
                                       "[a-zабвгдеёжзийклмнопрстуфхцчшщьъыэюя0-9])/", "$1 $2", $string );
    $string = preg_replace( "/([^0-9 \-\/])([0-9])/", "$1 $2", $string );
    return $string;
  }

}
?>