"use strict";
function SendOtherMail() {
    const query = "label:unread";
    const threads = GmailApp.search(query); // 未読のスレッドすべてを取得
    Logger.log(threads);
    if (threads.length == 0) {
        Logger.log("新規メッセージなし");
        return;
    }
    threads.forEach(function (thread) {
        const messages = thread.getMessages();
        const payloads = messages.map(function (message) {
            message.markRead();
            const webhook_url = getWebhookUrl();
            return MakeAllInfoPayload(webhook_url, message, ColorCode.CRIMSON, false);
        });
        Logger.log(payloads);
        UrlFetchApp.fetchAll(payloads);
    });
}
function getWebhookUrl() {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getActiveSheet();
    return sheet.getRange(1, 2).getValue(); // セルB1を取得
}
