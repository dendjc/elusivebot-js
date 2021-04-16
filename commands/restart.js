exports.run = (client, message, args) => {
  if (message.author.id !== client.config.dev.id && message.author.id !==  "649708455342505984" ) return
    message.channel.send("Bot je uspešno restartovan!").then(() => {
      process.exit(1);
      
    });
}
exports.help = {
    name: 'restart',
    description: 'restartovanje bota',
    usage: 'restart',
    category: 'dev',
    listed: false
};