const words = require("../rijeci.js");
const db = require("quick.db");

module.exports = async (client, message) => {
  let prefix = await db.fetch(`settings_${message.guild.id}_prefix`);
  if(prefix === null) prefix = client.config.prefix;
  // Ignore all bots 
  if (message.author.bot) return; 
  if(words.zabranjeno.some(word => message.content.toLowerCase().includes(word)) && !message.member.permissions.has("KICK_MEMBERS")) {
     let razlog = "Zabranjena riječ!";
     if(words.link.some(word => message.content.toLowerCase().includes(word)) && !message.member.permissions.has("KICK_MEMBERS")) 
        razlog = "Vanjski link/Discord pozivnica!";
     db.add(`warns_${message.guild.id}_${message.author.id}`, 1);
     let forbiddenEmbed = new client.Discord.MessageEmbed()
     .setColor("#FFFFFF")
     .setAuthor(message.author.username+" je dobio/la warn!", message.author.displayAvatarURL())
     .setDescription("**Razlog:** "+razlog);
     message.delete().then(() => message.channel.send(forbiddenEmbed))
    .catch(err => console.log(err));
  }
  if(message.mentions.has(client.user) && !message.mentions.has(message.guild.id) && message.content.indexOf(prefix) !== 0) {
    message.delete(); 
    message.channel.send("Listu komandi i ostalo možeš naći na `"+prefix+"help`")
    .then(msg => msg.delete({ timeout: 5000 }));
    return;
  }
  
  if(message.mentions.has(client.user) && message.author.id === client.config.dev.id && message.content.toLowerCase().includes("prefix")) 
    db.delete(`settings_${message.guild.id}_prefix`);
  
  if(message.mentions.has(client.users.cache.get(client.config.dev.id)) && !message.member.permissions.has("KICK_MEMBERS")) {
    let developerEmbed = new client.Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setAuthor("Ne možeš tag developera!", message.author.displayAvatarURL());
    message.delete();
    message.channel.send(developerEmbed).then(msg => msg.delete({ timeout: 5000 }));
    return;
  }
  // Ignore messages not starting with the prefix (in config.json) 
  if (message.content.indexOf(prefix) !== 0) return; 
  // Our standard argument/command name definition. 
  const args = message.content.slice(prefix.length).trim().split(/ +/g); 
  const command = args.shift().toLowerCase(); 
  // Grab the command data from the client.commands Enmap 
  const cmd = client.commands.get(command); 
  // If that command doesn't exist, silently exit and do nothing 
  if (!cmd) return; 
  // Run the command 
  cmd.run(client, message, args); 
};