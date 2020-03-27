const db = require("quick.db");

module.exports = async (client, guild) => {
  console.log(`Obrisan sam sa: ${guild.name} (id: ${guild.id})`);

  client.user.setActivity(
    `${client.config.ime} || ${client.config.prefix}help`
  );
  
  let money = await db.startsWith(`money_${guild.id}`);
  for(let i = 0; i < money.length; i++) {
    let userid = money[i].ID.split("_")[2];
    let data = await db.fetch(`money_${guild.id}_${userid}`);
    if(data !== null) db.delete(`money_${guild.id}_${userid}`);
  }
  let bank = await db.startsWith(`bank_${guild.id}`);
  for(let i = 0; i < bank.length; i++) {
    let userid = bank[i].ID.split("_")[2];
    let data = await db.fetch(`bank_${guild.id}_${userid}`);
    if(data !== null) db.delete(`bank_${guild.id}_${userid}`);
  }
  let daily = await db.startsWith(`daily_${guild.id}`);
  for(let i = 0; i < daily.length; i++) {
    let userid = daily[i].ID.split("_")[2];
    let data = await db.fetch(`daily_${guild.id}_${userid}`);
    if(data !== null) db.delete(`daily_${guild.id}_${userid}`);
  }
  let weekly = await db.startsWith(`weekly_${guild.id}`);
  for(let i = 0; i < weekly.length; i++) {
    let userid = weekly[i].ID.split("_")[2];
    let data = await db.fetch(`weekly_${guild.id}_${userid}`);
    if(data !== null) db.delete(`weekly_${guild.id}_${userid}`);
  }
  let msglogs = await db.fetch(`logs_${guild.id}_msglogs`);
  if(msglogs !== null) db.delete(`logs_${guild.id}_msglogs`);
  let memberlogs = await db.fetch(`logs_${guild.id}_memberlogs`);
  if(memberlogs !== null) db.delete(`logs_${guild.id}_memberlogs`);
  
}