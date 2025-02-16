import { eq } from "drizzle-orm";
import { dbClient } from "../db/db";
import { usersTable } from "../db/schema";
import { User } from "../types";

export async function addUserAccount(
  id: string,
  username: string
): Promise<boolean> {
  try {
    const insert: typeof usersTable.$inferInsert = {
      id,
      username,
    };

    await dbClient.insert(usersTable).values(insert);
    return true;
  } catch (error) {
    console.error(`Error creating user account: ${JSON.stringify(error)}`);
    return false;
  }
}

export async function getUserById(id: string): Promise<User | undefined> {
  try {
    return await dbClient.query.usersTable.findFirst({
      where: eq(usersTable.id, id),
    });
  } catch (error) {
    console.error(
      `Error fetching user from database: ${JSON.stringify(error)}`
    );
    return undefined;
  }
}
