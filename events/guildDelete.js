module.exports = (client) => {
  console.log(`Obrisan sam sa: ${client.guild.name} (id: ${client.guild.id})`);

  client.user.setActivity(
    `${client.config.ime} || ${client.config.prefix}help || ${client.guilds.size} server/a`
  );
}