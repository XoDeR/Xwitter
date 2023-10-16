import { text, timestamp, uuid, pgTable } from "drizzle-orm/pg-core";

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
  username: text("username"),
  full_name: text("full_name"),
});

export const tweets = pgTable("tweets", {
  id: uuid("id").primaryKey().defaultRandom(),
  text: text("text"),
  user_id: uuid("user_id"),
  created_at: timestamp("created_at"),
  updated_at: timestamp("updated_at"),
});

export const hashtags = pgTable("hashtags", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"),
});

export const tweet_hashtag = pgTable("tweet_hashtag", {
  tweet_id: uuid("tweet_id").primaryKey().defaultRandom(),
  hashtag_id: uuid("hashtag_id").primaryKey(),
});

export const replies = pgTable("replies", {
  id: uuid("id").primaryKey().defaultRandom(),
  text: text("text"),
  user_id: uuid("user_id"),
  tweet_id: uuid("tweet_id"),
  reply_id: uuid("reply_id"),
});

export const likes = pgTable("likes", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id"),
  tweet_id: uuid("tweet_id"),
  created_at: timestamp("created_at"),
});

export const bookmarks = pgTable("bookmarks", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id"),
  tweet_id: uuid("tweet_id"),
  created_at: timestamp("created_at"),
});
