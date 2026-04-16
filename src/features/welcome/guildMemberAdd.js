const welcomeService = require('./welcomeService');

module.exports = async (member) => {
    try {
        await welcomeService.sendWelcome(member);
    } catch (err) {
        console.error(err);
    }
};