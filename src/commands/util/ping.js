const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    aliases: ['핑'],
    description: 'this bot\'s latency',
    execute: ({ msg, client }) => {
        const Embed = new MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .setTitle('Latency')
            .setColor('RANDOM')
            .setDescription(`\`\`${client.ws.ping}\`\`ms`)
            .setTimestamp(Date.now())
            .setFooter(client.user.username, client.user.displayAvatarURL());
        msg.channel.send({ embeds: [Embed] });
    }
};