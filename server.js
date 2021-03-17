const { Client, MessageEmbed } = require('discord.js');
const client = new Client();
const fetch = require('node-fetch');
require('dotenv').config()
const prefix = 'xd';
let token = process.env.TOKEN;

client.once('ready', () => {
  console.log('I am ready!');
});



client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'setup') {
        message.channel.send("I will send you notifications when new games are cracked!");
        var {title, image, protections, releaseDate, crackDate, url} = await fetch('https://api.crackwatch.com/api/games?page=0&sort_by=crack_date&is_cracked=true&is_aaa=true')
        .then(res => res.json())
        .then(msg => msg[0]);
        var rd = new Date(releaseDate).toString().split('GMT')[0];
        var cd = new Date(crackDate).toString().split('GMT')[0];

        setInterval(async function(){
            var obj;
            await fetch('https://api.crackwatch.com/api/games?page=0&sort_by=crack_date&is_cracked=true&is_aaa=true')
            .then(res => res.json())
            .then(msg => msg[0])
            .then(msg => obj = msg);
            var rdobj = new Date(obj.releaseDate).toString().split('GMT')[0];
            var cdobj = new Date(obj.crackDate).toString().split('GMT')[0];
    
            if(title != obj.title){
                title = obj.title;
                image = obj.image;
                protections = obj.protections;
                releaseDate = obj.releaseDate;
                crackDate = obj.crackDate;
                url = obj.url;
                
                const embed = new MessageEmbed()
                .setColor('#32a89e')
                .setTitle(obj.title)
                .setURL(obj.url)
                .setImage(obj.image)
                .addFields(
                    { name: 'Protections', value: obj.protections[0] },
                    { name: 'Release Date', value: rdobj, inline: true },
                    { name: 'Cracked Date', value: cdobj, inline: true },
                )
                .setTimestamp()
                .setFooter('onCrack with Weed');

                message.channel.send(embed);
            }
        }, 1800000);
        
       
    }
    if(command === 'one'){
        const {title, image, protections, releaseDate, crackDate, url} = await fetch('https://api.crackwatch.com/api/games?page=0&sort_by=crack_date&is_cracked=true&is_aaa=true')
        .then(res => res.json())
        .then(msg => msg[0]);
        var rd = new Date(releaseDate).toString().split('GMT')[0];
        var cd = new Date(crackDate).toString().split('GMT')[0];

        const embed = new MessageEmbed()
        .setColor('#32a89e')
        .setTitle(title)
        .setURL(url)
        .setImage(image)
        .addFields(
            { name: 'Protections', value: protections[0] },
            { name: 'Release Date', value: rd, inline: true },
            { name: 'Cracked Date', value: cd, inline: true },
        )
        .setTimestamp()
        .setFooter('onCrack with Weed');

        message.channel.send(embed);

    }
});



// Log our bot in using the token from https://discord.com/developers/applications
client.login(token);