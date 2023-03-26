enum ColorCode {
  CRIMSON = "14423100",
  GOLD = "16766720",
  GREEN = "32768",
  ORANGE = "14177041",
  BLUE = "5610452",
}

function MakeAllInfoPayload(
  webhook_url: string,
  message: GoogleAppsScript.Gmail.GmailMessage,
  color_code: ColorCode,
  mention_flag: boolean
) {
  const from = message.getFrom();
  const time = message.getDate();
  const subject = message.getSubject();
  const plainBody = message.getPlainBody();

  console.log(subject);

  const mentions: string = mention_flag ? "@everyone\n" : "";
  const subject_bold_with_mention: string = mentions + "**" + subject + "**";

  const payload = {
    content: subject_bold_with_mention,
    embeds: [
      {
        title: subject,
        color: color_code,
        author: {
          name: from,
        },
        description: plainBody.slice(0, 2048),
        footer: {
          text: `From: ${from}\nTime: ${time}`,
        },
      },
    ],
  };

  return {
    url: webhook_url,
    contentType: "application/json",
    payload: JSON.stringify(payload),
  };
}

function MakeSimpleInfoPayload(
  webhook_url: string,
  message: GoogleAppsScript.Gmail.GmailMessage,
  color_code: ColorCode,
  mention_flag: boolean
) {
  const from = message.getFrom();
  const time = message.getDate();
  const subject = message.getSubject();

  console.log(subject);

  const mentions: string = mention_flag ? "@everyone\n" : "";

  const payload = {
    content: mentions,
    embeds: [
      {
        title: subject,
        color: color_code,
        author: {
          name: from,
        },
        description: time,
      },
    ],
  };

  return {
    url: webhook_url,
    contentType: "application/json",
    payload: JSON.stringify(payload),
  };
}
