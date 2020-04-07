exports.run = async (client, message, args) => {
  // Most of this command is identical to kick, except that here we'll only let admins do it.

    // In the real world mods could ban too, but this is just an example, right? ;)

    if (!message.member.permissions.has("BAN_MEMBERS", false, false))
      return message.channel.send("Nemaš permisiju za korištenje ove komande!");

    let member = message.mentions.members.first();

    if (!member)
      return message.channel.send("Označi pravilnog člana ovog servera!");

    if(member.hasPermission("KICK_MEMBERS")) return message.channel.send("Taj član pripada STAFFu!");

    if (!member.bannable)
      return message.channel.send(
        "Ne mogu banovati ovog člana! Možda on/a ima veći role ili ja nemam permisiju za ovu funkciju!"
      );

    let reason = args.slice(1).join(" ");

    if (!reason) reason = "Nisi napisao/la razlog.";

    await member
      .ban(reason)

      .catch(error =>
        message.channel.send(
          `Izvinjavam se, ${message.author}. Nisam mogao banovati ovog člana zbog: ${error}`
        )
      );

    message.channel.send(
      `${member.user.tag} je banovan/a od strane ${message.author.tag} zbog: ${reason}`
    );
}