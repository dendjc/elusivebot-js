exports.run = (client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Nemaš permisiju za korištenje te komande!");
  
  let member = message.mentions.members.first();
  if(!member) return message.channel.send("Nisi označio/la člana!");
  
  let role = message.mentions.roles.first();
  if(!role) return message.channel.send("Nisi označio/la ulogu!");
  
  let bot = message.guild.members.get(client.user.id).highestRole;
  if(role.position > bot.position) return message.channel.send("Ta uloga je na većoj poziciji od uloge bota!");
  if(message.member.highestRole.position < role.position && message.author.id !== message.guild.ownerID) return message.channel.send("Ne možeš skidati uloge koje imaju veću poziciju od tvoje!")
  
  if(!member.roles.has(role.id)) return message.channel.send(member+" nema tu ulogu!");
  
  member.removeRole(role)
  .then(() => message.channel.send("Oduzeo/la si ulogu "+role.name+" članu "+member))
  .catch(err => message.channel.send("Nisam mogao dati role tom članu zbog: "+err));
}