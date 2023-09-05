import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoute from "./routes/client.js";
import generalRoute from "./routes/general.js";
import managementRoute from "./routes/management.js";
import salesRoute from "./routes/sales.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 5000;
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("common"));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//routes
app.use("/client", clientRoute);
app.use("/general", generalRoute);
app.use("/management", managementRoute);
app.use("/sales", salesRoute);

app.get("/", (req, res) => res.send("<h1> Server is UP </h1>"));

app.listen(PORT, console.log("Server run on port " + PORT));
