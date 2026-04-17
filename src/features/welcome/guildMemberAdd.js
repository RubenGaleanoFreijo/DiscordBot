console.log("EVENTO guildMemberAdd DISPARADO");

const welcomeService = require('./welcomeService');

module.exports = async (member) => {
    console.log("👋 guildMemberAdd ejecutado");

    await welcomeService.sendWelcome(member);
};