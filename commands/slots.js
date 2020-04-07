const slotItems = [":grapes:", ":watermelon:", ":orange_circle:", ":apple:", ":carrot:", ":strawberry:", ":cherries:"];
const db = require("quick.db");
const Discord = require('discord.js');

exports.run = async (client, message, args) => {

    if(message.channel.id !== "687777887633670209") return message.channel.send("Ovu komandu možeš koristiti samo u kanalu <#687777887633670209>");
  
    let user = message.author;
    let moneydb = await db.fetch(`money_${message.guild.id}_${user.id}`)
    let money = parseInt(args[0]);
    let win = false;

    let moneymore = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`:negative_squared_cross_mark: Ulažeš više novca nego što imaš!`);

    let moneyhelp = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`:grey_question: Napiši iznos koji želiš uložiti!`);
  
    let incorrect = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(":negative_squared_cross_mark: Ne možeš koristiti znakove!");

    if (!money) return message.channel.send(moneyhelp);
    if (money != args[0]) return message.channel.send(incorrect);
    if (money > moneydb) return message.channel.send(moneymore);

    let number = []
    for (let i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }

    if (number[0] == number[1] && number[1] == number[2]) { 
        money *= 9
        win = true;
    } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) { 
        money *= 2
        win = true;
    }
    if (win) {
        let slotsEmbed1 = new Discord.MessageEmbed()
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nOsvojio/la si ${money}$`)
            .setColor("#FFFFFF")
        message.channel.send(slotsEmbed1)
        db.add(`money_${message.guild.id}_${user.id}`, money)
    } else {
        let slotsEmbed = new Discord.MessageEmbed()
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nIzgubio/la si ${money}$`)
            .setColor("#FFFFFF")
        message.channel.send(slotsEmbed)
        db.subtract(`money_${message.guild.id}_${user.id}`, money)
    }

}

  module.exports.help = {
    name:"slots",
    aliases: ["sl"]
  }