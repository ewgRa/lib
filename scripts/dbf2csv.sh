if [ $1 ]
then
	dir=`dirname $0`
	php $dir/../php/dbf2csv.php $1 | iconv -f cp866 -t utf8
else
	echo "Give me dbf file please"
fi