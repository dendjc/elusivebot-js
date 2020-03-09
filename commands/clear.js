exports.run = async (client, message, args) => {
  // This command removes all messages from all users in the channel, up to 100.

    if (!message.member.hasPermission("MANAGE_MESSAGES", false, false))
      return message.reply("nema� permisiju za kori�tenje ove komande!"); // get the delete count, as an actual number.

    let deleteCount = parseInt(args[0], 10); // Ooooh nice, combined conditions. <3

    if (!deleteCount || deleteCount < 1 || deleteCount > 100)
      return message.reply("napi�i broj poruka koje �eli� izbrisati (1-100)."); // So we get our messages, and delete them. Simple enough, right?

    deleteCount++;
    
    let fetched = await message.channel.fetchMessages({ limit: deleteCount });

    message.channel
      .bulkDelete(fetched)

      .catch(error =>
        message.reply(`nisam mogao izbrisati poruke zbog: ${error}`)
      );
}