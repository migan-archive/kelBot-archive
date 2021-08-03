const { MessageEmbed } = require('discord.js');
const prefix = require('../../../config');

module.exports = {
    name: 'help',
    aliases: ['도움', '도움말'],
    description: 'this bot\'s command',
    execute: ({ msg, client }) => {
        const Embed = new MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .setTitle('Commands')
            .setColor('RANDOM')
            .setDescription(`prefix: \`\`${prefix}\`\``)
            .addFields(
                {
                    name: 'general',
                    value: `\`\`\`
help [도움, 도움말]
support [문의]\`\`\``
                },
                {
                    name: 'util',
                    value: `\`\`\`
ping [핑]\`\`\``
                }
            )
            .setTimestamp(Date.now())
            .setFooter(client.user.username, client.user.displayAvatarURL());
        msg.channel.send(Embed);
    }
}