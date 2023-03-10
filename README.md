# Gmail2Discord

## 概要
定期的に未読のGmailのメールをDiscordに投げるGASのスクリプト。<br>
送信元のメールアドレスごとに受信できるチャンネルを変えることができます。<br>
現在３チャンネルに分けることが可能。<br>
そのうち２チャンネルには３つのメールアドレスを登録することができます。<br>
残りの１チャンネルにはそれ以外のメールアドレスからのメールをすべて投げます。<br>
要望があれば拡張方法のREADMEを書くかもですが、なければ多分やらないです。<br>
~~スクショとか撮るのメンドクサイ。~~<br>
製作にあたって参考にさせていただいたサイト:https://note.com/lispict/n/n674157c0ebb8

## 使用方法
### 方法１
```bash
# リポジトリをクローン
$ git clone https://github.com/rakkyo150/Gmail2Discord
$ cd Gmail2Discord

# パッケージをインストール
# productionオプションを付けるとhuskyでエラーになるので付けない
$ npm install

# claspを導入
$ npm install -g @google/clasp
# ローカルインストールの場合は、以下のclaspコマンドの前にnpxをつけてください

$ clasp login
# 表示にしたがってログイン

$ clasp create
# "Create which script"はsheetsを選択

$ clasp push
```
以下[共通](#共通)へ

### 方法２
受け取りたいGmailのGoogle アカウントにログインしたうえで、Google スプレッドシートを開いてください。<br>
スプレッドシートを新規作成して、拡張機能->Apps Scriptを開きます。<br>
GitHubアカウントを持っている方は、[Google Apps Script GitHub アシスタント](https://chrome.google.com/webstore/detail/google-apps-script-github/lfjcgcmkmjjlieihflfhjopckgpelofo?hl=ja)を導入してこのリポジトリをフォークしてプルして`output`以下のgsファイルを取り出す方法があります。<br>
そうじゃない人は`output/*.gs`を頑張ってコピペしてください。

以下[共通](#共通)へ

### 共通
スクリプトを自分のスクリプトエディタに移し終わったら、一旦スクリプトと連携しているスプレッドシートへ移動します。<br>
方法１でやった方は、Gmail2Discordというスプレッドシートがあるのでそれを開いてください。<br>
スプレッドシートのA列はコードとは関係ないので、適当に好きなインデックス名を記入してください。<br>
B列には通知を送りたいディスコードチャンネルのwebhookのURLを追加してください。<br>
webhookのurlの取得方法については[公式の解説](https://support.discord.com/hc/ja/articles/228383668-%E3%82%BF%E3%82%A4%E3%83%88%E3%83%AB-Webhooks%E3%81%B8%E3%81%AE%E5%BA%8F%E7%AB%A0)や先ほど紹介した[サイト](https://note.com/lispict/n/n674157c0ebb8)などを参考にしてみてください。<br>
メンション不要なものはC2,D2,E2,F2に、メンションが必要なものは、C3,D3,E3,F3に、そのほかのメールとは区別して受け取りたいメールのメールアドレスをそれぞれ追加してください。<br>
また、重要そうな件名のメールを受け取りたいディスコードチャンネルのwebhookをB4に追加してください。<br>
C1からF1や C4からF4は空欄になりますが、問題ありません。<br>
逆に、C2からF2やC3からF3はすべて記入してください。<br>

再びスクリプトエディタに戻ってきます(スプレッドシートの拡張機能->Apps Script)。<br>
`main.gs`に移動して実行する関数を`MainFunction`に設定して実行してみてください。<br>
[下の動作](#具体的な動作)どおり動いたらOK。<br>
あとはトリガーから定期的に`MainFunction`を呼び出す設定をしてやれば自動化できます。<br>

## 具体的な動作
C2,D2,E2,F2に記入したメールアドレスが送信元の未読メールをB2で記入したディスコードチャンネルのwebhookに送ります。<br>
メンションを付けたい場合は、C3,D3,E3,F3に記入したメールアドレスが送信元の未読メールはB3で記入したディスコードチャンネルのwebhookに送ります。<br>
また、重要そうな件名のものは、B4に記入したディスコードチャンネルのwebhookに送ります。<br>
そのほかの未読メールはすべてB1に記入したディスコードチャンネルのwebhookに送ります。<br>

## For Developer
コンパイル環境がない方のために、[husky](https://www.npmjs.com/package/husky)を使って、コンパイルを忘れていた場合はコミット後にコンパイルするようにしています。<br>
そのため、コミット後に差分確認をお願いします。<br>
また、`tsc -w`の代わりに`npm run watch`も使えるようにしてるので、お好みで使用してください。<br>