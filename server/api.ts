import { createServer } from "http";
import { createApp } from "./createApp.js";

const port = Number(process.env.PORT) || 3001;
const app = createApp({ serveStatic: false });
const server = createServer(app);

server.listen(port, () => {
  console.log(`Gwecely API listening on port ${port}`);
});
