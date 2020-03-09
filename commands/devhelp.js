exports.run = (client, message, args) => {
  if(message.author.id !== "495897264108339200") return;
    var devhelpEmbed = new client.Discord.RichEmbed()
    .setAuthor("Zdravo, "+message.author.username+"#"+message.author.discriminator, message.author.displayAvatarURL)
    .setDescription("**EXOTIC BOT** developerske komande.")
    .addField("⚡ Developerske komande",
              "**"+client.config.prefix+"restart** - globalno restartovanje bota!\n"+
              "**"+client.config.prefix+"serverinvites** - ispis svih invite linkova od svih servera!\n"+
              "**"+client.config.prefix+"reload [komanda]** - reloadanje pojedinih komandi!" )
    .setColor(client.config.embed.devcolor)
    .setFooter(client.config.embed.footer)
    .setTimestamp();
    message.channel.send(devhelpEmbed);
}