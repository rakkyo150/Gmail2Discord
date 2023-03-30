"use strict";
function SendSimpleInfo() {
    const importantWords = "{subject:重要 再送 確認 至急 緊急}";
    const importantSubjectQuery = `(${importantWords} label:unread)`;
    const importantThreads = GmailApp.search(importantSubjectQuery); // 条件に合う未読のスレッドを取得
    const notImportantSubjectQuery = `(-${importantWords} label:unread)`;
    const notImportantThreads = GmailApp.search(notImportantSubjectQuery);
    if (importantThreads.length == 0) {
        Logger.log("importantThreads: 新規メッセージなし");
    }
    if (notImportantThreads.length == 0) {
        Logger.log("normalThreads: 新規メッセージなし");
    }
    importantThreads.reverse();
    importantThreads.forEach(function (thread) {
        let messages = thread.getMessages();
        messages.forEach((message) => {
            const webhook_url = getWebhookUrl4();
            const option = MakeSimpleInfoOption(message, ColorCode.BLUE, true);
            UrlFetchApp.fetch(webhook_url, option);
            Utilities.sleep(1000);
        });
    });
    notImportantThreads.reverse();
    notImportantThreads.forEach(function (thread) {
        const messages = thread.getMessages();
        console.log(messages.length);
        messages.forEach((message) => {
            const webhook_url = getWebhookUrl4();
            console.log(webhook_url);
            const option = MakeSimpleInfoOption(message, ColorCode.BLUE, false);
            UrlFetchApp.fetch(webhook_url, option);
            Utilities.sleep(1000);
        });
    });
}
function getWebhookUrl4() {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getActiveSheet();
    return sheet.getRange(5, 2).getValue(); // セルB5を取得
}
