const db = require("quick.db");

exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Nemaš permisiju za korištenje ove komande!");
  
  let broj = args[0];
  if(!broj) return message.channel.send("Nisi napisao/la vrstu logging kanala!\n1 - logging za poruke,\n2 - logging za ulaz/izlaz članova sa servera,\n3 - logging za warn!");
  if(isNaN(broj) || broj < 1 || broj > 3 ) return message.channel.send("Nisi pravilno napisao/la vrstu logging kanala!");
  
  if(broj == 1) {
    let logs = await db.fetch(`logs_${message.guild.id}_msglogs`);
    if(logs === null) return message.channel.send("Nisi podesio/la logging kanal za poruke! Možeš ga podesiti komandom **"+client.config.prefix+"setlogs 1 [#kanal]**");
    
    db.delete(`logs_${message.guild.id}_msglogs`)
    .then(() => message.channel.send("Resetovao/la si logging kanal za poruke!"));
  }
  
  if(broj == 2) {
    let logs = await db.fetch(`logs_${message.guild.id}_memberlogs`);
    if(logs === null) return message.channel.send("Nisi podesio/la logging kanal za ulaz/izlaz članova! Možeš ga podesiti komandom **"+client.config.prefix+"setlogs 2 [#kanal]**");
    
    db.delete(`logs_${message.guild.id}_memberlogs`)
    .then(() => message.channel.send("Resetovao/la si logging kanal za ulaz/izlaz članova!"));
  }
  
  if(broj == 3) {
    let logs = await db.fetch(`logs_${message.guild.id}_warnlogs`);
    if(logs === null) return message.channel.send("Nisi podesio/la logging kanal za warn! Možeš ga podesiti konandom **"+client.config.prefix+"setlogs 3 [#kanal]**");
    
    db.delete(`logs_${message.guild.id}_warnlogs`)
    .then(() => message.channel.send("Resetovao si logging kanal za warn!"));
  }
}