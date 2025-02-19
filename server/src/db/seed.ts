import "dotenv/config";
import { createDbClient } from "./db";
import { usersTable, badgesTable, postsTable, upvotesTable } from "./schema";

const dbClient = createDbClient(process.env.DEV_DATABASE_URL ?? "");

async function seedDatabase() {
  console.log("Seeding database...");

  // Password hashes to "pass"
  await dbClient.insert(usersTable).values([
    {
      name: "Alice",
      email: "alice@mail.com",
      password: "$2b$10$aOs9LvrSspdABIJbhOUjN.b/F1OCUp6GZvFW2cACj89L8esTE6TN2",
    },
    {
      name: "Bob Carter",
      email: "bob@mail.com",
      password: "$2b$10$aOs9LvrSspdABIJbhOUjN.b/F1OCUp6GZvFW2cACj89L8esTE6TN2",
    },
    {
      name: "Jane Smith",
      email: "Jane@mail.com",
      password: "$2b$10$aOs9LvrSspdABIJbhOUjN.b/F1OCUp6GZvFW2cACj89L8esTE6TN2",
    },
  ]);

  await dbClient.insert(badgesTable).values([
    {
      id: 1,
      userId: 1,
      title: "Wildlife Explorer",
      description: "Awarded for spotting 10 different animals",
      imageUrl: "https://picsum.photos/200",
    },
    {
      id: 2,
      userId: 2,
      title: "Wildlife Explorer 2",
      description: "Awarded for spotting 20 different animals",
      imageUrl: "https://picsum.photos/200",
    },
    {
      id: 3,
      userId: 3,
      title: "Nature Protector",
      description: "Awarded for reporting conservation issues",
      imageUrl: "https://picsum.photos/200",
    },
  ]);

  await dbClient.insert(postsTable).values([
    {
      userId: 1,
      animal: "Lion",
      notes: "Saw a lion resting under a tree",
      conservationNotes: "Lions are facing habitat loss.",
      imageUrl: "https://picsum.photos/200",
      latitude: -1.2921,
      longitude: 36.8219,
    },
    {
      userId: 2,
      animal: "Tiger",
      notes: "Look at this!",
      conservationNotes: "Rawr",
      imageUrl: "https://picsum.photos/200",
      latitude: -16.921,
      longitude: 38.89,
    },
    {
      userId: 3,
      animal: "Elephant",
      notes: "A group of elephants was walking",
      conservationNotes: "Poaching is a serious threat to elephants.",
      imageUrl: "https://picsum.photos/200",
      latitude: -1.405,
      longitude: 36.95,
    },
  ]);

  await dbClient.insert(upvotesTable).values([
    { postId: 1, userId: 1 },
    { postId: 2, userId: 2 },
    { postId: 2, userId: 3 },
  ]);

  console.log("Database seeded successfully!");
}

seedDatabase()
  .then(() => console.log("Seeding Finished."))
  .catch((err) => console.error("Error seeding database:", err))
  .finally(() => process.exit());
