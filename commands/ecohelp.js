exports.run = (client, message, args) => {
  var ecohelpEmbed = new client.Discord.MessageEmbed() // Creates a new rich embed (see https://discord.js.org/#/docs/main/stable/class/RichEmbed) 
    .setAuthor("Zdravo, "+message.author.username+"#"+message.author.discriminator, message.author.displayAvatarURL()) 
    .setDescription("**Napomena**: ukoliko je potreban unos dodatnih varijabli u komandu, one su označene sa `[]` i `()` u listi komandi.\nValuta je **dolar ($)**.") 
    .addField("👑 Administratorske komande", // Sets the title of the field 
              "**"+client.config.prefix+"am [@mention] [količina]** - dodavanje novca na račun članova!\n"+
              "**"+client.config.prefix+"rm [@mention] [količina]** - oduzimanje novca sa računa članova!\n"+
              "**"+client.config.prefix+"addrank [@mention] [broj]** - davanje ranka članovima!\n"+
              "**"+client.config.prefix+"removerank [@mention]** - oduzimanje ranka članovima!" ) 
    .addField("👨 Korisničke komande", // Sets the title of the field 
              "**"+client.config.prefix+"bal [@mention (neobavezno)]** - stanje na računu!\n"+
              "**"+client.config.prefix+"withdraw [količina]** - podizanje novca sa banke!\n"+ 
              "**"+client.config.prefix+"deposit [količina]** - stavljanje novca na banku!\n"+
              "**"+client.config.prefix+"work** - rad!\n"+
              "**"+client.config.prefix+"pay [@mention] [količina]** - slanje novca članovima!\n"+
              "**"+client.config.prefix+"top** - tabela najbogatijih članova!\n"+
              "**"+client.config.prefix+"daily** - sakupljanje dnevne nagrade!\n"+
              "**"+client.config.prefix+"weekly** - sakupljanje sedmične nagrade!\n"+
              "**"+client.config.prefix+"shop** - kupovina rankova!\n"+
              "**"+client.config.prefix+"slots** - slot automat!" )
    .setColor(client.config.embed.color) // Sets the color of the embed 
    .setFooter(client.config.embed.footer, client.user.displayAvatarURL()) // Sets the footer of the embed 
    .setTimestamp(); 
    message.channel.send(ecohelpEmbed);
}