const localtunnel = require('localtunnel');

async function startTunnel() {
  try {
    const tunnel = await localtunnel({
      port: 5173,
      subdomain: 'auto-explorer-' + Math.floor(1000 + Math.random() * 9000),
    });

    console.log(`Tunnel URL: ${tunnel.url}`);

    tunnel.on('close', () => {
      console.log('Tunnel closed. Reconnecting in 2 seconds...');
      setTimeout(startTunnel, 2000);
    });

    tunnel.on('error', (err) => {
      console.error('Tunnel error:', err ? err.message : err);
      try {
        tunnel.close();
      } catch (e) {}
    });
  } catch (err) {
    console.error('Connection error:', err ? err.message : err);
    setTimeout(startTunnel, 3000);
  }
}

startTunnel();
