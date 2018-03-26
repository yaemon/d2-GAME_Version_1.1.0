#!/bin/sh

TARGET='./data.js'
if test $# -gt 0 ; then
  TARGET=$1
fi

if test ! -r $TARGET ; then
  echo "Usage: $0 [data.js]" 1>&2
  exit 1
fi

DATA=`mktemp`
RESULT=0

OK_SAMPLE=`dirname $0`/check.result
CHECK=`mktemp`

sed -ne '/"n1": /p;/END_OF_NISHIN_GATTAI/q;' $1 > $DATA

LIST="大天使 女神 霊鳥 魔神 神獣 聖獣 幻魔 破壊神 地母神 鬼神 天使 妖魔 龍王"
LIST=`echo $LIST " 魔獣 妖精 堕天使 妖鬼 鬼女 夜魔 邪神 妖獣 外道 魔王 幽鬼"`

for TARGET in $LIST ; do
	echo $TARGET
	grep $TARGET $DATA | sort | uniq -d
	grep $TARGET $DATA | wc -l
	echo ""
done > $CHECK

for TARGET in $LIST ; do
	echo $TARGET
	grep $TARGET $DATA | awk -F '"' '{printf("%s\n%s\n" ,$4, $8)}' | sort | uniq -c
    echo ""
done >> $CHECK

diff $OK_SAMPLE $CHECK || RESULT=1

if test "$RESULT" = "0"; then
  rm $DATA $CHECK
  exit 0
else
  echo "Possible error incuded" 1>&2
  echo "Please check $DATA, $CHECK" 1>&2
  exit $RESULT
fi
