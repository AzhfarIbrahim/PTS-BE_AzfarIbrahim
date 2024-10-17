import express from "express";
import "dotenv/config";
import cors from "cors";
const app = express();
import "./models/index.js";
import router from "./Routes/router.js"
const PORT = process.env.PORT;
import bodyParser from "body-parser";

app.use(
  cors()
);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use(bodyParser.json());
  
app.use("/", router);
app.listen(PORT, () => {
  console.log("server running at http://localhost:" + PORT);
});
