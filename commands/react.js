exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Nemaš permisiju za korištenje ove komande!");
  
  let reactionname = args[0];
  if(!reactionname) return message.channel.send("Nisi napisao/la ime emojia!");
  let reaction = client.emojis.find(r => r.name === reactionname);
  if(!reaction) return message.channel.send("Nisam uspio pronaći taj emoji!");
  
  let msgid = args[1];
  if(!msgid || isNaN(msgid)) return message.channel.send("Nisi napisao/la ID poruke!");
  let msg = await message.channel.fetchMessage(msgid)
  .catch(err => message.channel.send("Ta poruka ne postoji!"));
  
  let broj = args[2];
  if(!broj) return message.channel.send("Nisi napisao/la vrstu reakcije!\n1 - stalna reakcija,\n2 - privremena reakcija (5s).");
  if(isNaN(broj) || broj < 1 || broj > 3) return message.channel.send("Nisi pravilno napisao/la vrstu!");
  
  if(broj == 1) {
    message.delete();
    msg.react(reaction);
  }
  if(broj == 2) {
    message.delete();
    msg.react(reaction).then(r => {
      setTimeout(() => r.remove(), 5000);
    });
  }
  if(broj == 3) {
    message.delete();
    client.emojis.forEach(em => {
      if(em.animated) msg.react(em);
    });
  }
}