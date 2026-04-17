const pool = require('./database');

async function initDatabase() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS guild_config (
                guild_id TEXT PRIMARY KEY,
                welcome_channel TEXT,
                create_channels TEXT
            );
        `);

        console.log("🟢 Tabla guild_config lista");
    } catch (error) {
        console.error("❌ Error inicializando DB:", error);
    }
}

module.exports = initDatabase;