(async () => {
    // default imports
    const events = require('events');
    const { exec } = require("child_process");
    const logs = require("discord-logs");
    const Discord = require("discord.js");
    const { MessageEmbed, MessageButton, MessageActionRow, Intents, Permissions, MessageSelectMenu } = require("discord.js");
    const fs = require('fs');
    let process = require('process');
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // block imports
    const os = require("os-utils");
    let URL = require('url');
    const ms = require("ms");
    const https = require("https");
    const { MongoClient } = require('mongodb');

    // define s4d components (pretty sure 90% of these arnt even used/required)
    let s4d = {
        Discord,
        fire: null,
        joiningMember: null,
        reply: null,
        player: null,
        manager: null,
        Inviter: null,
        message: null,
        notifer: null,
        checkMessageExists() {
            if (!s4d.client) throw new Error('You cannot perform message operations without a Discord.js client');
            if (!s4d.client.readyTimestamp) throw new Error('You cannot perform message operations while the bot is not connected to the Discord API');
        }
    };

    // check if d.js is v13
    if (!require('./package.json').dependencies['discord.js'].startsWith("^13.")) {
        let file = JSON.parse(fs.readFileSync('package.json'));
        file.dependencies['discord.js'] = '^13.16.0';
        fs.writeFileSync('package.json', JSON.stringify(file, null, 4));
        exec('npm i');
        throw new Error("Seems you aren't using v13 please re-run or run `npm i discord.js@13.16.0`");
    }

    // check if discord-logs is v2
    if (!require('./package.json').dependencies['discord-logs'].startsWith("^2.")) {
        let file = JSON.parse(fs.readFileSync('package.json'));
        file.dependencies['discord-logs'] = '^2.0.0';
        fs.writeFileSync('package.json', JSON.stringify(file, null, 4));
        exec('npm i');
        throw new Error("discord-logs must be 2.0.0. please re-run or if that fails run `npm i discord-logs@2.0.0` then re-run");
    }

    // create a new discord client
    s4d.client = new s4d.Discord.Client({
        intents: [
            Object.values(s4d.Discord.Intents.FLAGS).reduce((acc, p) => acc | p, 0)
        ],
        partials: [
            "REACTION",
            "CHANNEL"
        ]
    });

    // when the bot is connected say so
    s4d.client.on('ready', () => {
        console.log(s4d.client.user.tag + " is alive!");
    });

    // upon error print "Error!" and the error
    process.on('uncaughtException', function(err) {
        console.log('Error!');
        console.log(err);
    });

    // give the new client to discord-logs
    logs(s4d.client);

    // MongoDB setup
    const uri = 'mongodb+srv://laylahfree3:Tdct8238!@rover.97zqhyl.mongodb.net/?retryWrites=true&w=majority&appName=Rover';
    const client = new MongoClient(uri);
    let db, collection;

    try {
        await client.connect();
        db = client.db('deduction'); // Replace 'Rover' with your database name
        collection = db.collection('deduction'); // Replace 'points' with your collection name
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    }

    // blockly code
    var response, increment, key, images;

    function listsGetRandomItem(list, remove) {
        var x = Math.floor(Math.random() * list.length);
        if (remove) {
            return list.splice(x, 1)[0];
        } else {
            return list[x];
        }
    }

    s4d.client.on('messageCreate', async (s4dmessage) => {
        if (s4dmessage.author.bot) {
            return;
        }
        if (s4dmessage.channel.id == '1150838224873341069') {
            s4d.client.channels.cache.get('1150838224873341069').messages.fetch({ limit: 5 }).then(async (last_messages_in_channel) => {
                for (key = 1; key <= 5; key++) {
                    if (last_messages_in_channel.at(key - 1).embeds[0]) {
                        last_messages_in_channel.at(key - 1).delete();
                    }
                }
            });
            if ((s4dmessage.content || '').startsWith('https://toyhou.se/' || '')) {
                var Verified = new Discord.MessageEmbed();
                Verified.setTitle('Success!');
                Verified.setURL('');
                Verified.setDescription('You have been verified! 恭喜，你已通过验证！');
                Verified.setColor("#3e69ff");

                s4dmessage.react('<a:verified:1150992996800667788>');
                s4dmessage.member.roles.add(s4dmessage.member.guild.roles.cache.find(role => role.id === 'Citizen' || role.name === 'Citizen' || '@' + role.name === 'Citizen'));
                s4dmessage.channel.send({ embeds: [Verified] });
            }
            var Verify = new Discord.MessageEmbed();
            Verify.setTitle('Verify Instructions');
            Verify.setURL('');
            Verify.setDescription('Please enter your toyhou.se profile link in order to be verified and given access to the rest of the server. **This process is automated.** If you don\'t have toyhouse, you can send a different social link. (This will be reviewed manually by a moderator) 请在这里发你的toyhou.se人物简介。验证过程是全自动的，除非你没发toyhou.se。如果没有toyhou.se的话，你可以发送社交简介。（Mod 会审批的）');
            Verify.setColor("#3e69ff");

            s4d.client.channels.cache.get('1150838224873341069').send({ embeds: [Verify] });
        }
    });

    await s4d.client.login(process.env.TOKEN).catch((e) => {
        const tokenInvalid = true;
        const tokenError = e;
        if (e.toString().toLowerCase().includes("token")) {
            throw new Error("An invalid bot token was provided!");
        } else {
            throw new Error("Privileged Gateway Intents are not enabled! Please go to https://discord.com/developers and turn on all of them.");
        }
    });

    s4d.client.on('messageCreate', async (s4dmessage) => {
        if (String(s4dmessage.content).includes('rover')) {
            response = ['Did someone say my name?', '*Sneeze*', 'woof'];
            s4dmessage.channel.send(listsGetRandomItem(response, false));
        }
    });

    s4d.client.on('messageCreate', async (s4dmessage) => {
        if (s4dmessage.author.bot) {
            return;
        }
        if (s4dmessage.channel.id == '1152696923602559016') {
            if ((s4dmessage.content || '').startsWith('r-help' || '')) {
                var w = new Discord.MessageEmbed();
                w.setTitle('Shopkeeper Commands');
                w.setURL('');
                w.setDescription(`**!bal**
 ❖ View your balance

**!bal @[user]**
 ❖ View someone else's balance(remove brackets)

**!with [value]**
 ❖ Withdraw money from your bank(remove brackets)

**!!dep [value]**
 ❖ Deposit money into your bank(remove brackets)

**!lb**
 ❖ See the leaderboard

**!give-money @[user]**
 ❖ Transaction: give money to another user(comes from your own balance)

**/item inventory**
 ❖ View the items in your inventory

**/item-give**
 ❖ Transaction: give an item to another user(comes from your own inventory)

**/item info**
 ❖ You can view more information about a specific item`);
                w.setColor("#3e69ff");

                s4d.client.channels.cache.get('1152696923602559016').send({ embeds: [w] });
            }
        }
    });

    s4d.client.on('messageCreate', async (s4dmessage) => {
        if (s4dmessage.author.bot) {
            return;
        }
        if (s4dmessage.channel.id == '1150544561991590058') {
            var Rules = new Discord.MessageEmbed
            var Rules = new Discord.MessageEmbed();
            Rules.setTitle('Server Rules');
            Rules.setURL('');
            Rules.setColor("#3e69ff");
            Rules.setDescription(`**1. In order to participate in the species, you have to follow the [species rules](https://toyhou.se/~world/157317.unknown-xy/page/101129.species-tos), [Discord T.O.S](https://discord.com/guidelines), [Toyhou.se rules and TOS](https://toyhou.se/~rules) (if you are owning a Tekirai).**
               ❖ Must be 13+
               ❖ Profile pictures and nicknames must be SFW
    
          **2. 18+ content and real-life gore are not permitted within this server.**
               ❖ Messages and conversation topics are included
    
          **3. This is a dual-language species.**
               ❖ English/中文 can both be spoken.
    
          **4. Respect other members and staff.**
               ❖ No toxicity or personal attacks
               ❖ Listen to the staff and do as they instruct
    
          **5. Discriminatory behaviour towards other members is not tolerated.**
               ❖ Derogatory language directed at yourself/others is included
    
          **6. Conversation rules:**
               ❖ Please do not spam
               ❖ Don’t leak personal information
               ❖ Use the correct channel when messaging
               ❖ Do not discuss political topics
    
          **7. Don’t minimod.**
               ❖ It’s okay to remind members of the rules, but do not try to fulfill the role of a moderator.
               ❖ Don’t answer questions in https://discord.com/channels/1150544148181549116/1150554689117618267 because that is the staff’s duty.
    
          **8. Things that need to be spoilered**
               ❖ Flashing image/video
               ❖ Gore
               ❖ Blood if it’s more than 10% of frame
    
          **9. Concerns of rule-breaking**
               ❖ Message a staff member or ping them if there is an issue regarding rule-breaking
    
          **10. Punishment**
               ❖ Staff will deal with rule-breaking accordingly and assign punishments depending on the severity
               ❖ It can be warnings, mute, kicks or blacklist
    
          **11. 点这里看中文版的规则： [未知行星-服务器的规则](https://docs.google.com/document/d/19EZOQZ1_hKcTenXpV4dwZ5iuJx5ZvT2KdkM_SeoqJl8/edit?usp=sharing)**
          `);

            s4d.client.channels.cache.get('1150544561991590058').send({ embeds: [Rules] });
        }
    });

    s4d.client.on('guildMemberAdd', async (param1) => {
        s4d.joiningMember = param1;
        var Welcome = new Discord.MessageEmbed();
        Welcome.setDescription(`${s4d.joiningMember.user} Hello! Welcome to UNKNOWN XY, the world of Tekirai! Read the rules and get verified in https://discord.com/channels/1150544148181549116/1150838224873341069 in order to get access to the rest of the server. We hope you enjoy your stay here！旅行者你好！欢迎来到未知行星！请读一下规则然后去https://discord.com/channels/1150544148181549116/1150838224873341069 进行验证。`);
        Welcome.setColor("#3e69ff");

        s4d.client.channels.cache.get('1150982448939810878').send({ embeds: [Welcome] });
        s4d.joiningMember = null;
    });

    s4d.client.on('messageCreate', async (s4dmessage) => {
        if (s4dmessage.content === '-deduction progress') {
            if (s4dmessage.channel.id === '1152696923602559016') {
                let userId = s4dmessage.author.id;
                let userPoints = await collection.findOne({ _id: userId });
                if (!userPoints) {
                    await collection.insertOne({ _id: userId, points: 0 });
                    userPoints = { points: 0 };
                }
                var progress = new Discord.MessageEmbed();
                progress.setColor('#ffcc66');
                images = [
                    'https://pbs.twimg.com/media/GN98cusXIAA6In3?format=jpg&name=900x900',
                    'https://pbs.twimg.com/media/GMabeZYa0AAFiWv?format=jpg&name=large',
                    'https://pbs.twimg.com/media/GBNlJw7awAARvOd?format=jpg&name=large'
                ];
                progress.setThumbnail(listsGetRandomItem(images, false));
                progress.setTitle('Deduction Progress');
                progress.setURL('');
                progress.setDescription(`${s4dmessage.author}'s Points: ${userPoints.points}`);

                s4dmessage.channel.send({ embeds: [progress] });
            }
        }
    });

    s4d.client.on('messageCreate', async (s4dmessage) => {
        if ((s4dmessage.content || '').startsWith('-pts add') && s4dmessage.mentions.members.first()) {
            increment = parseInt(s4dmessage.content.split(' ')[3]);
            let targetId = s4dmessage.mentions.members.first().id;
            await collection.findOneAndUpdate(
                { _id: targetId },
                { $inc: { points: increment } },
                { upsert: true }
            );
            var Adding_Points = new Discord.MessageEmbed();
            Adding_Points.setColor('#ffcc66');
            Adding_Points.setTitle('Adding Points');
            Adding_Points.setURL('');
            Adding_Points.setDescription(`Added ${increment} points`);

            s4dmessage.channel.send({ embeds: [Adding_Points] });
        }
    });

    return s4d;
})();
