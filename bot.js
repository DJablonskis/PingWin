
const { mapLinks } = require('./commands/mapLinks');

require('dotenv').config();
const { Client, MessageEmbed } = require('discord.js');
const client = new Client();

const worldSettings = {
    server: "https://finals.travian.com/",
    mapSize: 400
}

const prefix = "!PW";

//Commands constants
const c = {
    C_LINKS: 'lnk',
}

client.login(process.env.BOT_TOKEN);

client.on('ready', () => {
    client.user.setPresence({
        activity: {
            name: "with Makelis",
            type: 1
        }
    })
});

client.on('message', function (message) {
    if (message.author.bot || message.guild === null || !message.content.startsWith(prefix))
        return;
    var args = message.content.slice(prefix.length).trim().split(/ +/g);
    var command = args.shift().toLowerCase();
    switch (command) {
        case c.C_LINKS:
            mapLinks(message, args, worldSettings)
    }
});




