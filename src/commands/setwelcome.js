const guildConfig = require('../database/guildConfigService');

module.exports = {
    name: 'setwelcome',

    async execute(message, args) {

        console.log("🔥 COMANDO SETWELCOME EJECUTADO");

        const channel = message.mentions.channels.first();
        if (!channel) return message.reply("Menciona un canal");

        await guildConfig.setWelcomeChannel(
            message.guild.id,
            channel.id
        );

        message.reply("✅ Guardado correctamente");
    }
};