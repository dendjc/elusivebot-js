const db = require("quick.db");

exports.run = async (client, message, args) => {
  let prefix = await db.fetch(`settings_${message.guild.id}_prefix`);
  if(prefix === null) prefix = client.config.prefix;
  var helpEmbed = new client.Discord.MessageEmbed() // Creates a new rich embed (see https://discord.js.org/#/docs/main/stable/class/RichEmbed) 
    .setAuthor("Zdravo, "+message.author.username+"#"+message.author.discriminator, message.author.displayAvatarURL) 
    .setDescription("**Napomena**: ukoliko je potreban unos dodatnih varijabli u komandu, one su označene sa `[]` i `()` u listi komandi.") 
    .addField("👑 Administratorske komande", // Sets the title of the field 
              "**"+prefix+"text [tekst]** - ispis teksta preko bota!\n"+
              "**"+prefix+"clear [broj poruka (1-100)]** - brisanje poruka!\n"+
              "**"+prefix+"kick [@mention] [razlog]** - kickanje članova!\n"+ 
              "**"+prefix+"ban [@mention] [razlog]** - banovanje članova!\n"+ 
              "**"+prefix+"unban [ID]** - unbanovanje članova!\n"+
              "**"+prefix+"anick [@mention] [nick]** - mjenjanje nicka članovima!\n"+
              "**"+prefix+"setlogs [vrsta (1-2)] [#kanal]** - postavljanje logging kanala!\n"+
              "**"+prefix+"resetlogs [vrsta (1-2)]** - resetovanje logging kanala!\n"+
              "**"+prefix+"addrole [@mention] [@uloga]** - davanje uloge članovima!\n"+
              "**"+prefix+"removerole [@mention] [@uloga]** - skidanje uloge članovima!\n"+
              "**"+prefix+"warn [@mention] [razlog]** - warnanje članova!\n"+
              "**"+prefix+"unwarn [@mention] [1-20 ili all]** - brisanje warnova članovima!\n"+
              "**"+prefix+"lockdown [vrijeme u ms]** - zaključavanje kanala!\n"+
              "**"+prefix+"emoji [ime]** - slanje emojia preko bota!\n"+
              "**"+prefix+"react [ime emojia] [ID poruke] [vrsta (1-2)]** - reagovanje na poruku!\n"+
              "**"+prefix+"mute [@mention] [razlog]** - mutiranje članova!\n"+
              "**"+prefix+"unmute [@mention] [razlog]** - odmutiranje članova!")
    .addField("👨 Korisničke komande", // Sets the title of the field 
              "**"+prefix+"ping** - ispis trenutnog pinga!\n"+
              "**"+prefix+"info [@mention (neobavezno)]** - informacije o korisničkom računu!\n"+ 
              "**"+prefix+"botinfo** - informacije o botu!\n"+
              "**"+prefix+"nick [nick]** - promjena nicka na serveru!\n"+
              "**"+prefix+"avatar [@mention (neobavezno)]** - prikaz avatara!\n"+
              "**"+prefix+"ecohelp** - sistem ekonomije!\n"+
              "**"+prefix+"countdown** - odbrojavanje!")
    .setColor(client.config.embed.color) // Sets the color of the embed 
    .setFooter(client.config.embed.footer, client.user.displayAvatarURL()) // Sets the footer of the embed 
    .setTimestamp(); 
    message.channel.send(helpEmbed);
}