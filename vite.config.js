import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'local-api-proxy',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url === '/api/properties') {
            try {
              const resp = await fetch('https://api.eformx.in/?api=proparty/proparty/proparty-list', {
                method: 'POST'
              });
              const data = await resp.text();
              res.setHeader('Content-Type', 'application/json');
              res.end(data);
            } catch (err) {
              res.statusCode = 500;
              res.end(JSON.stringify({ status: false, message: err.message, data: [] }));
            }
            return;
          }
          next();
        });
      }
    }
  ],
  server: {
    port: 3000,
    open: true
  }
});
