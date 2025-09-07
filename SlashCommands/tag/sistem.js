const { Client, CommandInteraction, MessageEmbed } = require("discord.js"); // Swenzy ❤️ ExCODE
const { createDatabase } = require("whisky.db");
const db = new createDatabase()

module.exports = {
    name: "sistem",
    description: "Tag sistemini açar/kapatır.",
    options: [{ type: "STRING", name: "durum", description: "Açılacakmı, Kapatılacakmı?", required: true, choices: [{ name: "Aç", value: "acik"}, { name: "Kapat", value: "kapali" }]}],
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        if (interaction.user.id != client.config.kurucuId) return interaction.reply({ content: "**Bu komutu kullanmanıza izin verilmemektedir.** :x:"})

      const islemler = {
        "acik": "açıldı",
        "kapali": "kapatıldı"
      }

let islem = interaction.options.getString("durum")

const embed = new MessageEmbed()
.setAuthor({ name: "Tag Sistemi", iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`})
.setDescription(`Tag-Rol sistemi başarıyla **${islemler[islem]}.**`)
.setFooter({ text: interaction.guild.name, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`}) 
.setTimestamp()
.setColor("GREEN")
interaction.reply({ embeds: [embed]}) 

db.set("sistem", islem)

    },
};
