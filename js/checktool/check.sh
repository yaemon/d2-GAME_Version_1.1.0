#!/bin/sh
FILE="./check.txt"

LIST="大天使 女神 霊鳥 魔神 神獣 聖獣 幻魔 破壊神 地母神 鬼神 天使 妖魔 龍王"
LIST=`echo $LIST " 魔獣 妖精 堕天使 妖鬼 鬼女 夜魔 邪神 妖獣 外道 魔王 幽鬼"`

for TARGET in $LIST ; do
	echo $TARGET
	grep $TARGET $FILE | sort | uniq -d
	grep $TARGET $FILE | wc -l
	echo ""
done

for TARGET in $LIST ; do
	echo $TARGET
	grep $TARGET $FILE | awk -F '"' '{printf("%s\n%s\n" ,$4, $8)}' | sort | uniq -c
    echo ""
done
