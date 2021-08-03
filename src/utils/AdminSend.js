const { Client } = require('discord.js');
const client = new Client();

client.owners = '415135882006495242';

async function AdminSend(content) {
    const admin = await client.users.fetch('415135882006495242');
    admin.send(content);
}

client.login(process.env.token);

module.exports = { AdminSend };