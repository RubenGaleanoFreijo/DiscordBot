const fs = require('fs');
const path = require('path');

module.exports = (client) => {

    const eventsPath = path.join(__dirname, '../events');
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
        const event = require(`../events/${file}`);

        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }
    }

    // FEATURES
    const featuresPath = path.join(__dirname, '../features');
    const featureFolders = fs.readdirSync(featuresPath);

    for (const folder of featureFolders) {

        const folderPath = path.join(featuresPath, folder);
        const files = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

        for (const file of files) {

            const eventName = file.split('.')[0];

            const event = require(`../features/${folder}/${file}`);

            console.log(`⚡ Feature cargada: ${eventName}`);

            // 🔥 IMPORTANTE: orden correcto Discord.js
            client.on(eventName, (...args) => event(...args, client));
        }
    }
};