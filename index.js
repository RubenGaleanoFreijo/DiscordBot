require('dotenv').config();

const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { token } = require('./src/config/config');

const loadEvents = require('./src/handlers/loadEvents');
const loadCommands = require('./src/handlers/loadCommands');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ]
});

client.commands = new Collection();

loadCommands(client);
loadEvents(client);

client.login(token);