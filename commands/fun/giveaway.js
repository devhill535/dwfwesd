const { MessageEmbed } = require("discord.js");
const ms = require("ms");
module.exports={
 name: 'giveway',
    category: 'Fun',
    description: 'Giveaway command',
    run: async(bot,message,args)=>{
  if (!args[0]) return message.channel.send('â ?giveaway <time> <gift>');
    if ( !args[0].endsWith("h") && !args[0].endsWith("m") && !args[0].endsWith("s")) return message.channel.send('You can only use m/h/s for the giveaway time');
    const gift = args.slice(1).join(" ");
    if (!gift) return message.channel.send('â ?giveaway <time> <gift>');
    const giftembed = new MessageEmbed()
      .setTitle(`**${gift}**`)
      .setDescription(`React with ð to enter`)
     .addField(`Time`, `${(args[0])}`, true)
    .addField(`Hosted by`, `${message.author}`, true)
      .setColor("RANDOM");
    const g = await message.channel.send('ððGIVEAWAYðð',giftembed);
    g.react("ð");
    setTimeout(() => {
      if (g.reactions.cache.get("ð").count <= 1) {
          const cancel = new MessageEmbed()
                .setDescription(`No one reacted so i canceled the giveaway`)
        return g.edit(cancel);
      }

 const won = g.reactions.cache .get("ð").users.cache.filter((not) => !not.bot).random();
      message.channel.send(`Crongats **${won}** , you won **${gift}**!`);
      won.send(`Crongats **${won}** you won **${gift}** in ${message.guild.name} server!`)
    }, ms(args[0]));
  },
};
