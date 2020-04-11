const Discord = require("discord.js");
const db = require("quick.db");
const Timeout = require("smart-timeout");

exports.run = async (client, message, args) => {
  if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("Nemaš permisiju za korištenje ove komande!");
  
  let member = message.mentions.members.first();
  if(!member) return message.channel.send("Nisi označio/la člana!");
  let user = client.users.cache.get(member.id);
  if(message.member === member) return message.channel.send("Ne možeš sebe mutirati!");
  if(member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("Ne možeš mutirati člana STAFFa!");
  
  let vrijeme = args[1];
  if(!vrijeme) return message.channel.send("Nisi napisao/la vrijeme u satima (h), minutama (min) ili sekundama (s)!");
  let vrijemeint = parseInt(args[1]);
  if((!vrijeme.includes("h") && !vrijeme.includes("min") && !vrijeme.includes("s")) || vrijemeint < 0 || vrijemeint > 60) return message.channel.send("Nisi pravilno napisao/la vrijeme.");
  
  let time;
  
  if(vrijeme.includes("h") && !vrijeme.includes("min") && !vrijeme.includes("s")) {
    time = vrijemeint * 3600000;
  }
  else if(vrijeme.includes("min") && !vrijeme.includes("h") && !vrijeme.includes("s")) {
    time = vrijemeint * 60000;
  }
  else if(vrijeme.includes("s") && !vrijeme.includes("h") && !vrijeme.includes("min")) {
    time = vrijemeint * 1000;
  }
  else return message.channel.send("Ne možeš koristiti kombinaciju vremenskih oznaka!");
  
  let razlog = args.slice(2).join(" ");
  if(!razlog) return message.channel.send("Nisi napisao/la razlog!");
  if(razlog.length > 100) return message.channel.send("Razlog je predug!");
  
  let muted = message.guild.roles.cache.find(m => m.name === "Muted");
  if(!muted) {
    muted = await message.guild.roles.create({
      data: {
        name: "Muted",
        permissions: []
      }
    })
    .then(role => {
      message.guild.channels.cache.forEach(channel => {
        channel.overwritePermissions([ {
          id: role.id,
          deny: ['SEND_MESSAGES', 'ADD_REACTIONS']
        }]);
      });
    });
  }
  if(member.roles.cache.has(muted.id)) return message.channel.send("Taj član je već mutiran!");
  let mutetime = await db.fetch(`mutetime_${message.guild.id}_${user.id}`);
  if(mutetime !== null) return message.channel.send("Taj član je već mutiran!");
  
  let i = 0;
  let logs = await db.fetch(`logs_${message.guild.id}_msglogs`);
  if(logs === null) i++;
  if(i == 0) logs = message.guild.channels.cache.get(logs);
  if(logs === undefined || logs === null) i++;
  
  let embed = new Discord.MessageEmbed()
  .setAuthor(message.author.tag+" je mutirao/la člana "+user.tag, message.author.displayAvatarURL())
  .addField("Vrijeme", vrijeme)
  .addField("Razlog", razlog)
  .setThumbnail(user.displayAvatarURL())
  .setFooter(client.config.embed.footer, client.user.displayAvatarURL())
  .setTimestamp();
  if(i == 0) logs.send(embed);
  
  db.set(`mutetime_${message.guild.id}_${user.id}`, { time: time, date: Date.now(), channel: message.channel.id });
  Timeout.set("mute_" + message.guild.id + "_" + user.id, () => {
    member.roles.remove(muted).then(() => {
      db.delete(`mutetime_${message.guild.id}_${user.id}`);
      message.channel.send("Istekao je privremeni mute člana "+user.tag);
      if(i == 0) {
        let timeoutEmbed = new Discord.MessageEmbed()
        .setTitle("Istekao je privremeni mute člana "+user.tag)
        .setThumbnail(user.displayAvatarURL())
        .setFooter(client.config.embed.footer, client.user.displayAvatarURL())
        .setTimestamp();
        logs.send(timeoutEmbed);
        }
    }).catch(err => {
      console.log(err);
      if(i == 0) {
        let errorEmbed = new Discord.MessageEmbed()
        .setTitle("Istekao je privremeni mute člana "+user.tag+", ali se pojavio error!")
        .addField("Error", err)
        .setThumbnail(user.displayAvatarURL())
        .setFooter(client.config.embed.footer, client.user.displayAvatarURL())
        .setTimestamp();
        logs.send(errorEmbed);
        }
    });
  }, time);
  member.roles.add(muted).then(() => message.channel.send("Mutirao/la si člana "+member.toString()+" na "+vrijeme+" zbog: "+razlog))
  .catch(err => message.channel.send("Nisam mogao mutirati tog člana zbog: "+err));
}