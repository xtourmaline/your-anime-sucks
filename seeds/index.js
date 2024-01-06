const seedUser = require("./user-seeds");
const seedAnime = require("./anime-seeds");
const seedCategory = require("./category-seeds");
const seedCategoryName = require("./categoryName-seeds");
const seedStatus = require("./status-seeds");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");
  await seedUser();
  console.log("\n----- USERS SEEDED -----\n");

  await seedAnime();
  console.log("\n----- ANIMES SEEDED -----\n");

  await seedCategory();
  console.log("\n----- CATEGORY SEEDED -----\n");

  await seedStatus();
  console.log("\n---- STATUSES SEEDED -----\n");

  await seedCategoryName();
  console.log("\n----- CATEGORY NAME SEEDED -----\n");

  process.exit(0);
};

seedAll();