"use strict";
var ColorCode;
(function (ColorCode) {
    ColorCode["CRIMSON"] = "14423100";
    ColorCode["GOLD"] = "16766720";
    ColorCode["GREEN"] = "32768";
    ColorCode["ORANGE"] = "14177041";
})(ColorCode || (ColorCode = {}));
function DiscordNotificationHelper(webhook_url, message, color_code, mention_flag) {
    const from = message.getFrom();
    const time = message.getDate();
    const subject = message.getSubject();
    const plainBody = message.getPlainBody();
    console.log(subject);
    const mentions = mention_flag ? "@everyone\n" : "";
    const subject_bold_with_mention = mentions + "**" + subject + "**";
    const payload = {
        content: subject_bold_with_mention,
        embeds: [{
                title: subject,
                color: color_code,
                author: {
                    name: from
                },
                description: plainBody.substr(0, 2048),
                footer: {
                    text: `From: ${from}\nTime: ${time}`
                }
            }]
    };
    return {
        url: webhook_url,
        contentType: 'application/json',
        payload: JSON.stringify(payload),
    };
}
