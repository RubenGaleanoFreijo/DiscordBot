const { Client, GatewayIntentBits, Collection } = require('discord.js');

// 🔥 ENV SIEMPRE PRIMERO
require('dotenv').config();

const config = require('./src/config/config');
const loadEvents = require('./src/handlers/loadEvents');
const loadCommands = require('./src/handlers/loadCommands');
const initDatabase = require('./src/database/init');

// Cliente Discord
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Colección de comandos
client.commands = new Collection();

// Cargar handlers
loadCommands(client);
loadEvents(client);

// 🚀 START SECUENCIAL (DB → BOT)
(async () => {
    try {
        console.log("🟡 Inicializando base de datos...");
        await initDatabase();
        console.log("🟢 Base de datos lista");

        console.log("🤖 Iniciando bot...");
        await client.login(config.token);

        console.log("🟢 Bot conectado correctamente");

    } catch (err) {
        console.error("❌ Error iniciando bot:", err);
    }
})();