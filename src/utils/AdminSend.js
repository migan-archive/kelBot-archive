const { Client } = require('discord.js');
const client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES'] });
const config = require('../../config');

// client.owners = '415135882006495242';

client.login(process.env.token);
async function AdminSend(content) {
    const admin = await client.users.fetch(config.admin);
    admin.send(content);
}


module.exports = { AdminSend };