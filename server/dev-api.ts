/**
 * Dev-only API server (Vite proxies /api here on port 3001)
 */
import { createApp } from "./createApp.js";

const port = Number(process.env.API_PORT) || 3001;
const app = createApp({ serveStatic: false });

const server = app.listen(port, () => {
  console.log(`[api] Dev API on http://localhost:${port}/`);
});

server.on("error", (err: NodeJS.ErrnoException) => {
  if (err.code === "EADDRINUSE") {
    console.error(`[api] Port ${port} is already in use. Stop the other process or set API_PORT in .env`);
    process.exit(1);
  }
  throw err;
});
