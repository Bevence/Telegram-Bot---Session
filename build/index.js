"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var telegraf_1 = require("telegraf");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var token = process.env.TELEGRAM_BOT;
if (!token) {
    throw new Error("Please specify a valid Telegram bot token in the TELEGRAM_BOT environment variable.");
}
var OTP = "OTP";
// Create a new Telegraf bot
var bot = new telegraf_1.Telegraf(token);
bot.use((0, telegraf_1.session)());
// Define a function to handle the /start command
bot.start(function (ctx) {
    var _a;
    // Send a message to the user with OTP prompt
    ctx.reply("Please enter the OTP you received:");
    (_a = ctx.session) !== null && _a !== void 0 ? _a : (ctx.session = { state: OTP });
});
// Define a function to handle user's OTP input
bot.on("text", function (ctx) {
    // Get the OTP input from the user
    var state = ctx.session.state;
    if (state !== OTP) {
        return;
    }
    var otp = Number(ctx.message.text);
    if (Number.isNaN(otp)) {
        ctx.reply("Please enter a valid OTP");
    }
    else {
        // Do something with the OTP (e.g. validate it)
        console.log("Received OTP: ".concat(otp, ", ").concat(typeof otp));
        ctx.session.state = null;
        // Send a message to the user acknowledging receipt of OTP
        return ctx.reply("Thanks for entering the OTP.");
    }
});
// Start the bot
bot.launch();
