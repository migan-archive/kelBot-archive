const { AdminSend } = require('../../utils/AdminSend');

module.exports = {
    name: 'ban',
    aliases: ['밴'],
    description: 'user ban',
    execute: async ({ msg, args }) => {
        if (!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.send(`Your this Command cannot Use.`);
        const mentionMember = msg.mentions.members.first();
        let reason = args.slice(1).join(" ");
        if (!reason) reason = " None";

        if (!args[0]) return msg.reply("You must specify a user to ban.");
        if (!mentionMember) return msg.channel.send("This user is invalid or no longer on the guild.");
        if (!mentionMember.bannable) return msg.channel.send("This user cannot ban.");

        await mentionMember.ban({
            reason: reason
        })
            .then(() => msg.channel.send(`Successfully blocked! Blocked by: ${mentionMember.user.tag}`))
            .catch(error => {
                const err = `에러가 발생하여 개발자에게 자동 전송되었습니다.
에러의 내용은 다음과 같습니다:
\`\`\`js
${error}\`\`\``;
                msg.channel.send(err);
                AdminSend(err);
            });
    }
}