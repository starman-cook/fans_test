import dotenv from "dotenv";
import { Sequelize } from "sequelize-typescript";
dotenv.config();
import path from "path";

export class PostgresDB {
  private sequelize: Sequelize;
  constructor() {
    this.sequelize = new Sequelize({
      database: process.env.PG_DB,
      dialect: "postgres",
      host: process.env.PG_HOST,
      username: process.env.PG_USER,
      password: process.env.PG_PASS,
      storage: ":memory",
      models: [path.join(__dirname, "../models")],
    });
  }

  public close = async (): Promise<void> => {
    await this.sequelize.close();
  };

  public init = async (): Promise<void> => {
    try {
      await this.sequelize.authenticate();
      await this.sequelize.sync({
        alter: true,
      });
      console.log("DB postgres is connected");
    } catch (err) {
      console.log(err);
    }
  };
}

export const postgresDB = new PostgresDB();
