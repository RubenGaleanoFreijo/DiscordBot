module.exports = {
    async sendWelcome(member) {

        const channel = await member.guild.channels
            .fetch("1494264090426605588")
            .catch(() => null);

        if (!channel) return;

        channel.send(`👋 Bienvenido ${member} al servidor! 🎉`);
    }
};