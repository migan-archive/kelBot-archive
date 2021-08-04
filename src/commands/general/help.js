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
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
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
ping [핑]
profile [프로필]\`\`\``
                },
                {
                    name: 'management',
                    value: `\`\`\`
kick [킥]
ban [밴]
clear [청소]\`\`\``
                },
                {
                    name: 'botmanagement',
                    value: `\`\`\`
reload
load
deload\`\`\``
                }
            )
            .setTimestamp(Date.now())
            .setFooter(client.user.username, client.user.displayAvatarURL());
        msg.channel.send(Embed);
    }
}