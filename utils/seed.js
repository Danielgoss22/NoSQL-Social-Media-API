const connection = require("../config/connection");
const { User } = require("../models");
const user = require("./data");

connection.once("open", async () => {
  let userCheck = await connection.db
    .listCollections({ name: "user" })
    .toArray();
  if (userCheck.length) {
    await connection.dropCollection("user");
  }

  let thoughtCheck = await connection.db
    .listCollections({ name: "thought" })
    .toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection("thought");
  }

  await User.insertMany(user);

  console.table(user);
  console.info("Seeding Done!");
  process.exit(0);
});
