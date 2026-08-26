const mineflayer = require('mineflayer');

function createBot() {
  console.log('Connecting to ujala.aternos.me...');
  const bot = mineflayer.createBot({
    host: 'ujala.aternos.me',
    username: 'KAKAS2771',
    version: false,
    auth: 'offline'
  });
  bot.on('spawn', () => console.log('✅ BOT ONLINE HO GAYA'));
  bot.on('kicked', r => console.log('KICKED:', r));
  bot.on('error', e => console.log('ERROR:', e.message));
  bot.on('end', () => setTimeout(createBot, 5000));
}
createBot();
