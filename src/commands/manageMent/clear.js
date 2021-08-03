const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "clear",
    aliases: ["청소"],
    execute: async ({ client, msg, args }) => {
        if (!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.reply("Your this Command cannot Use.");
        if (!args[0]) return msg.reply("Missing Arguments.");
        if (isNaN(args[0])) return msg.reply("Please enter a number.");
        if (args[0] > 100) return msg.reply("I can't erase more than 100.");
        if (args[0] < 1) return msg.reply("More than one, please.");

        await msg.channel.messages.fetch({ limit: args[0] }).then(messages => {
            msg.channel.bulkDelete(messages);
        });
        msg.channel.send(
            new MessageEmbed()
                .setColor('RANDOM')
                .setTitle("Clear")
                .setDescription(`Manager ${msg.author.username} Chatting at the request of ${args[0]}has been deleted!`)
                .setTimestamp(Date.now())
                .setFooter(`Manager: ${msg.author.tag}`, msg.author.displayAvatarURL())
        );
    }
}