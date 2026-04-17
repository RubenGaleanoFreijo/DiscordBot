const fs = require('fs');
const path = require('path');

module.exports = (client) => {

    const commandsPath = path.join(__dirname, '../commands');

    const load = (dir) => {
        const files = fs.readdirSync(dir);

        for (const file of files) {
            const fullPath = path.join(dir, file);

            if (fs.lstatSync(fullPath).isDirectory()) {
                load(fullPath);
            } else if (file.endsWith('.js')) {
                const command = require(fullPath);

                // 🔹 Slash command
                if (command.data) {
                    client.commands.set(command.data.name, command);
                }
                // 🔹 Prefijo command
                else if (command.name) {
                    client.commands.set(command.name, command);
                }
            }
        }
    };

    load(commandsPath);
};