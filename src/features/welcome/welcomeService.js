const guildConfig = require('../../database/guildConfigService');

async function sendWelcome(member) {

    console.log("📨 welcomeService ejecutado");

    const channelId = await guildConfig.getWelcomeChannel(member.guild.id);
    console.log("📌 channelId:", channelId);

    if (!channelId) return;

    let channel;

    try {
        channel = await member.guild.channels.fetch(channelId);
    } catch (err) {
        console.log("❌ error fetch channel:", err.message);
        return;
    }

    if (!channel) {
        console.log("❌ canal no existe");
        return;
    }

    try {
        await channel.send(`👋 Bienvenido ${member} al servidor! 🎉`);
        console.log("✅ mensaje enviado");
    } catch (err) {
        console.log("❌ error send:", err.message);
    }
}

module.exports = {
    sendWelcome
};