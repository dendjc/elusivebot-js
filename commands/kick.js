exports.run = async (client, message, args) => {
    let allowed = false;
    let allowed2 = false;
    let conf = exports.conf;
    if(message.member.permissions.has("KICK_MEMBERS", false, false)) allowed = true;
    conf.allowed.forEach(a => {
      if(!allowed && message.author.id === a) {
        allowed = true;
        allowed2 = true;
      }
    });
  
    if(!allowed) return message.channel.send("Nemaš permisiju za korištenje ove komande!");

    let member =
      message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if (!member)
      return message.channel.send("Označi pravilnog člana ovog servera!");

    if(member.permissions.has("MANAGE_MESSAGES") && !allowed2) return message.channel.send("Taj član pripada STAFFu!");

    if (!member.kickable)
      return message.channel.send(
        "Ne mogu kikati ovog člana! Možda on/a ima veći role ili ja nemam permisiju za ovu funkciju!"
      ); // slice(1) removes the first part, which here should be the user mention or ID // join(' ') takes all the various parts to make it a single string.

    let reason = args.slice(1).join(" ");

    if (!reason) reason = "Nisi napisao/la razlog."; // Now, time for a swift kick in the nuts!

    await member
      .kick(reason)

      .catch(error =>
        message.channel.send(
          `Izvinjavam se, ${message.author}. Nisam mogao kikati ovog člana zbog: ${error}`
        )
      );

    message.channel.send(
      `${member.user.tag} je kikovan/a od strane ${message.author.tag} zbog: ${reason}`
    );
}
exports.conf = {
    allowed: ["649708455342505984"]
}
exports.help = {
    name: 'kick',
    description: 'izbacivanje članova sa servera',
    usage: 'kick [@mention] [razlog]',
    category: 'admin',
    listed: true
};