require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = 'kel!';
const fs = require('fs');
const Dokdo = require('dokdo');
const DokdoHandler = new Dokdo(client, {
    prefix: prefix,
    aliases: ['dokdo', 'dok']
});
const { ErrorSend } = require('./utils/ErrorSend');


client.commands = new Discord.Collection();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


const commandFolders = fs.readdirSync(__dirname + '/commands');

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(__dirname + `/commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(__dirname + `/commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

client.on('message', msg => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;
    DokdoHandler.run(msg);
    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    try {
        command.execute({ client, msg, args });
    } catch (error) {
        console.error(error);
        const err = `에러가 발생하여 개발자에게 자동 전송되었습니다.
에러의 내용은 다음과 같습니다:
\`\`\`js
${error}\`\`\``;
        msg.reply(err);
        ErrorSend(err);
    }
    if (!client.commands.has(commandName)) return;

});

client.login(process.env.token);