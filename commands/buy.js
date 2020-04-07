const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {
  
    let user = message.author;

    let author = await db.fetch(`money_${message.guild.id}_${user.id}`)

    let Embed = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`:negative_squared_cross_mark: Treba ti 10000$ da kupiš Bronze VIP!`);
  
    let already = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(":negative_squared_cross_mark: Već imaš ovaj rank!");
  
    let alreadyrank = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(":negative_squared_cross_mark: Ne možeš preći na niži rank!");
  
    let bronze = message.guild.roles.cache.get("687709581505593470");
    let silver = message.guild.roles.cache.get("687710015322456071");
    let gold = message.guild.roles.cache.get("687710331136639048");
    let platinum = message.guild.roles.cache.get("687710786352840857");

    if (args[0] == 1) { 
        if (author < 10000) return message.channel.send(Embed)
    
        if(message.member.roles.has(bronze.id)) return message.channel.send(already);

        let Embed2 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`:white_check_mark: Kupio/la si Bronze VIP za 10000$`);

        if(message.member.roles.has(silver.id) || message.member.roles.has(gold.id) || message.member.roles.has(platinum.id)) {
           return message.channel.send(alreadyrank);
        }
        message.member.roles.add(bronze);
        db.subtract(`money_${message.guild.id}_${user.id}`, 10000)
        message.channel.send(Embed2)
    } else if(args[0] == 2) {
        let Embed2 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`:negative_squared_cross_mark: Treba ti 25000$ da kupiš Silver VIP!`);

        if (author < 25000) return message.channel.send(Embed2)
      
        if (message.member.roles.has(silver.id)) return message.channel.send(already);

        let Embed3 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`:white_check_mark: Kupio/la si Silver VIP za 25000$`);

        if(message.member.roles.has(bronze.id)) message.member.removeRole(bronze);
    
        if(message.member.roles.has(gold.id) || message.member.roles.has(platinum.id)) return message.channel.send(alreadyrank);
      
        message.member.roles.add(silver);
        db.subtract(`money_${message.guild.id}_${user.id}`, 25000)
        message.channel.send(Embed3)
    } else if(args[0] == 3) {
        let Embed2 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`:negative_squared_cross_mark: Treba ti 40000$ da kupiš Gold VIP!`);

        if (author < 40000) return message.channel.send(Embed2)
      
        if(message.member.roles.has(gold.id)) return message.channel.send(already);

        if(message.member.roles.has(bronze.id)) message.member.removeRole(bronze);
        
        if(message.member.roles.has(silver.id)) message.member.removeRole(silver);
      
        if(message.member.roles.has(platinum.id)) return message.channel.send(alreadyrank);

        message.member.roles.add(gold);
        let Embed3 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`:white_check_mark: Kupio/la si Gold VIP za 40000$`);

        db.subtract(`money_${message.guild.id}_${user.id}`, 40000)
        message.channel.send(Embed3)
    } else if(args[0] == 4) {
        let Embed2 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`:negative_squared_cross_mark: Treba ti 55000$ da kupiš Platinum VIP!`);

        if (author < 55000) return message.channel.send(Embed2)

        if(message.member.roles.has(platinum.id)) return message.channel.send(already);
      
        if(message.member.roles.has(bronze.id)) message.member.removeRole(bronze);
      
        if(message.member.roles.has(silver.id)) message.member.removeRole(silver);
      
        if(message.member.roles.has(gold.id)) message.member.removeRole(gold);

        message.member.roles.add(platinum);
        let Embed3 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`:white_check_mark: Kupio/la si Platinum VIP za 55000$`);

        db.subtract(`money_${message.guild.id}_${user.id}`, 55000)
        message.channel.send(Embed3)
    } else {
        let embed3 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(':grey_question: Napiši šta želiš kupiti!\nListu rankova u shopu imaš na '+client.config.prefix+'shop');
        message.channel.send(embed3)
    }

}

  module.exports.help = {
    name:"buy",
    aliases: [""]
  }