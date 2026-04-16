const { ChannelType } = require('discord.js');
const { createChannelId } = require('../config/config');
const tempChannels = require('../utils/tempChannels');

module.exports = async (oldState, newState) => {

    if (newState.channelId === createChannelId) {

        const guild = newState.guild;

        const channel = await guild.channels.create({
            name: `Sala de ${newState.member.user.username}`,
            type: ChannelType.GuildVoice,
            parent: newState.channel.parent
        });

        tempChannels.set(channel.id, true);

        await newState.member.voice.setChannel(channel);
    }

    if (oldState.channelId && tempChannels.has(oldState.channelId)) {

        const channel = oldState.channel;

        if (channel.members.size === 0) {
            await channel.delete();
            tempChannels.delete(oldState.channelId);
        }
    }
};