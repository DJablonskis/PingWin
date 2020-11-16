
// !PW lnk (optional option: i - info, c - center, t - troops, r - resources) xx yy
const { MessageEmbed } = require('discord.js');

function commandLinks(message, args, worldSettings) {
    const coords = getCoords(args, worldSettings.mapSize);

    if (args.length > 1 || !coords.valid)
        return helpMessage(message)

    if (args.length === 0)
        getLinks("ictr", coords, worldSettings, message);
    else
        getLinks(args[0], coords, worldSettings, message)
}

function getCoords(args, mapSize) {
    let x = y = -1000;
    let valid = false;
    if (args.length === 2 || args.length === 3) {
        y = Number(args.pop());
        x = Number(args.pop());
    }
    valid = ((x <= mapSize) && (x >= -mapSize) && (y <= mapSize) && (y >= -mapSize))
    return { x, y, valid }
}

function getLinks(flags, c, ws, message) {
    const position = (ws.mapSize + 1 - c.y) * (ws.mapSize * 2 + 1) - ws.mapSize + 2 + c.x;

    embed = new MessageEmbed()
        // Set the title of the field
        .setDescription(message.content)
        // Set the color of the embed
        .setColor('#cf36ff');

    if (flags.includes("i")) {
        embed.addField(":book: Info:", `[Information about (${c.x}|${c.y})](${ws.server}position_details.php?x=${c.x}&y=${c.y})`);
    }
    if (flags.includes("c")) {
        embed.addField(":map: Center Map:", `[Center (${c.x}|${c.y}) on map](${ws.server}karte.php?x=${c.x}&y=${c.y})`);
    }
    if (flags.includes("t")) {
        embed.addField(":crossed_swords: Send troops:", `[Send troops to (${c.x}|${c.y})](${ws.server}build.php?id=39&tt=2&z=${position})`);
    }
    if (flags.includes("r")) {
        embed.addField(":shopping_cart: Send resources:", `[Send merchants to (${c.x}|${c.y})]( ${ws.server}build.php?gid=17&t=5&z=${position})`);
    }

    message.channel.send(embed);
    message.delete({ timeout: 800 });

}
exports.mapLinks = commandLinks;

function helpMessage(message) {
    message.author.send('**Incorrect call to `lnk` command!**\n' +
        ' It should be `!PW lnk xx yy` for all links, or `!PW lnk i/c/t/r xx yy` for individual link.\n' +
        '> `i` - link to ***information*** about coordinates\n > `c` - link to ***center*** coordinates in map\n > `t` - link to send ***troops*** to coordinates\n > `r` - link to send ***resources*** to the coordinates');
    message.channel.send('Incorrect `lnk` call. Check PM for help.');
}