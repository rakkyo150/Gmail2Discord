function SendSimpleInfo() {
  const importantSubjectQuery = `{(subject:重要 label:unread) (subject:再送 label:unread) (subject:確認 label:unread) (subject:至急 label:unread) (subject:緊急 label:unread)}`;
  const importantThreads = GmailApp.search(importantSubjectQuery); // 条件に合う未読のスレッドを取得

  const normalSubjectQuery = "label:unread";
  const normalThreads = GmailApp.search(normalSubjectQuery);

  if (importantThreads.length == 0) {
    Logger.log("importantThreads: 新規メッセージなし");
  }

  if (normalThreads.length == 0) {
    Logger.log("normalThreads: 新規メッセージなし");
  }

  importantThreads.forEach(function (thread) {
    const messages = thread.getMessages();

    const payloads = messages.map(function (message) {
      const webhook_url = getWebhookUrl4();

      return MakeSimpleInfoPayload(webhook_url, message, ColorCode.BLUE, true);
    });

    UrlFetchApp.fetchAll(payloads);
  });

  normalThreads.forEach(function (thread) {
    const messages = thread.getMessages();
    console.log(messages.length);

    const payloads = messages.map(function (message) {
      const webhook_url = getWebhookUrl4();
      console.log(webhook_url);

      return MakeSimpleInfoPayload(webhook_url, message, ColorCode.BLUE, false);
    });

    UrlFetchApp.fetchAll(payloads);
  });
}

function getWebhookUrl4() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getActiveSheet();

  return sheet.getRange(5, 2).getValue(); // セルB5を取得
}
