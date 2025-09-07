const { Client, CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js"); // Swenzy ❤️ ExCODE
const { createDatabase } = require("whisky.db");
const db = new createDatabase()

module.exports = {
    name: "tag-log",
    description: "Tag Alan/Bırakan kişileri gösterir.",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {

if (db.get("sistem") != "acik") return interaction.reply({ content: "Tag sistemi kapalı. :x:"})
      
    if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "Bu komutu kullanmanıza izin verilmemektedir. :x:"})

// Her Sayfada 5 Log Gösterme Kısmı

const loglar = db.get("log") ? db.get("log").reverse() : ["Veri bulunamadı."]

const yeniLogs = new Array(Math.ceil(loglar.length / 5))
  .fill()
  .map(_ => loglar.splice(0, 5))
   
//
   
const page = 1

const buttonGeri = new MessageButton()
      .setStyle("PRIMARY")
      .setLabel("Önceki Sayfa")
      .setEmoji("⬅️")
      .setCustomId(`g_${interaction.user.id}`)

      const buttonIleri = new MessageButton()
      .setStyle("PRIMARY")
      .setLabel("Sonraki Sayfa")
      .setEmoji("➡️")
      .setCustomId(`i_${interaction.user.id}`)
   
if (yeniLogs.length <= 1) {
buttonGeri.setDisabled(true)
 buttonIleri.setDisabled(true)
}

const row = new MessageActionRow()
      .addComponents([ buttonGeri, buttonIleri ])
      
const embed = new MessageEmbed()
.setAuthor({ name: "Tagı Alanlar/Bırakanlar", iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`})
.setDescription(`${yeniLogs[page-1].join("\n")}`)
.setFooter({ text: `${interaction.guild.name} - Sayfa ${page}/${yeniLogs.length}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`}) 
.setTimestamp()
.setColor("GREEN")

interaction.reply({ embeds: [embed], components: [row]})

const filter = i => i.user.id === interaction.user.id
      
const collector = interaction.channel.createMessageComponentCollector({ filter, time: 300000 })

collector.on("collect", async z => {

  if (z.customId == `g_${interaction.user.id}`) {

buttonGeri.setDisabled(false)
 buttonIleri.setDisabled(false)
    
  if (page == 1) return buttonGeri.setDisabled(true);

  page--
  embed.setDescription(`${yeniLogs[page-1].join("\n")}`)
  embed.setFooter({ text: `${interaction.guild.name} - Sayfa ${page-1}/${yeniLogs.length}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`})

interaction.editReply({ embeds: [ embed ], components: [row]})
    
    return
  }

if (z.customId == `i_${interaction.user.id}`) {

 buttonGeri.setDisabled(false)
 buttonIleri.setDisabled(false)

if (page == yeniLogs.length) return buttonIleri.setDisabled(true)
  
page++
embed.setDescription(`${yeniLogs[page-1].join("\n")}`)
  embed.setFooter({ text: `${interaction.guild.name} - Sayfa ${page-1}/${yeniLogs.length}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`})

interaction.editReply({ embeds: [ embed ], components: [row]})

  return
}
  
});

    },
};
