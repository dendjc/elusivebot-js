exports.run = async (client, message, args) => {
  // This command removes all messages from all users in the channel, up to 100.

    if (!message.member.hasPermission("MANAGE_MESSAGES", false, false))
      return message.reply("nemaš permisiju za korištenje ove komande!"); // get the delete count, as an actual number.

    let deleteCount = parseInt(args[0], 10); // Ooooh nice, combined conditions. <3

    if (!deleteCount || deleteCount < 1 || deleteCount > 100)
      return message.reply("napiši broj poruka koje želiš izbrisati (1-100)."); // So we get our messages, and delete them. Simple enough, right?

    if(deleteCount != 100) deleteCount++;
    
    let fetched = await message.channel.fetchMessages({ limit: deleteCount });

    message.channel
      .bulkDelete(fetched).then(async() => {
        let msg = "poruke";
        if(deleteCount != 100) deleteCount--;
        if(deleteCount == 1) msg = "poruku";
        let clearEmbed = new client.Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setAuthor(message.author.username+" je izbrisao/la "+msg+" u ovom kanalu!", message.author.displayAvatarURL)
        .setDescription("**Broj izbrisanih poruka**: "+deleteCount);
        let logs = client.channels.get("688807368968110180");
        if(message.channel.id !== logs.id) {
          let logsEmbed = new client.Discord.RichEmbed()
          .setColor("#FFFFFF")
          .setAuthor(message.author.username+" je koristio komandu "+client.config.prefix+"clear", message.author.displayAvatarURL)
          .setDescription("**Kanal:** "+message.channel.name)
          .setFooter(client.config.embed.footer)
          .setTimestamp();
          logs.send(logsEmbed);
        }
        message.channel.send(clearEmbed).then(msg => msg.delete(3000));
      })

      .catch(error =>
        message.reply(`nisam mogao izbrisati poruke zbog: ${error}`)
      );
}