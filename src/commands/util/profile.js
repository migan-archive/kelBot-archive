const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'profile',
    aliases: ['프로필'],
    description: 'user\'s profile',
    execute: ({ msg, client }) => {
        const user = msg.mentions.users.first() || msg.author;

        const Embed = new MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .setTitle(`${user.username}'s Profile`)
            .setColor('RANDOM')
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .addFields(
                {
                    name: 'Name',
                    value: `${user.username}`
                },
                {
                    name: 'CreatedTimestamp',
                    value: `${new Date(user.createdTimestamp).toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' })}`
                },
                {
                    name: "ID",
                    value: `${user.id}`
                },
                {
                    name: "Status",
                    value: 'Not currently supported'
                },
                {
                    name: "Bot",
                    value: `${user.bot}`
                }
            )
            .setTimestamp(Date.now())
            .setFooter(client.user.username, client.user.displayAvatarURL());
        msg.channel.send({ embeds: [Embed] });
    }
}