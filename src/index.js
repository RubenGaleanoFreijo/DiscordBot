const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { token } = require('./config/config');

const loadEvents = require('./handlers/loadEvents');
const loadCommands = require('./handlers/loadCommands');

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