const fs = require('fs');
const path = require('path');

module.exports = (client) => {

    const commandsPath = path.join(__dirname, '../commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'));

    for (const file of commandFiles) {

        const command = require(`../commands/${file}`);

        // 🧠 VALIDACIÓN CRÍTICA
        if (!command.name || typeof command.execute !== 'function') {
            console.log(`❌ Comando inválido: ${file}`);
            continue;
        }

        client.commands.set(command.name, command);

        console.log("⚡ Command cargado:", command.name);
    }
};