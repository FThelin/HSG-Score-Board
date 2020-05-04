const mongodb = require("mongodb");

async function connect() {
  const client = mongodb.MongoClient;
  const url = "mongodb://localhost:27017/scoreboard";
  const options = { useUnifiedTopology: true };
  const connection = await client.connect(url, options);

  const db = connection.db("scoreboard");
  console.log("Database has been created");
  return db;
}

async function createCollections(db) {
  const userCollection = await db.createCollection("users");
  console.log("Collections has been created");
  return [userCollection];
}

async function findUsers(collection) {
  const users = await collection.find({ name: "Jonathan" }).toArray();
  console.log(users);
  return users;
}

async function insertUser(collection) {
  const res = await collection.insertOne({
    name: "Jonathan",
    status: "Sover",
  });
  console.log("User added");
}

async function run() {
  const db = await connect();
  const collections = await createCollections(db);
  insertUser(collections[0]);
  const users = await findUsers(collections[0]);
}

run();
