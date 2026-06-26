import { createServer } from "http";
import { createApp } from "./createApp.js";

const port = Number(process.env.PORT) || 3000;
const app = createApp({ serveStatic: true });
const server = createServer(app);

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
