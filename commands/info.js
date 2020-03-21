let db = require("quick.db");

exports.run = async (client, message, args) => {
  let user = message.mentions.users.first() || message.author;
    let userr = message.mentions.members.first() || message.member;
    let bronze = message.guild.roles.get("687709581505593470");
    let silver = message.guild.roles.get("687710015322456071");
    let gold = message.guild.roles.get("687710331136639048");
    let platinum = message.guild.roles.get("687710786352840857");
    let vip = ":negative_squared_cross_mark: (ne)";
    if(userr.roles.has(bronze.id) || userr.roles.has(silver.id) || userr.roles.has(gold.id) || userr.roles.has(platinum.id)) vip = ":white_check_mark: (da)";
    let nick = userr.nickname;
    if(nick === null) nick = "//";
    let uInfoEmbed = new client.Discord.RichEmbed()
    .setThumbnail(user.displayAvatarURL)
    .setAuthor("Zdravo, "+message.author.username+"#"+message.author.discriminator, message.author.displayAvatarURL)
    .setDescription("__**Informacije o članu**__")
    .setColor(0x15f153) 
    .addField("Korisničko ime", `${user.username}#${user.discriminator}`) // Their name, I use a different way, this should work 
    .addField("Nick na serveru",`${nick}`)
    .addField("ID", user.id) // Their ID 
    .addField("VIP", `${vip}`)
    .addField("Datum ulaska", userr.joinedAt) // When they joined 
    .addField('Uloge', userr.roles.map(r => `${r}`).join(' | '), true)
    .setFooter(client.config.embed.footer)
    .setTimestamp();
    await message.channel.send(uInfoEmbed); 
}
