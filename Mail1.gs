function Mail1(){
 var mailArray=getMailAdress1();
 const query=`{(from:${mailArray[0][0]} label:unread) (from:${mailArray[0][1]} label:unread)}`
 const threads = GmailApp.search(query);  // 条件に合う未読のスレッドを取得

 if (threads.length == 0) {
   Logger.log('新規メッセージなし');
   return
 }

 threads.forEach(function (thread) {
   const messages = thread.getMessages();

   const payloads = messages.map(function (message) {
     message.markRead();
     const webhook_url = getWebhookUrl1();

     NotifyDiscord(webhook_url,message);
   })

   Logger.log(payloads);
   UrlFetchApp.fetchAll(payloads);
 })
}


function getWebhookURL1() {
 const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
 const sheet = spreadsheet.getActiveSheet();

 return sheet.getRange(2, 2).getValue();  // セルB2を取得
}

function getMailAdress1(){
  const spreadsheet=SpreadsheetApp.getActiveSpreadsheet();
  const sheet=spreadsheet.getActiveSheet();

  return sheet.getRange(2,3,1,2).getValues(); // セルC2からセルD2を取得
}