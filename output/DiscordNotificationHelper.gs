"use strict";
var ColorCode;
(function (ColorCode) {
    ColorCode["CRIMSON"] = "14423100";
    ColorCode["GOLD"] = "16766720";
    ColorCode["GREEN"] = "32768";
    ColorCode["ORANGE"] = "14177041";
    ColorCode["BLUE"] = "5610452";
})(ColorCode || (ColorCode = {}));
function MakeAllInfoPayload(message, color_code, mention_flag) {
    const from = message.getFrom();
    const time = message.getDate();
    const subject = message.getSubject();
    const plainBody = message.getPlainBody();
    console.log(subject);
    const mentions = mention_flag ? "@everyone\n" : "";
    const subject_bold_with_mention = mentions + "**" + subject + "**";
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
        contentType: "application/json",
        payload: JSON.stringify(payload),
    };
}
function MakeSimpleInfoOption(message, color_code, mention_flag) {
    const from = message.getFrom();
    const time = message.getDate();
    const subject = message.getSubject();
    console.log(subject);
    const mentions = mention_flag ? "@everyone\n" : "";
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
        contentType: "application/json",
        payload: JSON.stringify(payload),
    };
}
