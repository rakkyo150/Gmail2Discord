function MainFunction() {
  // 全メールのシンプルな情報を通知
  SendSimpleInfo();

  // メンションつけるべき送信先からのメール
  SendMailWithMention();

  // メンションつけるべきメール以外の重要そうなメール
  SendImportantMail();

  SendMailWithoutMention();

  // すべて既読になってしまうので、これは最後に実行する
  SendOtherMail();
}
