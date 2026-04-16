const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');

module.exports = (client) => {
    const eventsPath = path.join(__dirname, '../events');
    const eventFiles = fs.readdirSync(eventsPath);

    for (const file of eventFiles) {
        const event = require(`../events/${file}`);

        const eventName = file.split('.')[0];

        client.on(eventName, (...args) => event(...args, client));

        logger.info(`Evento cargado: ${eventName}`);
    }
};