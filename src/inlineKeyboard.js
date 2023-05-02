import { Telegraf, Markup } from "telegraf";
import dotenv from "dotenv";

dotenv.config();

// Create a new Telegraf bot
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command("start", (ctx) => {
  const inlineMessageKeyboard = Markup.inlineKeyboard([
    Markup.button.url("Google", "https://google.com"),
    Markup.button.callback("Click me", "clicked"),
  ]);

  ctx.reply(
    "Here is your inline keyboard:",
    inlineMessageKeyboard.oneTime().resize()
  );
});

bot.action("clicked", async (ctx) => {
  const newText = "New text content";
  const keyboard = Markup.inlineKeyboard([
    Markup.button.callback("Updated button", "updated"),
  ]);
  await ctx.editMessageText(newText, keyboard);
});

bot.action("updated", async (ctx) => {
  await ctx.answerCbQuery("Button updated!");
});

bot.launch();
