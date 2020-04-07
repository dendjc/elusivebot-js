const db = require('quick.db')
const Discord = require('discord.js')
const ms = require("parse-ms");

exports.run = async (client, message, args) => {

    if (message.channel.id !== "687394966972268585") return message.channel.send("Ovu komandu možeš koristiti samo u kanalu <#687394966972268585>");
  
    let user = message.author;
    let author = await db.fetch(`work_${message.guild.id}_${user.id}`)

    let timeout = 30000;

    if (author !== null && timeout - (Date.now() - author) > 0) {
        let time = ms(timeout - (Date.now() - author));

        let timeEmbed = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`:negative_squared_cross_mark: Već si nedavno radio/la!\n\nPokušaj ponovo u ${time.minutes}m ${time.seconds}s `);
        message.channel.send(timeEmbed)
      } else {

        let replies = ['programer','zidar','konobar','kondukter','kuhar','mehaničar','porno glumac','tesar','pilot','doktor', 'policajac', 'vatrogasac', 'sportista', 'vozač busa', 'taksista', 'džeparoš']

        let result = Math.floor((Math.random() * replies.length));
        let amount = Math.floor(Math.random() * 80) + 1;
        let embed1 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`:white_check_mark: Radio/la si kao ${replies[result]} i zaradio/la ${amount}$!`);
        message.channel.send(embed1)

        db.add(`money_${message.guild.id}_${user.id}`, amount)
        db.set(`work_${message.guild.id}_${user.id}`, Date.now())
    };
}



module.exports.help = {
  name:"work",
  aliases: ["wr"]
}