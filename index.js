const mineflayer = require('mineflayer');
const settings = require('./settings.json');

let bot;

function createBot() {
  console.log(`Connecting to ${settings.server.ip}:${settings.server.port}...`);
  
  bot = mineflayer.createBot({
    host: settings.server.ip,
    port: settings.server.port,
    username: settings["bot-account"].username,
    version: settings.server.version,
    auth: settings["bot-account"].type
  });

  bot.on('login', () => console.log(`Logged in as ${bot.username}`));

  bot.on('spawn', () => {
    console.log(`✅ Joined ${settings.server.ip}`);
    
    if (settings["auto-auth"]?.enabled) {
      setTimeout(() => {
        bot.chat(`/login ${settings["auto-auth"].password}`);
        bot.chat(`/register ${settings["auto-auth"].password} ${settings["auto-auth"].password}`);
      }, 2000);
    }

    // Anti-AFK
    if (settings.movement?.["circle-walk"]) {
      let angle = 0;
      setInterval(() => {
        if(!bot.entity) return;
        angle += 0.3;
        bot.setControlState('forward', true);
        bot.look(angle, 0);
        setTimeout(() => bot.setControlState('forward', false), 500);
      }, 3000);
    }
    if (settings.movement?.jump) {
      setInterval(() => {
        if(!bot.entity) return;
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 300);
      }, 10000);
    }
  });

  bot.on('end', () => {
    console.log('Disconnected, reconnecting in 5s...');
    setTimeout(createBot, 5000);
  });

  bot.on('error', (e) => console.log('Error:', e.message));
  bot.on('message', (m) => { if(settings.utils?.["chat-log"]) console.log(m.toString()) });
}

createBot();
