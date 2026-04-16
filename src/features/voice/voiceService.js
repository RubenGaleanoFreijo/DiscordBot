const { ChannelType } = require('discord.js');

const tempChannels = new Map();
const creatingUsers = new Set();

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

// small caps
function toSmallCaps(text) {
    const map = {
        a: "ᴀ", b: "ʙ", c: "ᴄ", d: "ᴅ", e: "ᴇ",
        f: "ꜰ", g: "ɢ", h: "ʜ", i: "ɪ", j: "ᴊ",
        k: "ᴋ", l: "ʟ", m: "ᴍ", n: "ɴ", o: "ᴏ",
        p: "ᴘ", q: "q", r: "ʀ", s: "ꜱ", t: "ᴛ",
        u: "ᴜ", v: "ᴠ", w: "ᴡ", x: "x", y: "ʏ", z: "ᴢ"
    };

    return text.toLowerCase().split("").map(c => map[c] || c).join("");
}

module.exports = {
    async handleVoice(oldState, newState) {

        const guild = newState.guild || oldState.guild;

        // 🧠 ANTI LOOP GLOBAL
        if (oldState.channelId === newState.channelId) return;

        // =========================
        // 🟢 CREAR CANAL
        // =========================
        const joinedCreateChannel =
            newState.channelId &&
            CREATE_CHANNEL_IDS.includes(newState.channelId);

        if (joinedCreateChannel) {

            // 🧠 ANTI DUPLICADO POR USUARIO
            if (creatingUsers.has(newState.member.id)) return;
            creatingUsers.add(newState.member.id);

            try {
                const usernameStyled = toSmallCaps(newState.member.displayName);

                const channel = await guild.channels.create({
                    name: `🔊│ꜱᴀʟᴀ ᴅᴇ ${usernameStyled}`,
                    type: ChannelType.GuildVoice,
                    parent: newState.channel?.parent ?? null
                });

                tempChannels.set(channel.id, Date.now());

                await newState.member.voice.setChannel(channel);

            } finally {
                creatingUsers.delete(newState.member.id);
            }
        }

        // =========================
        // 🔴 BORRAR CANAL
        // =========================
        const oldChannel = oldState.channel;

        if (
            oldChannel &&
            tempChannels.has(oldChannel.id) &&
            oldChannel.members.size === 0
        ) {

            const channelId = oldChannel.id;

            setTimeout(async () => {

                if (!tempChannels.has(channelId)) return;

                const channel = await guild.channels.fetch(channelId).catch(() => null);

                if (!channel) {
                    tempChannels.delete(channelId);
                    return;
                }

                if (channel.members.size > 0) return;

                await channel.delete().catch(() => {});
                tempChannels.delete(channelId);

            }, 2000);
        }
    }
};