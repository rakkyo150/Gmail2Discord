function MainFunction() {
  SendSimpleInfo();
  SendImportantMail();

  SendMail1();
  SendMail2();

  // すべて既読になってしまうので、これは最後に実行する
  SendOtherMail();
}
