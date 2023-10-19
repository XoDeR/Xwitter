import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from ".";

const main = async () => {
  console.log("Migrations are running...");
  await migrate(db, { migrationsFolder: "migrations" });
  console.log("Migrations are finished!");
};

main().finally(() => {
  process.exit();
});
