import { eq } from "drizzle-orm";
import { dbClient } from "../db/db";
import { AssignBadgeInsert, Badge } from "../types";
import { badgesTable } from "../db/schema";

export async function getBadgesByUserId(
  userId: string
): Promise<readonly Badge[] | undefined> {
  try {
    return await dbClient.query.badgesTable.findMany({
      where: eq(badgesTable.userId, userId),
    });
  } catch (error) {
    console.error(
      `Error fetching badges from database: ${JSON.stringify(error)}`
    );
    return undefined;
  }
}

export async function assignBadgeToUser(
  insert: AssignBadgeInsert
): Promise<boolean> {
  try {
    await dbClient.insert(badgesTable).values(insert);
    return true;
  } catch (error) {
    console.error(`Error assigning badge to user: ${JSON.stringify(error)}`);
    return false;
  }
}
