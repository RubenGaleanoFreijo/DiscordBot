const voiceService = require('./voiceService');

module.exports = (oldState, newState) => {
    voiceService.handleVoice(oldState, newState);
};