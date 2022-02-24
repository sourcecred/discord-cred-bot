console.log(`Hello from Node.js ${process.version}!`);
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const config = require("../config.js")
const { commands } = require("./commandRegistry.js")
require('dotenv').config();

const rest = new REST({ version: '9' }).setToken(process.env.BOT_SECRET);

(async () => {
    try {
        for (const guild_id of Object.keys(config.GUILD_IDS)) {
            console.log(guild_id + ' Started refreshing application (/) commands.');

            await rest.put(
                Routes.applicationGuildCommands(process.env.CLIENT_ID, guild_id),
                { body: commands.map(([, command]) => command) },
            );

            console.log(guild_id + ' Successfully reloaded application (/) commands.');
        }
    } catch (error) {
        console.error(error);
    }
})();