import app from "./routes/index.routes";
import "reflect-metadata";
import "./database";
app.listen(3333, () => {
  console.log("Server started!");
});
