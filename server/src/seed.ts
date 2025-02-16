import { dbClient } from "./db/db";
import { usersTable, badgesTable, postsTable, upvotesTable } from "./db/schema";

async function seedDatabase() {
  console.log("Seeding database...");

  await dbClient.insert(usersTable).values([
    { id: "user_2t6nj9QU49a7YnOD41UAUbiXYRo", username: "Alice" },
    { id: "user_2", username: "Bob" },
    { id: "user_3", username: "Charlie" },
  ]);

  await dbClient.insert(badgesTable).values([
    { userId: "user_2t6nj9QU49a7YnOD41UAUbiXYRo", title: "Wildlife Explorer", description: "Awarded for spotting 10 different animals", imageUrl: "https://picsum.photos/200" },
    { userId: "user_2t6nj9QU49a7YnOD41UAUbiXYRo", title: "Wildlife Explorer 2", description: "Awarded for spotting 20 different animals", imageUrl: "https://picsum.photos/200" },
    { userId: "user_2", title: "Nature Protector", description: "Awarded for reporting conservation issues", imageUrl: "https://picsum.photos/200" },
  ]);

  await dbClient.insert(postsTable).values([
    { userId: "user_2t6nj9QU49a7YnOD41UAUbiXYRo", animal: "Lion", notes: "Saw a lion resting under a tree", conservationNotes: "Lions are facing habitat loss.", imageUrl: "https://picsum.photos/200", latitude: -1.2921, longitude: 36.8219 },
    { userId: "user_2t6nj9QU49a7YnOD41UAUbiXYRo", animal: "Tiger", notes: "Look at this!", conservationNotes: "Rawr", imageUrl: "https://picsum.photos/200", latitude: -16.921, longitude: 38.89 },
    { userId: "user_2", animal: "Elephant", notes: "A group of elephants was walking", conservationNotes: "Poaching is a serious threat to elephants.", imageUrl: "https://picsum.photos/200", latitude: -1.4050, longitude: 36.9500 },
  ]);

  await dbClient.insert(upvotesTable).values([
    { postId: 1, userId: "user_2" },
    { postId: 2, userId: "user_2t6nj9QU49a7YnOD41UAUbiXYRo" },
    { postId: 2, userId: "user_3" },
  ]);

  console.log("Database seeded successfully!");
}

seedDatabase()
  .catch((err) => console.error("Error seeding database:", err))
  .finally(() => process.exit());
