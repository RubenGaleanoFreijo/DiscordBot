const welcomeService = require('./welcomeService');

module.exports = (member) => {
    welcomeService.sendWelcome(member);
};