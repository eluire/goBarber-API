import "reflect-metadata";
import "dotenv/config";
import app from "./routes/index.routes";
import "@shared/infra/typeorm/index";
import "@shared/container/index";
app.listen(3333, () => {
  console.log("Server started!");
});
