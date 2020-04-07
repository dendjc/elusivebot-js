const db = require("quick.db");

exports.run = async (client, message, args) => {
  if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("Nemaš permisiju za korištenje ove komande!");
  
  let broj = args[0];
  if(!broj) return message.channel.send("Nisi napisao/la vrstu logging kanala!\n1 - logging za poruke,\n2 - logging za ulaz/izlaz članova sa servera,\n3 - logging za warn!");
  if(isNaN(broj) || broj < 1 || broj > 3) return message.channel.send("Nisi pravilno napisao/la vrstu logging kanala!");
  
  if(broj == 1) {
    let logs = await db.fetch(`logs_${message.guild.id}_msglogs`);
    if(logs !== null) return message.channel.send("Već si podesio/la logging kanal za poruke! Možeš ga resetovati komandom **"+client.config.prefix+"resetlogs 1**");
    
    let kanal = message.mentions.channels.first();
    if(!kanal) return message.channel.send("Nisi označio/la kanal!");
    
    db.set(`logs_${message.guild.id}_msglogs`, kanal.id);
    message.channel.send("Podesio/la si logging kanal za poruke ("+kanal.toString()+")!");
  }
  
  if(broj == 2) {
    let logs = await db.fetch(`logs_${message.guild.id}_memberlogs`);
    if(logs !== null) return message.channel.send("Već si podesio/la logging kanal za ulaz/izlaz članova! Možeš ga resetovati komandom **"+client.config.prefix+"resetlogs 2**");
    let kanal = message.mentions.channels.first();
    if(!kanal) return message.channel.send("Nisi označio/la kanal!");
    
    db.set(`logs_${message.guild.id}_memberlogs`, kanal.id);
    message.channel.send("Podesio/la si logging kanal za ulaz/izlaz članova ("+kanal.toString()+")!");
  }
  if(broj == 3) {
    let logs = await db.fetch(`logs_${message.guild.id}_warnlogs`);
    if(logs !== null) return message.channel.send("Već si podesio/la logging kanal za warn! Možeš ga resetovati komandom **"+client.config.prefix+"resetlogs 3**");
    let kanal = message.mentions.channels.first();
    if(!kanal) return message.channel.send("Nisi označio/la kanal!");
    
    db.set(`logs_${message.guild.id}_warnlogs`, kanal.id);
    message.channel.send("Podesio/la si logging kanal za warn ("+kanal.toString()+")!");
  }
}