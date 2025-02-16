import { relations } from "drizzle-orm";
import {
  doublePrecision,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: varchar().primaryKey().notNull().unique(),
  username: varchar().notNull(),
});

export const userRelations = relations(usersTable, ({ many }) => ({
  badges: many(badgesTable), // A user can have many badges
  posts: many(postsTable),
}));

export const postsTable = pgTable("posts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar("user_id")
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "cascade",
      onUpdate: "no action",
    }),
  animal: varchar({ length: 255 }).notNull(),
  notes: varchar(),
  conservationNotes: text("conservation_notes").notNull(),
  imageUrl: varchar("image_url").notNull(),
  latitude: doublePrecision().notNull(),
  longitude: doublePrecision().notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  })
    .defaultNow()
    .notNull(),
});

export const badgesTable = pgTable("badges", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar("user_id")
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "cascade",
      onUpdate: "no action",
    }),
  title: varchar({ length: 255 }).notNull(),
  description: varchar().notNull(),
  imageUrl: varchar("image_url").notNull(),
  dateEarned: timestamp("date_earned", {
    withTimezone: true,
    mode: "date",
  })
    .defaultNow()
    .notNull(),
});

export const upvotesTable = pgTable("upvotes", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  postId: integer("post_id")
    .notNull()
    .references(() => postsTable.id, {
      onDelete: "cascade",
      onUpdate: "no action",
    }),
  userId: varchar("user_id")
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "cascade",
      onUpdate: "no action",
    }),
});
