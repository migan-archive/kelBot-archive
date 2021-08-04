require('dotenv').config();
const { Client, Collection } = require('discord.js');
const client = new Client();
const { prefix } = require('../config');
const { readdirSync } = require('fs');
const noPerm = require('./utils/noPerm');
const Dokdo = require('dokdo');
const DokdoHandler = new Dokdo(client, {
    prefix: prefix,
    aliases: ['dokdo', 'dok'],
    noPerm: noPerm
});
const { AdminSend } = require('./utils/AdminSend');
const package = require('../package.json');

client.commands = new Collection();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(`${prefix}help | version: ${package.version}`);
});

const commandFolders = readdirSync(__dirname + '/commands');

for (const folder of commandFolders) {
    const commandFiles = readdirSync(__dirname + `/commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(__dirname + `/commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

client.on('message', msg => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;
    if (msg.channel.type == 'dm') return;
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
${error}\`\`\`
사용한 커맨드: ${msg.content}`;
        msg.reply(err);
        AdminSend(err);
    }
    if (!client.commands.has(commandName)) return;
});

client.login(process.env.token);