(async () => {
  // default imports
  const keep_alive = require('./keep_alive.js')
  const events = require('events');
  const { exec } = require("child_process")
  const logs = require("discord-logs")
  const Discord = require("discord.js")
  const {
    MessageEmbed,
    MessageButton,
    MessageActionRow,
    Intents,
    Permissions,
    MessageSelectMenu
  } = require("discord.js")
  const fs = require('fs');
  let process = require('process');
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // block imports
  const os = require("os-utils");
  let URL = require('url')
  const ms = require("ms")
  let https = require("https")
  const Database = require("easy-json-database")

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
      if (!s4d.client) throw new Error('You cannot perform message operations without a Discord.js client')
      if (!s4d.client.readyTimestamp) throw new Error('You cannot perform message operations while the bot is not connected to the Discord API')
    }
  };

  // check if d.js is v13
  if (!require('./package.json').dependencies['discord.js'].startsWith("^13.")) {
    let file = JSON.parse(fs.readFileSync('package.json'))
    file.dependencies['discord.js'] = '^13.16.0'
    fs.writeFileSync('package.json', JSON.stringify(file, null, 4))
    exec('npm i')
    throw new Error("Seems you arent using v13 please re-run or run `npm i discord.js@13.16.0`");
  }

  // check if discord-logs is v2
  if (!require('./package.json').dependencies['discord-logs'].startsWith("^2.")) {
    let file = JSON.parse(fs.readFileSync('package.json'))
    file.dependencies['discord-logs'] = '^2.0.0'
    fs.writeFileSync('package.json', JSON.stringify(file, null, 4))
    exec('npm i')
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
    console.log(s4d.client.user.tag + " is alive!")
  })

  // upon error print "Error!" and the error
  process.on('uncaughtException', function(err) {
    console.log('Error!');
    console.log(err);
  });

  // give the new client to discord-logs
  logs(s4d.client);

  // pre blockly code


  // blockly code
  var response, i;

  function listsGetRandomItem(list, remove) {
    var x = Math.floor(Math.random() * list.length);
    if (remove) {
      return list.splice(x, 1)[0];
    } else {
      return list[x];
    }
  }


  await s4d.client.login(process.env.TOKEN).catch((e) => {
    const tokenInvalid = true;
    const tokenError = e;
    if (e.toString().toLowerCase().includes("token")) {
      throw new Error("An invalid bot token was provided!")
    } else {
      throw new Error("Privileged Gateway Intents are not enabled! Please go to https://discord.com/developers and turn on all of them.")
    }
  });

  s4d.client.on('messageCreate', async (s4dmessage) => {
    if (String((s4dmessage.content)).includes(String('rover'))) {
      response = ['Did someone call for me?', '*Sneeze*', 'woof', '*jumps*'];
      s4dmessage.channel.send((listsGetRandomItem(response, false)));
    }

  });

  s4d.client.on('messageCreate', async (s4dmessage) => {
    if (s4dmessage.author.bot) {
      return;
    }
    if (((s4dmessage.channel).id) == '1152696923602559016') {
      if (((s4dmessage.content) || '').startsWith('r-help' || '')) {
        var w = new Discord.MessageEmbed();
        w.setTitle(String('Shopkeeper Commands'))
        w.setURL(String());
        w.setDescription(String(`**!bal**
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

            **/item use [optional quantity]**
               ❖ Use an item in your inventory!
    
            **/item inventory**
                 ❖ View the items in your inventory
    
            **/item-sell**
                 ❖ Transaction: sell an item to another user(comes from your own inventory)
    
            **/item info**
                 ❖ You can view more information about a specific item`));
        w.setColor("#3e69ff");

        s4d.client.channels.cache.get('1152696923602559016').send({ embeds: [w] });
      }
    }

  });

  s4d.client.on('messageCreate', async (s4dmessage) => {
    if (s4dmessage.author.bot) {
      return;
    }
    if (((s4dmessage.channel).id) == '1150838224873341069') {
      s4d.client.channels.cache.get('1150838224873341069').messages.fetch({ limit: 5 }).then(async (last_messages_in_channel) => {
        for (i = 1; i <= 5; i++) {
          if (((last_messages_in_channel.at(i - 1)).embeds[0])) {
            (last_messages_in_channel.at(i - 1)).delete()
          }
        }

      });
      if (((s4dmessage.content) || '').startsWith('https://toyhou.se/' || '')) {
        // make sure to change the color of the embed to correct hex code
        //
        //
        //
        //
        //
        //
        //
        //
        //
        var Verified = new Discord.MessageEmbed();
        Verified.setTitle(String('Success!'))
        Verified.setURL(String());
        Verified.setDescription(String('You have been verified! 恭喜，你已通过验证！'));
        Verified.setColor("#3e69ff");

        s4dmessage.react('<a:verified:1150992996800667788>'); (s4dmessage.member).roles.add((s4dmessage.member).guild.roles.cache.find((role) => role.id === 'Citizen' || role.name === 'Citizen' || '@' + role.name === 'Citizen'));
        s4dmessage.channel.send({ embeds: [Verified] });
      }
      var Verify = new Discord.MessageEmbed();
      Verify.setTitle(String('Verify Instructions'))
      Verify.setURL(String());
      Verify.setDescription(String('Please enter your toyhou.se profile link in order to be verified and given access to the rest of the server. **This process is automated.** If you don\'t have toyhouse, you can send a different social link. (This will be reviewed manually by a moderator) 请在这里发你的toyhou.se人物简介。验证过程是全自动的，除非你没发toyhou.se。如果没有toyhou.se的话，你可以发送社交简介。（Mod 会审批的）'));
      Verify.setColor("#3e69ff");

      s4d.client.channels.cache.get('1150838224873341069').send({ embeds: [Verify] });
    }

  });

  s4d.client.on('messageCreate', async (s4dmessage) => {
    if (s4dmessage.author.bot) {
      return;
    }
    if (((s4dmessage.channel).id) == '1150544561991590058') {
      var Rules = new Discord.MessageEmbed();
      Rules.setTitle(String('Server Rules'))
      Rules.setURL(String());
      Rules.setColor("#3e69ff");
      Rules.setDescription(String(`**1. In order to participate in the species, you have to follow the [species rules](https://toyhou.se/~world/157317.unknown-xy/page/101129.species-tos), [Discord T.O.S](https://discord.com/guidelines), [Toyhou.se rules and TOS](https://toyhou.se/~rules) (if you are owning a Tekirai).**
               ❖ Must be 13+
               ❖ Profile pictures and nicknames must be SFW
    
          **2. 18+ content and real-life gore are not permitted within this server.**
               ❖ Messages and conversation topics are included
    
          **3. Please keep most conversations in English.**
               ❖ If you want to speak Chinese go to the Chinese channels
    
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
          `));

      s4d.client.channels.cache.get('1150544561991590058').send({ embeds: [Rules] });
    }

  });

  s4d.client.on('guildMemberAdd', async (param1) => {
    s4d.joiningMember = param1;
    var Welcome = new Discord.MessageEmbed();
    Welcome.setDescription(String((String(s4d.joiningMember.user) + String(` Hello! Welcome to UNKNOWN XY, the world of Tekirai! Read the rules and get verified in https://discord.com/channels/1150544148181549116/1150838224873341069 in order to get access to the rest of the server. We hope you enjoy your stay here！
        旅行者你好！欢迎来到未知行星！请读一下规则然后去https://discord.com/channels/1150544148181549116/1150838224873341069 进行验证。`))));
    Welcome.setColor("#3e69ff");

    s4d.client.channels.cache.get('1150982448939810878').send({ embeds: [Welcome] });
    s4d.joiningMember = null
  });

    const deduction = new Database('./database.json')
    s4d.client.on('messageCreate', async (s4dmessage) => {
        if ((s4dmessage.content) == '-deduction progess') {
            if ((s4dmessage.channel) == s4d.client.channels.cache.get('1152696923602559016')) {
                console.log((String(s4dmessage.author)));
                if (!deduction.has(String((String(s4dmessage.author))))) {
                    deduction.set(String((String(s4dmessage.author))), 0);
                }
                s4dmessage.channel.send({
                    content: String((String(`Deduction Progress:
          `) + String(deduction.get(String((String(s4dmessage.author)))))))
                });
            }
        }

    });

    s4d.client.on('messageCreate', async (s4dmessage) => {
        if (((s4dmessage.content) || '').startsWith('-pts add' || '')) {
            console.log((String(s4dmessage.mentions.members.first())));
            if (deduction.has(String((String(s4dmessage.mentions.members.first()))))) {
                deduction.add(String((String(s4dmessage.mentions.members.first()))), parseInt(1));
            } else {
                deduction.set(String((String(s4dmessage.mentions.members.first()))), 1);
            }
            s4dmessage.channel.send({
                content: String('Added')
            });
        }

    });

    return s4d
})();
