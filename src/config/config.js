require('dotenv').config();

module.exports = {
    token: process.env.DISCORD_TOKEN,
    clientId: process.env.CLIENT_ID,
    createChannelId: process.env.CREATE_CHANNEL_ID
};