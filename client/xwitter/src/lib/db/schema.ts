import {
  text,
  timestamp,
  uuid,
  pgTable,
  primaryKey,
  AnyPgColumn,
  uniqueIndex,
} from "drizzle-orm/pg-core";

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
  userId: uuid("user_id")
    .notNull()
    .references(() => profiles.id),
  tweetId: uuid("tweet_id").references(() => tweets.id),
  replyId: uuid("reply_id").references((): AnyPgColumn => replies.id),
});

export const likes = pgTable(
  "likes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => profiles.id),
    tweetId: uuid("tweet_id")
      .notNull()
      .references(() => tweets.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (likes) => ({
    uniqueLikeIndex: uniqueIndex("likes__user_id_tweet_id__idx").on(
      likes.userId,
      likes.tweetId
    ),
  })
);

export const bookmarks = pgTable(
  "bookmarks",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => profiles.id),
    tweetId: uuid("tweet_id")
      .notNull()
      .references(() => tweets.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (bookmarks) => ({
    uniqueBookmarkIndex: uniqueIndex("bookmarks__user_id_tweet_id__idx").on(
      bookmarks.userId,
      bookmarks.tweetId
    ),
  })
);
