function NotifyDiscord(webhook_url,message) {
  const from = message.getFrom();
  const subject_bold="**"+message.getSubject()+"**";
  const subject = message.getSubject();
  const plainBody = message.getPlainBody();

  Logger.log(subject);
  const payload = {
    "content": subject_bold,
    "embeds": [{
      "title": subject,
      "color": 5301186,
      "author": {
        "name": from
      },
      "description": plainBody.substr(0, 2048)
    }]
  }
  return {
    url: webhook_url,
    contentType: 'application/json',
    payload: JSON.stringify(payload),
  }
}
