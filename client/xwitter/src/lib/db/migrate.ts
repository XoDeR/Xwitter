import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from ".";

const main = async () => {
  console.log("Migrations are running...");
  await migrate(db, { migrationsFolder: "drizzle" });
  console.log("Migrations are finished!");
};

main()
  .then(() => {
    console.log("Finished");
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    process.exit();
  });
