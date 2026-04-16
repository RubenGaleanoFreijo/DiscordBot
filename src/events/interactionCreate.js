module.exports = async (interaction, client) => {

    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (err) {
        console.error(err);
        await interaction.reply({
            content: "❌ Error ejecutando comando",
            ephemeral: true
        });
    }
};