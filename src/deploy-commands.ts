import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { SlashCommandBuilder } from "@discordjs/builders";
import dotenv from "dotenv";
import {QRCode} from "./constants";

dotenv.config();

const qrcodeCommand = new SlashCommandBuilder()
        .setName(QRCode)
        .setDescription('Generate a qr code from text input!')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('Enter the input to encode and send back as qr code')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('color')
                .setDescription('Enter a hex code for color default 000000'))
        .addNumberOption(option =>
            option.setName('height')
                .setDescription('Enter height of qr code default 250'))
        .addNumberOption(option =>
            option.setName('width')
                .setDescription('Enter width of qr code default 250'));

const commands = [qrcodeCommand.toJSON()]

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);