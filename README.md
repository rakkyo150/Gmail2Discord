# Gmail2Discord

## 概要
定期的に未読のGmailのメールをDiscordに投げるGASのスクリプト。<br>
送信元のメールアドレスごとに受信できるチャンネルを変えることができます。<br>
現在３チャンネルに分けることが可能。<br>
~~そのうち１チャンネルには２つのメールアドレスを登録することができ、もう１チャンネルには３つのメールアドレスを登録することができます。~~
**そのうち２チャンネルには３つのメールアドレスを登録することができます。(2021/7/21に仕様変更)**<br>
残りの１チャンネルにはそれ以外のメールアドレスからのメールをすべて投げます。<br>
**要望があれば拡張方法のREADMEを書くかもですが、なければ多分やらないです。~~スクショとか撮るのメンドクサイ。~~(2021/7/24に追記)**<br>
製作にあたって参考にさせていただいたサイト:https://note.com/lispict/n/n674157c0ebb8

## 使用方法
受け取りたいGmailのGoogle アカウントにログインしたうえで、Google スプレッドシートを開いてください。<br>
スプレッドシートを新規作成して、上のツールからスクリプトエディターを開きます。<br>
GitHubアカウントを持っている方は、[Google Apps Script GitHub アシスタント](https://chrome.google.com/webstore/detail/google-apps-script-github/lfjcgcmkmjjlieihflfhjopckgpelofo?hl=ja)を導入してこのリポジトリをフォークしてプルするのが一番楽かも。<br>
そうじゃない人は.gsファイルを頑張ってコピペしてください。

スクリプトを自分のスクリプトエディタに移し終わったら、一旦スプレッドシートに戻ります.<br>
スプレッドシートのA列はコードとは関係ないので、適当に好きなインデックス名を記入してください。<br>
B列には通知を送りたいディスコードチャンネルのwebhookのURLを追加してください。<br>
webhookのurlの取得方法については[公式の解説](https://support.discord.com/hc/ja/articles/228383668-%E3%82%BF%E3%82%A4%E3%83%88%E3%83%AB-Webhooks%E3%81%B8%E3%81%AE%E5%BA%8F%E7%AB%A0)や先ほど紹介した[サイト](https://note.com/lispict/n/n674157c0ebb8)などを参考にしてみてください。<br>
~~C2,D2~~ **C2,D2,E2(2021/7/21に仕様変更)** とC3,D3,E3には、そのほかのメールとは区別して受け取りたいメールのメールアドレスをそれぞれ追加してください。<br>
**C1とD1とE1** ~~とE2~~ **(2021/7/21に仕様変更)** は空欄になりますが、問題ありません。<br>

再びスクリプトエディタに戻ってきます。<br>
Main.gsに移動して実行する関数をMainFunctionに設定して実行してみてください。<br>
下の動作どおり動いたらOK。<br>
あとはトリガーから定期的にMainFunctionを呼び出す設定をしてやれば自動化できます。<br>

## 具体的な動作
~~C2,D2~~ **C2,D2,E2(2021/7/21に仕様変更)** に記入したメールアドレスが送信元の未読メールをB2で記入したディスコードチャンネルのwebhookに送ります。<br>
同じように、C3,D3,E3に記入したメールアドレスが送信元の未読メールはC2で記入したディスコードチャンネルのwebhookに送ります。<br>
そのほかの未読メールはすべてA2に記入したディスコードチャンネルのwebhookに送ります。
