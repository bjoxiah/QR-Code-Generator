// Require the necessary discord.js classes
import {Client, Intents, MessageEmbed} from "discord.js";
import dotenv from "dotenv";
import {GoogleQRCodeURLRoot, QRCode} from "./constants";

dotenv.config();

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready',() => {});

client.on('interactionCreate',
    async interaction => {
        if (!interaction.isCommand()) return;

        const {commandName} = interaction;

        if (commandName === QRCode) {
            const width = interaction.options.getNumber('width') || 250;
            const height = interaction.options.getNumber('height') || 250;
            const data = interaction.options.getString('input');
            const color = interaction.options.getString('color') || '000000';

            const url = encodeURI(`${GoogleQRCodeURLRoot}&chco=${color}&chs=${width}x${height}&chl=${JSON.stringify(data)}`);
            const response = new MessageEmbed()
                .setTitle("QR Code Response")
                .setColor(`#${color}`)
                .setImage(url)
                .setTimestamp();

            await interaction.channel.send({ embeds: [response]});
        }
    });

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN).catch(err => {
    console.log(err);
});
