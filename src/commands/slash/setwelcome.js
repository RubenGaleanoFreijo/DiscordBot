const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const guildConfig = require('../../database/guildConfigService');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setwelcome')
        .setDescription('Configura el mensaje de bienvenida')
        .addChannelOption(option =>
            option.setName('canal')
                .setDescription('Canal de bienvenida')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('mensaje')
                .setDescription('Mensaje de bienvenida')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {

        console.log("🔥 SLASH /setwelcome ejecutado");

        const canal = interaction.options.getChannel('canal');
        const mensaje = interaction.options.getString('mensaje');

        if (!canal.isTextBased()) {
            return interaction.reply({
                content: '❌ Debe ser un canal de texto',
                ephemeral: true
            });
        }

        try {
            await guildConfig.setWelcomeChannel(interaction.guild.id, canal.id);
            await guildConfig.setWelcomeMessage(interaction.guild.id, mensaje);

            await interaction.reply({
                content: `✅ Bienvenida configurada en ${canal}\n💬 Mensaje: ${mensaje}`
            });

        } catch (err) {
            console.error(err);
            await interaction.reply({
                content: '❌ Error guardando configuración',
                ephemeral: true
            });
        }
    }
};