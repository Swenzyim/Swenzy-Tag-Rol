const { Client, CommandInteraction, MessageEmbed } = require("discord.js"); // Swenzy ❤️ ExCODE
const { createDatabase } = require("whisky.db");
const db = new createDatabase()

module.exports = {
    name: "tag-say",
    description: "Sunucudaki taglı üye sayısını gösterir.",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {

if (db.get("sistem") != "acik") return interaction.reply({ content: "Tag sistemi kapalı. :x:"})

    const tag1 = client.config.etiketTag
    const tag2 = client.config.isimTag
    let tagli1;
    let tagli2;

if (tag1 == "Yok") {
  tagli1 = "Tag Belirlenmemiş"
}

      if (tag2 == "Yok") {
tagli2 = "Tag Belirlenmemiş"
}

if (tag1 != "Yok") {
      
tagli1 = await client.guilds.cache.get(client.config.sunucuId).members.cache.filter(z => z.user.discriminator == tag1).map(zm => zm.user.username).length

}

if (tag2 != "Yok") {

tagli2 = await client.guilds.cache.get(client.config.sunucuId).members.cache.filter(z => z.user.username.includes(tag2)).map(zm => zm.user.username).length

}

      
const embed = new MessageEmbed()
.setAuthor({ name: "Sunucudaki Taglı Sayısı", iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`})
.setDescription(`Sunucuda Etiket Tagını Almış Kişi Sayısı: **${tagli1}** \n\nSunucuda Isim Tagını Almış Kişi Sayısı: **${tagli2}**`)
.setFooter({ text: interaction.guild.name, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`}) 
.setTimestamp()
.setColor("GREEN")
      
interaction.reply({ embeds: [embed]}) 

    },
};