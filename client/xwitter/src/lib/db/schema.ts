import { text, timestamp, uuid, pgTable } from "drizzle-orm/pg-core";

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  username: text("username").notNull(),
  fullName: text("full_name").notNull(),
});

export const tweets = pgTable("tweets", {
  id: uuid("id").primaryKey().defaultRandom(),
  text: text("text").notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => profiles.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const hashtags = pgTable("hashtags", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
});

export const tweetHashtag = pgTable(
  "tweet_hashtag",
  {
    tweetId: uuid("tweet_id")
      .notNull()
      .references(() => tweets.id),
    hashtagId: uuid("hashtag_id")
      .notNull()
      .references(() => hashtags.id),
  },
  (tweet_hashtag) => ({
    tweetHashtagPrimaryKey: primaryKey(
      tweet_hashtag.tweetId,
      tweet_hashtag.hashtagId
    ),
  })
);

export const replies = pgTable("replies", {
  id: uuid("id").primaryKey().defaultRandom(),
  text: text("text").notNull(),
  user_id: uuid("user_id").notNull(),
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
