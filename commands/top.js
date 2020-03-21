const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {
  
    let money = await db.startsWith(`money_${message.guild.id}`, { sort: '.data'})
    let content = "";

    for (let i = 0; i < money.length; i++) {
        let user = client.users.get(money[i].ID.split('_')[2]).username



        content += `${i+1}. ${user} ~ ${money[i].data}$\n`

      }

    const embed = new Discord.RichEmbed()
    .setDescription(`**Tabela najbogatijih članova**\n\n${content}`)
    .setColor("#FFFFFF")

    message.channel.send(embed)

}
module.exports.help = {
  name:"leaderboard",
  aliases: ["leader"]
}