import http from "http";
import app from "./app";
import { initSocket } from "./lib/socket"; // ou core/socket, dependendo da sua estrutura

const server = http.createServer(app); // cria o servidor HTTP manual
initSocket(server); // inicializa o socket.io com esse servidor

const PORT = process.env.PORT || 3333;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});