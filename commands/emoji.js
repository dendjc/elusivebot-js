exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return;
  let emojiname = args[0];
  if(!emojiname) return;
  let emoji = client.emojis.find(em => em.name === emojiname);
  if(!emoji) return;
  message.delete();
  if(!emoji.animated) return message.channel.send("<:"+emoji.name+":"+emoji.id+">");
  message.channel.send("<a:"+emoji.name+":"+emoji.id+">");
}