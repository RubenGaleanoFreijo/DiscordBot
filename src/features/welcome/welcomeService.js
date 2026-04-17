const guildConfig = require('../../database/guildConfigService');

async function sendWelcome(member) {

    console.log("📨 welcomeService ejecutado");

    const channelId = await guildConfig.getWelcomeChannel(member.guild.id);
    const message = await guildConfig.getWelcomeMessage(member.guild.id);

    console.log("📌 channelId:", channelId);
    console.log("💬 message:", message);

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

        const guild = member.guild;

        const finalMessage =
            message
                ? message
                    .replace('{user}', `<@${member.id}>`)
                    .replace('{server}', guild.name)
                    .replace('{members}', guild.memberCount)
                : `👋 Bienvenido ${member} al servidor! 🎉`;

        await channel.send(finalMessage);

        console.log("✅ mensaje enviado");

    } catch (err) {
        console.log("❌ error send:", err.message);
    }
}

module.exports = {
    sendWelcome
};