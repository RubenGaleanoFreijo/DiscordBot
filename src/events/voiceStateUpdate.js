const tempChannels = new Set();

const CREATE_CHANNEL_IDS = [
    "1494306247929757806",
    "1494315816815169746",
    "1494315917310693436",
    "1494315902727098448",
    "1494315883386900680",
    "1494315894497742968",
    "1494315866605621327",
    "1494315847143919656",
    "1494315856568516811",
    "1494316051075174510"
];

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

        // 👉 CREAR CANAL (MULTI PADRE)
        if (
            CREATE_CHANNEL_IDS.includes(newState.channelId) &&
            !CREATE_CHANNEL_IDS.includes(oldState.channelId)
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

        // 👉 BORRAR SOLO TEMPORALES
        if (
            oldState.channel &&
            tempChannels.has(oldState.channel.id) &&
            oldState.channel.members.size === 0
        ) {

            setTimeout(() => {
                if (oldState.channel.members.size === 0) {
                    oldState.channel.delete().catch(() => {});
                    tempChannels.delete(oldState.channel.id);
                }
            }, 2000);
        }
    }
};