const db = require("quick.db");

exports.load = async (client, message, args) => {
  let status = await db.fetch(`code_${message.guild.id}_status`);
  if(status === null || status.code == 1) return message.channel.send("**[10-5]** Bot je već na dužnosti!");
  else if(status.code == 3) return message.channel.send("**[10-5]** Bot je na pauzi! Koristi `STATUS-4`");
  else if(status.code == 101) {
    let role = message.guild.roles.cache.get(status.role);
    db.set(`code_${message.guild.id}_status`, { code: 1 });
    let member = message.guild.members.cache.get(client.user.id);
    member.roles.remove(role).then(() => {
      role.delete();
    });
    member.setNickname(client.user.username);
    message.channel.send("**[10-4 - STATUS-1]** ANTI-RAID mod isključen!");
    message.guild.channels.cache.forEach(c => {
      c.updateOverwrite(message.guild.id, {
        SEND_MESSAGES: null,
        ADD_REACTIONS: null
      });
    });
    let channel = message.guild.channels.cache.get("686582766485372955");
    if(channel) {
      channel.updateOverwrite(message.guild.id, {
        SEND_MESSAGES: false
      });
    }
    return;
  }
  message.channel.send("**[10-4 - STATUS-1]** Bot na dužnosti!")
  .then(() => {
    let member = message.guild.members.cache.get(client.user.id);
    member.setNickname(client.user.username);
    db.set(`code_${message.guild.id}_status`, { code: 1 })
  })
  .catch(err => message.channel.send("**[10-5]** Greška:\n" + err));
}