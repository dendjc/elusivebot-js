const db = require("quick.db");
const Timeout = require("smart-timeout");

exports.load = async (client, message, args) => {
  let status = await db.fetch(`code_${message.guild.id}_status`);
  if(status !== null && status.code == 1) return message.channel.send("**[10-5]** Status bota je već `STATUS-1`");
  else if(status !== null && status.code == 2) return message.channel.send("**[10-5]** Bot je `STATUS-2`! Koristi `STATUS-1`");
  message.channel.send("**[10-4 - STATUS-4]** Bot na dužnosti!")
  .then(() => {
    let member = message.guild.members.cache.get(client.user.id);
    member.setNickname(client.user.username);
    db.set(`code_${message.guild.id}_status`, { code: 1 });
    if(Timeout.exists("status_3_" + message.guild.id)) Timeout.clear("status_3_" + message.guild.id);
  })
  .catch(err => message.channel.send("**[10-5]** Greška:\n" + err));
}