const { Client, GatewayIntentBits, Collection } = require('discord.js');

// 👉 Solo carga dotenv en local
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const config = require('./src/config/config');
const loadEvents = require('./src/handlers/loadEvents');
const loadCommands = require('./src/handlers/loadCommands');

// Cliente Discord
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMembers
    ]
});

// Colección de comandos
client.commands = new Collection();

// Cargar handlers
loadCommands(client);
loadEvents(client);

// Login del bot
client.login(config.token);