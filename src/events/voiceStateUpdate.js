module.exports = {
    name: "voiceStateUpdate",

    execute(oldState, newState) {

        const CREATE_CHANNEL_ID = "1494303452422213653";

        console.log("VOICE EVENT TRIGGERED");

        // 👉 SOLO cuando entra desde fuera
        if (!oldState.channelId && newState.channelId === CREATE_CHANNEL_ID) {

            const guild = newState.guild;

            guild.channels.create({
                name: `Sala de ${newState.member.user.username}`,
                type: require('discord.js').ChannelType.GuildVoice,
                parent: newState.channel.parent
            }).then(channel => {

                newState.member.voice.setChannel(channel);
            });
        }

        // 👉 borrar canal si queda vacío (con delay seguro)
        if (oldState.channel && oldState.channel.members.size === 0) {

            setTimeout(() => {
                if (oldState.channel.members.size === 0) {
                    oldState.channel.delete().catch(() => {});
                }
            }, 5000);
        }
    }
};