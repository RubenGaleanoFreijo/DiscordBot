module.exports = {
    sendWelcome(member) {

        const channel = member.guild.systemChannel;

        if (!channel) return;

        channel.send(`👋 Bienvenido ${member.user.username} al servidor! 🎉`);
    }
};