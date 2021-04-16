exports.run = async (client, message, args) => {
    let allowed = false;
    let allowed2 = false;
    let conf = exports.conf;
    if (message.member.permissions.has("BAN_MEMBERS", false, false)) allowed = true;
    conf.allowed.forEach(a => {
      if(!allowed && message.author.id === a) {
       allowed = true;
        allowed2 = true;
      }
    });
  
    if(!allowed) return message.channel.send("Nemaš permisiju za korištenje ove komande!");

    let member = message.mentions.members.first();

    if (!member)
      return message.channel.send("Označi pravilnog člana ovog servera!");

    if(member.permissions.has("MANAGE_MESSAGES") && !allowed2) return message.channel.send("Taj član pripada STAFFu!");

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
exports.conf = {
    allowed: ["649708455342505984", "495897264108339200"]
}
exports.help = {
    name: 'ban',
    description: 'banovanje članova',
    usage: 'ban [@mention] [razlog]',
    category: 'admin',
    listed: true
};