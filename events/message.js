const words = require("../rijeci.js");

module.exports = async (client, message) => {
  // Ignore all bots 
  if (message.author.bot) return; 
  let owner = message.guild.roles.get(client.server.owner);
  if(words.zabranjeno.some(word => message.content.toLowerCase().includes(word)) && !message.member.roles.has(owner.id)) {
     let razlog = "Zabranjena riječ!";
     if(words.link.some(word => message.content.toLowerCase().includes(word)) && !message.member.roles.has(owner.id))
        razlog = "Vanjski link/Discord pozivnica!";
     let forbiddenEmbed = new client.Discord.RichEmbed()
     .setColor("#FFFFFF")
     .setAuthor(message.author.username+" je dobio/la warn!", message.author.displayAvatarURL)
     .setDescription("**Razlog:** "+razlog);
     message.delete().then(() => message.channel.send(forbiddenEmbed))
    .catch(err => console.log(err));
  }
  if(message.isMentioned(client.user) && !message.member.roles.has(owner.id)) {
    message.delete();
    message.channel.send("Listu komandi i ostalo možeš naći na `"+client.config.prefix+"help`")
    .then(msg => msg.delete(5000));
    return;
  }
  if(message.isMentioned(client.users.get("495897264108339200")) && !message.member.roles.has(owner.id)) {
    let developerEmbed = new client.Discord.RichEmbed()
    .setColor("#FFFFFF")
    .setAuthor("Ne možeš tag developera!", message.author.displayAvatarURL);
    message.delete();
    message.channel.send(developerEmbed).then(msg => msg.delete(5000));
    return;
  }
  // Ignore messages not starting with the prefix (in config.json) 
  if (message.content.indexOf(client.config.prefix) !== 0) return; 
  // Our standard argument/command name definition. 
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g); 
  const command = args.shift().toLowerCase(); 
  // Grab the command data from the client.commands Enmap 
  const cmd = client.commands.get(command); 
  // If that command doesn't exist, silently exit and do nothing 
  if (!cmd) return; 
  // Run the command 
  cmd.run(client, message, args); 
};