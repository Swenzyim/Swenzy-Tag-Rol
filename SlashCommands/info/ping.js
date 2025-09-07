const { Client, CommandInteraction } = require("discord.js"); // Swenzy ❤️ ExCODE

module.exports = {
    name: "ping",
    description: "Botun pingini gösterir.",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        interaction.reply({ content: `${client.ws.ping} ms!` });
    },
};
