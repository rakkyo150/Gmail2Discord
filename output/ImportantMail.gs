"use strict";
function SendImportantMail() {
    const importantSubjectQuery = `{(subject:重要 label:unread) (subject:再送 label:unread) (subject:確認 label:unread) (subject:至急 label:unread) (subject:緊急 label:unread)}`;
    const threads = GmailApp.search(importantSubjectQuery); // 条件に合う未読のスレッドを取得
    if (threads.length == 0) {
        Logger.log("新規メッセージなし");
        return;
    }
    threads.forEach(function (thread) {
        const messages = thread.getMessages();
        messages.forEach((message) => {
            const webhook_url = getWebhookUrl3();
            const option = MakeAllInfoPayload(message, ColorCode.GREEN, true);
            UrlFetchApp.fetch(webhook_url, option);
            Utilities.sleep(1000);
        });
    });
}
function getWebhookUrl3() {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getActiveSheet();
    return sheet.getRange(4, 2).getValue(); // セルB4を取得
}
