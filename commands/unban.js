exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("BAN_MEMBERS", false, false))
      return message.channel.send("Nemaš permisiju za korištenje ove komande!");

    message.channel.send("Ova komanda je u fazi kodiranja!");
}