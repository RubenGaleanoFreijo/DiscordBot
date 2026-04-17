require('dotenv').config();

const { Client, GatewayIntentBits, Collection } = require('discord.js');

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

// Cargar comandos y eventos
loadCommands(client);
loadEvents(client);


// =========================
// 🔹 COMANDOS POR PREFIJO (!)
// =========================
client.on('messageCreate', async (message) => {

    if (message.author.bot) return;
    if (!message.content.startsWith('!')) return;

    const args = message.content.slice(1).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    console.log("🟡 COMANDO DETECTADO:", commandName);

    const command = client.commands.get(commandName);

    if (!command) return;

    try {
        await command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply("❌ Error ejecutando comando");
    }
});


// =========================
// 🔹 SLASH COMMANDS (/)
// =========================
client.on('interactionCreate', async (interaction) => {

    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    console.log("🔥 SLASH COMANDO:", interaction.commandName);

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);

        if (interaction.replied) return;

        await interaction.reply({
            content: '❌ Error ejecutando comando',
            ephemeral: true
        });
    }
});


// =========================
// 🚀 START SECUENCIAL
// =========================
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