function DiscordNotificationHelperCrimson(webhook_url, message) {
  const from = message.getFrom();
  const time = message.getDate();
  const subject_bold = "**" + message.getSubject() + "**";
  const subject = message.getSubject();
  const plainBody = message.getPlainBody();

  Logger.log(subject);
  const payload = {
    "content": subject_bold,
    "embeds": [{
      "title": subject,
      "color": 14423100,
      "author": {
        "name": from
      },
      "description": plainBody.substr(0, 2048),
      "footer": {
        "text": from + "\n" + time
      }
    }]
  }
  return {
    url: webhook_url,
    contentType: 'application/json',
    payload: JSON.stringify(payload),
  }
}

function DiscordNotificationHelperGold(webhook_url, message) {
  const from = message.getFrom();
  const time = message.getDate();
  const subject_bold = "**" + message.getSubject() + "**";
  const subject = message.getSubject();
  const plainBody = message.getPlainBody();

  Logger.log(subject);
  const payload = {
    "content": subject_bold,
    "embeds": [{
      "title": subject,
      "color": 16766720,
      "author": {
        "name": from
      },
      "description": plainBody.substr(0, 2048),
      "footer": {
        "text": from + "\n" + time
      }
    }]
  }
  return {
    url: webhook_url,
    contentType: 'application/json',
    payload: JSON.stringify(payload),
  }
}

function DiscordNotificationHelperGreen(webhook_url, message) {
  const from = message.getFrom();
  const time = message.getDate();
  const subject_bold = "**" + message.getSubject() + "**";
  const subject = message.getSubject();
  const plainBody = message.getPlainBody();

  Logger.log(subject);
  const payload = {
    "content": subject_bold,
    "embeds": [{
      "title": subject,
      "color": 32768,
      "author": {
        "name": from
      },
      "description": plainBody.substr(0, 2048),
      "footer": {
        "text": from + "\n" + time
      }
    }]
  }
  return {
    url: webhook_url,
    contentType: 'application/json',
    payload: JSON.stringify(payload),
  }
}
