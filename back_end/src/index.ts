import express, { Express } from "express";
import { HealthCheckController } from "./controllers/healthCheck";
import cors from "cors";
import dotenv from "dotenv";
import { postgresDB } from "./repository/postgresDB";
import { UserController } from "./controllers/user";
dotenv.config();

class App {
  private app: Express;
  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
  }

  public init = async (): Promise<void> => {
    try {
      postgresDB.init();
      process.on("exit", () => {
        postgresDB.close();
      });
      this.app.use("/health-check", new HealthCheckController().getRouter());
      this.app.use("/users", new UserController().getRouter());
      this.app.listen(process.env.APP_PORT, () => {
        console.log(`Server is running on port ${process.env.APP_PORT}`);
      });
    } catch (err) {
      console.log(err);
    }
  };
}

const app = new App();
app.init();
