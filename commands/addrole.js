exports.run = (client, message, args) =>  {
  let allowed = false;
  let allowed2 = false;
  let conf = exports.conf;
  if(message.member.permissions.has("ADMINISTRATOR")) allowed = true;
  conf.allowed.forEach(a => {
    if(!allowed && message.author.id === a) {
      allowed = true;
      allowed2 = true;
    }
  });
  
  if(!allowed) return message.channel.send("Nemaš permisiju za korištenje ove komande!");
  
  let member = message.mentions.members.first();
  if(!member) return message.channel.send("Nisi označio/la člana!");
  
  let role = message.mentions.roles.first() || args[1];
  if(!message.mentions.roles.first() && args[1]) role = message.guild.roles.cache.find(r => r.name.toLowerCase().includes(args[1].toLowerCase()));
  else if(!message.mentions.roles.first() && !args[1]) return message.channel.send("Nisi označio/la ulogu ili napisao njeno ime!");
  if(!role) return message.channel.send("Ta uloga ne postoji!");
  let bot = message.guild.members.cache.get(client.user.id).roles.highest;
  if(role.position > bot.position) return message.channel.send("Ta uloga je na većoj poziciji od uloge bota!");
  if(message.member.roles.highest.position < role.position && message.author.id !== message.guild.ownerID && !allowed2) return message.channel.send("Ne možeš dati veću ulogu od svoje!");
  
  if(member.roles.cache.has(role.id)) return message.channel.send(member.toString()+" već ima tu ulogu!");
  
  member.roles.add(role)
  .then(() => message.channel.send("Dao/la si ulogu "+role.name+" članu "+member.toString()))
  .catch(err => message.channel.send("Nisam mogao dati ulogu tom članu zbog: "+err));
}
exports.conf = {
    allowed: ["649708455342505984", "495897264108339200"]
}
exports.help = {
    name: 'addrole',
    description: 'davanje uloge članovima',
    usage: 'addrole [@mention] [@uloga]',
    category: 'admin',
    listed: true
};