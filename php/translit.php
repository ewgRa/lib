<?php
/*
  Translit PHP class.
  v.1.2 
  12 November 2005

  ---------

  �������������� ������ (���������� �� � ������������ � �������� URL).
  ��������� ����� � ����� ��������, � ������� + ����� ���������� �������������
  ����� �� �������� (������� ����� ������ ��� ����� ������)

  ���������: http://pixel-apes.com/translit

  ---------

  ������ ����� ������ ����� ������������ ��� �����������, 
  ��������, Translit::UrlTranslit("������ ������� �� �����")

  ---------

  * UrlTranslit( $string, $allow_slashes = TR_NO_SLASHES ) 
    -- ������������� ������ � "�������� �������� URL"

  * Supertag( $string, $allow_slashes = TR_NO_SLASHES )    
    -- ������������� ������ � "��������" -- �������� ������� 
       �������������, ��������� �� ��������� ���� � ����.

  * BiDiTranslit( $string, $direction=TR_ENCODE, $allow_slashes = TR_NO_SLASHES ) 
    -- ������������� ������ � "��������� ���������� URL"
       � ������������ ��������������.
       ������ �������� $direction ��������� ������������
       ������ ������� � ��������������� ��������

  * Wikify( $string, $allow_slashes = TR_NO_SLASHES )    
    -- ������������� ������������ ������ � ����-�����
       ��������: "������ ���" => "���������"

  * DeWikify( $string )
    -- ����������� ������������ ��������� ��� �������� ������ �� ����-������
       ��������: "���������" => "������ ���"

  * �� ���� �������� �������� $allow_slashes ��������� ���, ������������ �� ������ "/",
    ��������� ��� ��������������, ���� ������� ��� �� ������

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

  //������ �����������, ����� ������ ����� �������� ����� ::
  function Translit() {}

  //URL transliterating
  function UrlTranslit($string, $allow_slashes = TR_NO_SLASHES)
  {
   $slash = "";
   if ($allow_slashes) $slash = "\/";

   static $LettersFrom = "������������������������";
   static $LettersTo   = "abvgdeziklmnoprstufyejxe";
   static $Consonant = "���������������������";
   static $Vowel = "���������";
   static $BiLetters = array( 
     "�" => "zh", "�"=>"ts", "�" => "ch", 
     "�" => "sh", "�" => "sch", "�" => "ju", "�" => "ja",
   );

   $string = preg_replace("/[_\s\.,?!\[\](){}]+/", "_", $string);
   $string = preg_replace("/-{2,}/", "--", $string);
   $string = preg_replace("/_-+_/", "--", $string);
   $string = preg_replace("/[_\-]+$/", "", $string);
   
   $string = strtolower( $string );
   //here we replace �/� 
   $string = preg_replace("/(�|�)([".$Vowel."])/", "j\\2", $string);
   $string = preg_replace("/(�|�)/", "", $string);
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
    "�" => "A",  "�" => "B",  "�" => "V",  "�" => "G",  "�" => "D",  "�" => "E",  "�" => "JO",  "�" => "ZH",  "�" => "Z",  "�" => "I",
    "�" => "JJ", "�" => "K",  "�" => "L",  "�" => "M",  "�" => "N",  "�" => "O",  "�" => "P",   "�" => "R",   "�" => "S",  "�" => "T",
    "�" => "U",  "�" => "F",  "�" => "KH",  "�" => "C",  "�" => "CH", "�" => "SH", "�" => "SHH", "�" => "_~",   "�" => "Y",  "�" => "_'",
    "�" => "EH", "�" => "JU", "�" => "JA", "�" => "a",  "�" => "b",  "�" => "v",  "�" => "g",   "�" => "d",   "�" => "e",  "�" => "jo",
    "�" => "zh", "�" => "z",  "�" => "i",  "�" => "jj", "�" => "k",  "�" => "l",  "�" => "m",   "�" => "n",   "�" => "o",  "�" => "p",
    "�" => "r",  "�" => "s",  "�" => "t",  "�" => "u",  "�" => "f",  "�" => "kh",  "�" => "c",   "�" => "ch",  "�" => "sh", "�" => "shh",
    "�" => "~",  "�" => "y",  "�" => "'",  "�" => "eh", "�" => "ju", "�" => "ja", " " => "__", "_" => "__", );
   static $DeTran = array (
    "A"    => "�",   "B"    => "�",  "V"    => "�",  "G"    => "�",  "D"    => "�",  "E"    => "�",  "JO"   => "�",  "ZH"   => "�",
    "Z"    => "�",   "I"    => "�",  "JJ"   => "�",  "K"    => "�",  "L"    => "�",  "M"    => "�",  "N"    => "�",  "O"    => "�",
    "P"    => "�",   "R"    => "�",  "S"    => "�",  "T"    => "�",  "U"    => "�",  "F"    => "�",  "KH"    => "�",  "C"    => "�",
    "CH"   => "�",   "SHH"  => "�",  "SH"   => "�",  "Y"    => "�",  "EH"   => "�",  "JU"   => "�",  "_'"=>"�", "_~"=>"�",
    "JA"   => "�",   "a"    => "�",  "b"    => "�",  "v"    => "�",  "g"    => "�",  "d"    => "�",  "e"    => "�",  "jo"   => "�",
    "zh"   => "�",   "z"    => "�",  "i"    => "�",  "jj"   => "�",  "k"    => "�",  "l"    => "�",  "m"    => "�",  "n"    => "�",
    "o"    => "�",   "p"    => "�",  "r"    => "�",  "s"    => "�",  "t"    => "�",  "u"    => "�",  "f"    => "�",  "kh"    => "�",
    "c"    => "�",   "ch"   => "�",  "shh"  => "�",  "sh"   => "�",  "~"    => "�",  "y"    => "�",  "'"    => "�",  "eh"   => "�",
    "ju"   => "�",   "ja"   => "�",  "__" => " ", );            

   if ($direction==TR_ENCODE) 
   {
     $string = preg_replace("/[^\- _0-9a-zA-Z\xC0-\xFF��".$slash."]/", "", $string);
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
  // "������ ���" => "���������"
  function Wikify( $string, $allow_slashes = TR_NO_SLASHES)
  {
    $slash = "";
    if ($allow_slashes) $slash = "\/";
    $string = preg_replace("/[^\- 0-9a-zA-Z\xC0-\xFF��".$slash."]+/", " ", $string);
    // wordglue
    $strings = explode( " ", $string );
    foreach( $strings as $k=>$v )
      $strings[$k] = ucfirst($v);
    $string = implode("",$strings);
    return $string;
  }

  // Reconstruct string by given wiki address
  // "���������" => "������ ���"
  // "-"   -- nomatter "����-����"
  // "0-9" -- nomatter "R 3 ������", "� 13 ���" "� ������" "���� ���������"
  function Dewikify( $string )
  {
    $string = preg_replace( "/([^\-\/])([A-Z�����Ũ��������������������������]".
                                       "[a-z��������������������������������0-9])/", "$1 $2", $string );
    $string = preg_replace( "/([^0-9 \-\/])([0-9])/", "$1 $2", $string );
    return $string;
  }

}
?>