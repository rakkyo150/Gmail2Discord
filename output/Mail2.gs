"use strict";
function Mail2() {
    let mailArray = getMailAdress2();
    const query = `{(from:${mailArray[0][0]} label:unread) (from:${mailArray[0][1]} label:unread) (from:${mailArray[0][2]} label:unread)}`;
    const threads = GmailApp.search(query); // 条件に合う未読のスレッドを取得
    if (threads.length == 0) {
        Logger.log("新規メッセージなし");
        return;
    }
    threads.forEach(function (thread) {
        const messages = thread.getMessages();
        const payloads = messages.map(function (message) {
            message.markRead();
            const webhook_url = getWebhookUrl2();
            return DiscordNotificationHelper(webhook_url, message, ColorCode.GREEN, true);
        });
        Logger.log(payloads);
        UrlFetchApp.fetchAll(payloads);
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
