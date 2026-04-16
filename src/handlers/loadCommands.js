const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');

const commands = new Map();

module.exports = (client) => {
    const commandsPath = path.join(__dirname, '../commands');
    const commandFiles = fs.readdirSync(commandsPath);

    for (const file of commandFiles) {
        const command = require(`../commands/${file}`);

        commands.set(command.data.name, command);

        logger.info(`Comando cargado: ${command.data.name}`);
    }

    client.commands = commands;
};