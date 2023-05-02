"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
// Create a new Telegraf bot
const bot = new telegraf_1.Telegraf("6177827273:AAFDQWhth8_BwahA5dUQcd32GZicOChR3jQ");
bot.command("start", (ctx) => {
    const inlineMessageKeyboard = telegraf_1.Markup.inlineKeyboard([
        telegraf_1.Markup.button.url("Google", "https://google.com"),
        telegraf_1.Markup.button.callback("Click me", "clicked"),
    ]);
    // ctx.reply("Here is your inline keyboard:", inlineMessageKeyboard.extra());
});
bot.action("clicked", (ctx) => {
    ctx.answerCbQuery("Button clicked!");
});
bot.launch();
