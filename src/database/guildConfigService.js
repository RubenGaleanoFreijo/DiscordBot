const pool = require('../database/database');

module.exports = {

    // =========================
    // 🔍 GET CONFIG COMPLETA
    // =========================
    async getGuildConfig(guildId) {
        const res = await pool.query(
            `SELECT * FROM guild_config WHERE guild_id = $1`,
            [guildId]
        );

        return res.rows[0] || null;
    },

    // =========================
    // 📢 WELCOME CHANNEL
    // =========================
    async getWelcomeChannel(guildId) {
        const res = await pool.query(
            `SELECT welcome_channel FROM guild_config WHERE guild_id = $1`,
            [guildId]
        );

        return res.rows[0]?.welcome_channel || null;
    },

    async setWelcomeChannel(guildId, channelId) {
        await pool.query(`
            INSERT INTO guild_config (guild_id, welcome_channel)
            VALUES ($1, $2)
            ON CONFLICT (guild_id)
            DO UPDATE SET welcome_channel = EXCLUDED.welcome_channel
        `, [guildId, channelId]);
    },

    // =========================
    // 💬 WELCOME MESSAGE
    // =========================
    async getWelcomeMessage(guildId) {
        const res = await pool.query(
            `SELECT welcome_message FROM guild_config WHERE guild_id = $1`,
            [guildId]
        );

        return res.rows[0]?.welcome_message || null;
    },

    async setWelcomeMessage(guildId, message) {
        await pool.query(`
            INSERT INTO guild_config (guild_id, welcome_message)
            VALUES ($1, $2)
            ON CONFLICT (guild_id)
            DO UPDATE SET welcome_message = EXCLUDED.welcome_message
        `, [guildId, message]);
    },

    // =========================
    // 🧩 SETUP COMPLETO (OPCIONAL)
    // =========================
    async initGuild(guildId) {
        await pool.query(`
            INSERT INTO guild_config (guild_id)
            VALUES ($1)
            ON CONFLICT (guild_id)
            DO NOTHING
        `, [guildId]);
    }
};