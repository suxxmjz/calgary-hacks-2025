import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

export const dbClient = drizzle(process.env.DATABASE_URL ?? "", {
  schema,
});
