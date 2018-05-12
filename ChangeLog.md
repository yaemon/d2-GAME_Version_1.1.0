# Change Log
## 2018-05-12 by yaemon
### Fixed
* 「〇〇は何の素材になるか」の検索結果から不適なものを除外
* ファイルリロード時に呼び出される関数定義の位置を修正

### Changed
* javascript ファイルの構成を変更。 
  * script.min.js, script2.min.js → 
  共通ファイル d2-view.js, ロジックファイル summon-search.js, scrifice-search.js
  * data.js, d2-common.js → 
  データ本体 church-data.js, データへのインタフェイス church-interface.js, 
  * autowrite.js → d2-view.js に統合

### Misc
* 構成変更に伴って、殆どのファイルのコーディング・スタイルが変更になった。 
(python, C などのコーダにとっての可読性は上がったが、生粋の javascripter に
とっては可読性が下がったと思います。ごめんなさい)

* 次ヴァージョンで合体費用を表示するためのコード断片がちょこちょこと含まれている。

* 使用する jQuery Core を 1.10.3 から 3.3.1 へ, jquery-ui を 1.12.1 へ
  * jquery3.3.1.slim.js を使ってみたかったけど、jquery-ui の自動補完機能に
  Core の機能が必要だった
  * セキュリティ上の保険になるハッシュ照合を一時的に省略
  * jquery-ui のテーマに従来使われていた cupertio がなかったので smoothness を使用

( jQuery ライブラリについては最善の形がないか試行中の状態で登録してあるものと
ご理解ください。たぶん将来的に最善のかたちで分割されたライブラリが出てくる、
そのときになって互換性で苦しみたくないという理由で
とりあえず現行最新版をいれて動作させているという状態)

## 2018-04-11 by yaemon
### Fixed
* ブラウザのヒストリバックやURL 欄の直接編集時に、
* 追加データに対する処理が為されていなかったのを修正

### Changed
* ブラウザのヒストリに見えるTitle に検索対象を含むよう機能追加
