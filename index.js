const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');

// 1. Create a tiny web server so Render stays awake
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bot is active and running perfectly!');
});

app.listen(PORT, () => {
  console.log(`Web server is listening on port ${PORT}`);
});

// 2. Your actual Discord Bot configuration
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once('ready', () => {
  console.log(`Bot is online as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  try {
    await message.react('💗');
  } catch (err) {
    console.error('Failed to react:', err);
  }
});

client.login(process.env.DISCORD_TOKEN);
