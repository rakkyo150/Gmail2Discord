function SendMail2() {
  let mailArray = getMailAdress2();
  const query = `{(from:${mailArray[0][0]} label:unread) (from:${mailArray[0][1]} label:unread) (from:${mailArray[0][2]} label:unread) (from:${mailArray[0][3]} label:unread)}`;
  const threads = GmailApp.search(query); // 条件に合う未読のスレッドを取得

  if (threads.length == 0) {
    Logger.log("新規メッセージなし");
    return;
  }

  threads.reverse();
  threads.forEach(function (thread) {
    const messages = thread.getMessages();

    messages.forEach((message) => {
      message.markRead();
      const webhook_url = getWebhookUrl2();

      const option = MakeAllInfoPayload(message, ColorCode.GREEN, true);
      UrlFetchApp.fetch(webhook_url, option);
      Utilities.sleep(1000);
    });
  });
}

function getWebhookUrl2() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getActiveSheet();

  return sheet.getRange(3, 2).getValue(); // セルB3を取得
}

function getMailAdress2() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getActiveSheet();

  return sheet.getRange(3, 3, 1, 4).getValues(); // セルC3からセルF3を取得
}
