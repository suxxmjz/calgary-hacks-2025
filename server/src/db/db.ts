import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

export type DbClient = NodePgDatabase<typeof schema>;

export function createDbClient(dbUrl: string): DbClient {
  const pool = new Pool({
    connectionString: dbUrl,
  });

  return drizzle(pool, {
    schema,
  });
}
