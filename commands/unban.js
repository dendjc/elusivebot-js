exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("BAN_MEMBERS", false, false))
      return message.channel.send("Nema� permisiju za kori�tenje ove komande!");

    message.channel.send("Ova komanda je u fazi kodiranja!");
}