const { Client, CommandInteraction, MessageEmbed } = require("discord.js"); // Swenzy ❤️
const { createDatabase } = require("whisky.db");
const db = new createDatabase()

module.exports = {
    name: "tag",
    description: "Tagları gösterir.",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {

      if (db.get("sistem") != "acik") return interaction.reply({ content: "Tag sistemi kapalı. :x:"})
      
const embed = new MessageEmbed()
.setAuthor({ name: "Taglarımız", iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`})
.setDescription(`Etiket Tagımız: **${client.config.etiketTag}** \n\nİsim Tagımız: **${client.config.isimTag}** \n\nTagımızı alarak bize destek olabilirsin. ❤️`)
.setFooter({ text: interaction.guild.name, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`}) 
.setTimestamp()
.setColor("GREEN")
interaction.reply({ embeds: [embed]}) 
      
    },
};
