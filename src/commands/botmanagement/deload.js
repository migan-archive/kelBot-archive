module.exports = {
    name: 'deload',
    description: 'command deload',
    aliases: ['디로드'],
    execute: ({ msg, client, args }) => {
        if (msg.author.id !== '415135882006495242') return msg.reply('Your this Command cannot Use.');
        if (!args[0]) return msg.reply('Missing Arguments.');
        if (!args[1]) return msg.reply('Missing Arguments.');

        let category = args[0].toLowerCase();
        let command = args[1].toLowerCase();

        try {
            delete require.cache[require.resolve(`../${category}/${command}.js`)];
            client.commands.delete(command);

            msg.reply(`${category}/${command} deload Success.`)
        } catch (error) {
            console.error(error);
            const err = `에러가 발생했습니다.
에러의 내용은 다음과 같습니다:
 \`\`\`js
 ${error}\`\`\``;
            msg.react('⚠️')
            msg.reply(err);
        }
    }
}
