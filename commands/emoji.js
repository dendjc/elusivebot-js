exports.run = async (client, message, args) => {
  if(!message.member.permissions.has("ADMINISTRATOR")) return;
  let emojiname = args[0];
  if(!emojiname) return;
  let emoji = client.emojis.cache.find(em => em.name === emojiname);
  if(!emoji) return;
  message.delete();
  if(!emoji.animated) return message.channel.send("<:"+emoji.name+":"+emoji.id+">");
  message.channel.send("<a:"+emoji.name+":"+emoji.id+">");
}