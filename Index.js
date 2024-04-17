const keep_alive = require('./keep_alive.js')
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const token = 'MTE4NTQwODI3MzU3NTMxNzUxNA.GlereB.9qyzpkOipk8wNXbeUVXuUH9DDaIHNeoB1465lg'; // Replace with your actual bot token
const ticketPrefix = 'ticket-';
const waitTime = 600000; // 10 minutes in milliseconds
const halfTime = waitTime / 2; // Half of the waitTime, which is 5 minutes

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('channelCreate', async (channel) => {
    if (channel.name.startsWith(ticketPrefix)) {
        console.log(`Detected new ticket channel: ${channel.name}`);

        // Extract the username from the channel name
        const username = channel.name.substring(ticketPrefix.length);

        // Wait for half of the specified wait time (5 minutes)
        await new Promise(resolve => setTimeout(resolve, halfTime));

        // Send a warning message
        channel.send("🚨EMERGENCIA: Por favor ahora escriba lo que se le pide, de lo contrario este ticket será cerrado en menos de 5 minutos!! 🥰 (escribe ya)⬇️").catch(console.error);

        // Wait for the second half of the wait time (another 5 minutes)
        await new Promise(resolve => setTimeout(resolve, halfTime));

        // Fetch some messages to check if the user has spoken
        const messages = await channel.messages.fetch({ limit: 10 });
        const userHasSpoken = messages.some(message => message.author.username === username);

        if (!userHasSpoken) {
            console.log(`Closing ticket channel ${channel.name} as the user has not spoken.`);
            // Close the ticket channel
            channel.delete().catch(console.error);
        } else {
            console.log(`User ${username} has spoken in ${channel.name}. The ticket will remain open.`);
        }
    }
});

client.login(token);
