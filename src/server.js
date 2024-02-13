const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const envVariable = require("./config/index");
const mongoConnect = require("./utils/dbConfig");

const { PORT } = envVariable || 3001;

const startServer = async () => {
  await mongoConnect();
  server.listen(PORT, () => {
    console.log(`server is live on port: ${PORT}`);
  });
};

startServer();
