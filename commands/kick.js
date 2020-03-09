exports.run = async (client, message, args) => {
  // This command must be limited to mods and admins. In this example we just hardcode the role names.

    // Please read on Array.some() to understand this bit:

    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?

    if (!message.member.hasPermission("KICK_MEMBERS", false, false))
      return message.reply("nemaš permisiju za korištenje ove komande!"); // Let's first check if we have a member and if we can kick them! // message.mentions.members is a collection of people that have been mentioned, as GuildMembers. // We can also support getting the member by ID, which would be args[0]

    let member =
      message.mentions.members.first() || message.guild.members.get(args[0]);

    if (!member)
      return message.channel.send("Oznaèi pravilnog èlana ovog servera!");

    if (!member.kickable)
      return message.channel.send(
        "Ne mogu kikati ovog èlana! Možda on ima veæi role ili ja nemam permisiju za ovu funkciju!"
      ); // slice(1) removes the first part, which here should be the user mention or ID // join(' ') takes all the various parts to make it a single string.

    let reason = args.slice(1).join(" ");

    if (!reason) reason = "Nisi napisao razlog."; // Now, time for a swift kick in the nuts!

    await member
      .kick(reason)

      .catch(error =>
        message.channel.send(
          `Izvinjavam se, ${message.author}. Nisam mogao kikati zbog: ${error}`
        )
      );

    message.channel.send(
      `${member.user.tag} je kikovan od strane ${message.author.tag} zbog: ${reason}`
    );
}