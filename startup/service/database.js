const { MongoClient } = require('mongodb');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url, { tls: true, serverSelectionTimeoutMS: 3000});

const db = client.db('startup');
const habitsCollection = db.collection('habit');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
  })().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  });
  
  async function addGoal(habit) {
    return habitsCollection.insertOne(habit);
  }
  async function deleteHabitById(id) {
    return habitsCollection.deleteOne({ id });
  }
  async function getHabits() {
    const habitsCollection = db.collection('habit'); // Ensure this collection matches your MongoDB setup
    return habitsCollection.find().toArray(); // Fetch all habits
  }
  
  
  module.exports = {
    addGoal,
    deleteHabitById,
    getHabits
  };
  