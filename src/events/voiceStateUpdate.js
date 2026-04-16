const tempChannels = new Set();

const CREATE_CHANNEL_ID = "1494306247929757806";

module.exports = {
    name: "voiceStateUpdate",

    execute(oldState, newState) {

        // 👉 crear canal
        if (
            newState.channelId === CREATE_CHANNEL_ID &&
            oldState.channelId !== CREATE_CHANNEL_ID
        ) {
            const guild = newState.guild;

            guild.channels.create({
                name: `Sala de ${newState.member.user.username}`,
                type: require('discord.js').ChannelType.GuildVoice,
                parent: newState.channel.parent
            }).then(channel => {

                tempChannels.add(channel.id);

                newState.member.voice.setChannel(channel);
            });
        }

        // 👉 borrar canal SOLO si es temporal
        if (oldState.channel && tempChannels.has(oldState.channel.id) && oldState.channel.members.size === 0) {

            setTimeout(() => {
                if (oldState.channel.members.size === 0) {
                    oldState.channel.delete().catch(() => {});
                    tempChannels.delete(oldState.channel.id);
                }
            }, 2000);
        }
    }
};