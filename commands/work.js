const db = require("quick.db");
const Discord = require("discord.js");
const ms = require("parse-ms");

exports.run = async (client, message, args) => {
  if (message.channel.id !== "720037489980735520")
    return message.channel.send(
      "Ovu komandu možeš koristiti samo u kanalu <#720037489980735520>"
    );

  let user = message.author;
  let author = await db.fetch(`work_${message.guild.id}_${user.id}`);

  let timeout = 10000;

  if (author !== null && timeout - (Date.now() - author) > 0) {
    let time = ms(timeout - (Date.now() - author));

    let timeEmbed = new Discord.MessageEmbed()
      .setColor("#FFFFFF")
      .setDescription(
        `:moneybag: Već si nedavno radio/la!\n\nPokušaj ponovo za ${time.minutes}m ${time.seconds}s `
      );
    message.channel.send(timeEmbed);
  } else {
    let replies = [
      "Programer",
      "Pilot",
      "Doktor",
      "Policajac",
      "Vatrogasac",
      "Džeparoš",
      "Obučar",
      "Menadžer",
      "Fudbaler",
      "Kovač",
      "Pevač",
      "Komičar",
      "Pediker/ka",
      "Učitelj",
      "Ministar",
      "Zaštitar",
      "Frizer/ka",
      "Vodoinstalater",
      "Poljoprivrednik",
      "Mehaničar",
      "Dostavljač",
      "Mašinovođa",
      "Prodavač cigareta",
      "Prodavač narkotika",
      "Baštovan",
      "Keramičar",
      "Jutjuber",
      "Čuvar životinja",
      "Privatni vozač",
      "Tastatura mafijaš",
      "Voditelj",
      "Trener",
      "Kamerman",
      "Čarobnjak",
      "Pisar",
      "Baba Vanga",
      "Psihijatar",
      "Varioc",
      "Krojač/ica",
      "Operater",
      "Specijalista",
      "Sveštenik",
      "Hodža",
      "Isterivač demona",
      "Rudar",
      "Šumar",
      "Farmaceut",
      "Farmer",
      "Fizioterapeut",
      "Traktor",
      "Harmonikaš",
      "Muzičar",
      "Veljko Kunić",
      "Toni Grgić",
      "Sanja Grospić",
      "Primarijus Guzina",
      "Šemsudin Dino Poplava",
      "Notar",
      "Košarkaš",
      "Odbojkaš",
      "Atletičar",
      "Dizajner",
      "Pekar",
      "Zatvorenik",
      "Advokat",
      "Sudija",
      "Saobraćajac",
      "Inspektor",
      "Načelnik policije",
      "Pregovarač",
      "Naučnik",
      "FBI AGENT",
      "Deda mraz",
      "Božić bata",
      "Profesionalni gejmer",
      "Odžačar",
      "Filozof",
      "Astronaut",
      "Prodavač automobila",
      "Gineokolog",
      "Taksista",
      "Ugostitelj",
      "Šef kuhinje",
      "Mesar",
      "Kondukter",
      "Carinik",
      "Kontroler",
      "CIA AGENT",
      "Super Heroj",
      "Supermen",
      "Spiderman",
      "Viljuškarista",
      "Pizza majstor",
      "Pomagač",
      "Zamenik Ministra Zdravstva",
      "Ljubica",
    ];

    let result = Math.floor(Math.random() * replies.length);
    let amount = Math.floor(Math.random() * 80) + 1;
    let embed1 = new Discord.MessageEmbed()
      .setColor("#FFFFFF")
      .setDescription(
        `:moneybag: Radio/la si kao ${replies[result]} i zaradio/la ${amount}$!`
      );
    message.channel.send(embed1);
    db.add(`money_${message.guild.id}_${user.id}`, amount);
    db.set(`work_${message.guild.id}_${user.id}`, Date.now());
  }
};
exports.help = {
  name: "work",
  description: "rad",
  usage: "work",
  category: "economy",
  listed: true
};
