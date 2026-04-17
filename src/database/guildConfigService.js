const pool = require('../database/database');

module.exports = {
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
    }
};