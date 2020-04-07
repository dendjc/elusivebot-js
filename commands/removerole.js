exports.run = (client, message, args) => {
  if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("Nemaš permisiju za korištenje te komande!");
  
  let member = message.mentions.members.first();
  if(!member) return message.channel.send("Nisi označio/la člana!");
  
  let role = message.mentions.roles.first();
  if(!role) return message.channel.send("Nisi označio/la ulogu!");
  
  let bot = message.guild.members.cache.get(client.user.id).roles.highest;
  if(role.position > bot.position) return message.channel.send("Ta uloga je na većoj poziciji od uloge bota!");
  if(message.member.roles.highest.position < role.position && message.author.id !== message.guild.ownerID) return message.channel.send("Ne možeš skidati uloge koje imaju veću poziciju od tvoje!")
  
  if(!member.roles.cache.has(role.id)) return message.channel.send(member.toString()+" nema tu ulogu!");
  
  member.roles.remove(role)
  .then(() => message.channel.send("Oduzeo/la si ulogu "+role.name+" članu "+member.toString()))
  .catch(err => message.channel.send("Nisam mogao dati role tom članu zbog: "+err));
}