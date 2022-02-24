const keep_alive = require("./keep_alive.js");
const { Client, Intents } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const { commands } = require("./commandRegistry.js")
require("dotenv").config();

const env = process.env;
const BOT_SECRET = env.BOT_SECRET;


client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  for (const [handler, command] of commands) {
    if (interaction.commandName === command.name) {
      handler(interaction);
      return;
    }
  }
});

client.login(BOT_SECRET);
