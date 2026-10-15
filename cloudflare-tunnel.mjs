import { startTunnel } from 'untun';

console.log('Starting Cloudflare Quick Tunnel for http://localhost:5173 ...');

async function run() {
  try {
    const tunnel = await startTunnel({
      url: 'http://localhost:5173',
      acceptCloudflareNotice: true,
    });

    if (tunnel) {
      const url = await tunnel.getURL();
      console.log(`Cloudflare Tunnel URL: ${url}`);

      // Keep process alive
      process.on('SIGINT', async () => {
        await tunnel.close();
        process.exit(0);
      });
      process.on('SIGTERM', async () => {
        await tunnel.close();
        process.exit(0);
      });
    } else {
      console.error('Tunnel returned undefined');
    }
  } catch (err) {
    console.error('Error starting Cloudflare tunnel:', err);
  }
}

run();
