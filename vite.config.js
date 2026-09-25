import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  base: './',
  plugins: [
    react(),
    {
      name: 'generate-dist-index-php',
      closeBundle() {
        const distHtmlPath = path.resolve(__dirname, 'dist/index.html');
        const distPhpPath = path.resolve(__dirname, 'dist/index.php');
        if (fs.existsSync(distHtmlPath)) {
          let html = fs.readFileSync(distHtmlPath, 'utf8');

          const phpHeader = `<?php
/**
 * Shubharambh Reality - Production Server Entry Point (dist/index.php)
 * Direct server-side API call for properties data.
 */

$properties_list = [];
$api_url = "https://api.eformx.in/?api=proparty/proparty/proparty-list";

$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL => $api_url,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => http_build_query([]),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 10,
    CURLOPT_CONNECTTIMEOUT => 4,
    CURLOPT_SSL_VERIFYPEER => true,
    CURLOPT_SSL_VERIFYHOST => 2,
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/x-www-form-urlencoded',
        'Accept: application/json',
        'User-Agent: ShubharambhReality-Production/1.0'
    ]
]);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($response && $http_code === 200) {
    $json = json_decode($response, true);
    if (!empty($json['data']) && is_array($json['data'])) {
        $properties_list = $json['data'];
    }
}
?>
`;

          const phpScriptInjection = `
    <!-- Server-Side Injected Live Properties Data -->
    <script>
      window.__PROPERTIES_DATA__ = <?php echo json_encode($properties_list); ?>;
    </script>
  </head>`;

          html = html.replace('</head>', phpScriptInjection);
          fs.writeFileSync(distPhpPath, phpHeader + html, 'utf8');
          console.log('✓ Successfully generated dist/index.php');
        }
      }
    },
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
    open: true,
    watch: {
      ignored: ['**/*.zip', '**/dist/**', '**/node_modules/**']
    }
  }
});
