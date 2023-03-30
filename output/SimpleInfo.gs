"use strict";
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
        messages.forEach((message) => {
            const webhook_url = getWebhookUrl4();
            const option = MakeSimpleInfoOption(message, ColorCode.BLUE, true);
            UrlFetchApp.fetch(webhook_url, option);
            Utilities.sleep(1000);
        });
    });
    normalThreads.forEach(function (thread) {
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
