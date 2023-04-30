import { Telegraf, session, Context } from "telegraf";
import dotenv from "dotenv";

dotenv.config();

interface SessionData {
  state: string;
  // ... more session data go here
}

// Define your own context type
interface MyContext extends Context {
  session?: SessionData;
  // ... more props go here
}

const token = process.env.TELEGRAM_BOT;
if (!token) {
  throw new Error(
    "Please specify a valid Telegram bot token in the TELEGRAM_BOT environment variable."
  );
}

const OTP = "OTP";
// Create a new Telegraf bot
const bot = new Telegraf<MyContext>(token);
bot.use(session());

// Define a function to handle the /start command
bot.start((ctx: any) => {
  // Send a message to the user with OTP prompt
  ctx.reply("Please enter the OTP you received:");
  ctx.session ??= { state: OTP };
});

// Define a function to handle user's OTP input
bot.on("text", (ctx: any) => {
  // Get the OTP input from the user
  const state = ctx.session.state;
  if (state !== OTP) {
    return;
  }
  const otp = Number(ctx.message.text);

  if (Number.isNaN(otp)) {
    ctx.reply("Please enter a valid OTP");
  } else {
    // Do something with the OTP (e.g. validate it)
    console.log(`Received OTP: ${otp}, ${typeof otp}`);
    ctx.session.state = null;

    // Send a message to the user acknowledging receipt of OTP
    return ctx.reply("Thanks for entering the OTP.");
  }
});

// Start the bot
bot.launch();
