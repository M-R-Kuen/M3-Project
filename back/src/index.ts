import server from "../src/server";
import { PORT } from "./config/envs";
import "reflect-metadata";
import { AppDataSource } from "./config/AppdataSource";

AppDataSource.initialize().then((res) => {
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});

/*
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
*/
