const client = require("../index"); // Swenzy ❤️ ExCODE

client.on("interactionCreate", async (interaction) => {
    // Slash Command Handling

if(interaction.isCommand()) {
        const SlashCommands = client.slashCommands.get(interaction.commandName);
        if(!SlashCommands) return;
        try {
          
            SlashCommands.run(client, interaction);
        } catch (error) {
            if(interaction.replied) {
                await interaction.editReply({
                    content: `An unexcepted error occured.`
                }).catch(() => {});
            } else {
                await interaction.followUp({
                    ephemeral: true,
                    content: `An unexcepted error occured.`
                }).catch(() => {});
            }
            console.error(error);
        };
    } else return;
  
    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }
});
