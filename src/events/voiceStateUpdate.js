const tempChannels = new Set();

const CREATE_CHANNEL_ID = "1494306247929757806";

// 🧠 función small caps
function toSmallCaps(text) {
    const map = {
        a: "ᴀ", b: "ʙ", c: "ᴄ", d: "ᴅ", e: "ᴇ",
        f: "ꜰ", g: "ɢ", h: "ʜ", i: "ɪ", j: "ᴊ",
        k: "ᴋ", l: "ʟ", m: "ᴍ", n: "ɴ", o: "ᴏ",
        p: "ᴘ", q: "q", r: "ʀ", s: "ꜱ", t: "ᴛ",
        u: "ᴜ", v: "ᴠ", w: "ᴡ", x: "x", y: "ʏ", z: "ᴢ"
    };

    return text
        .toLowerCase()
        .split("")
        .map(c => map[c] || c)
        .join("");
}

module.exports = {
    name: "voiceStateUpdate",

    execute(oldState, newState) {

        // 👉 crear canal
        if (
            newState.channelId === CREATE_CHANNEL_ID &&
            oldState.channelId !== CREATE_CHANNEL_ID
        ) {
            const guild = newState.guild;

            const usernameStyled = toSmallCaps(newState.member.displayName);

            guild.channels.create({
                name: `🔊│ꜱᴀʟᴀ ᴅᴇ ${usernameStyled}`,
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