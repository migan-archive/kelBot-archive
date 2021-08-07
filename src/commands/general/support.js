const { MessageEmbed } = require('discord.js');
// const { AdminSend } = require('../../utils/AdminSend');
const config = require('../../../config')

module.exports = {
    name: 'support',
    aliases: ['문의'],
    description: 'support',
    execute: async ({ msg, args, client }) => {
        const admin = await client.users.fetch(config.admin);
        const text = args.join(' ');
        if (!text) return msg.reply('Missing Arguments.');

        const Embed = new MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .setTitle('Support Success')
            .setColor('RANDOM')
            .setDescription(`Support content: ${text}`)
            .setTimestamp(Date.now())
            .setFooter(client.user.username, client.user.displayAvatarURL());

        const Embed1 = new MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .setTitle('Support')
            .setColor('RANDOM')
            .setDescription(`
Support content: ${text}
The author of the supports: ${msg.author.username}`)
            .setTimestamp(Date.now())
            .setFooter(client.user.username, client.user.displayAvatarURL());

        msg.react('✅');
        msg.channel.send({ embeds: [Embed] });
        admin.send({ embeds: [Embed1] });
    }
}