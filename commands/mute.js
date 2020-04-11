const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("Nemaš permisiju za korištenje ove komande!");
  
  let member = message.mentions.members.first();
  if(!member) return message.channel.send("Nisi označio/la člana!");
  let user = client.users.cache.get(member.id);
  if(message.member === member) return message.channel.send("Ne možeš sebe mutirati!");
  if(member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("Ne možeš mutirati člana STAFFa!");
  
  let razlog = args.slice(1).join(" ");
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
  
  let i = 0;
  let logs = await db.fetch(`logs_${message.guild.id}_msglogs`);
  if(logs === null) i++;
  if(i == 0) logs = message.guild.channels.cache.get(logs);
  if(logs === undefined || logs === null) i++;
  
  let embed = new Discord.MessageEmbed()
  .setAuthor(message.author.tag+" je mutirao/la člana "+user.tag, message.author.displayAvatarURL())
  .addField("Razlog", razlog)
  .setThumbnail(user.displayAvatarURL())
  .setFooter(client.config.embed.footer, client.user.displayAvatarURL())
  .setTimestamp();
  if(i == 0) logs.send(embed);
  
  member.roles.add(muted).then(() => message.channel.send("Mutirao/la si člana "+member.toString()+" zbog: "+razlog))
  .catch(err => message.channel.send("Nisam mogao mutirati tog člana zbog: "+err));
}