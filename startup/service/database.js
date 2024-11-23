const { MongoClient } = require('mongodb');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url, { tls: true, serverSelectionTimeoutMS: 3000});

const db = client.db('startup');
const habitsCollection = db.collection('habit');
const userCollection = db.collection('user');


// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
  })().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  });

  function getUser(user){
    return userCollection.findOne({user:user})
  }

  async function getUserByToken(token){
    console.log('Looking for user with token:', token);
  const user = await userCollection.findOne({ token: token });
  console.log('User found:', user);
  return user;
  }

  function createUser(user,password,token){
    const newUser = {
        user: user,
        password : password,
        token: token
    };
    console.log('Creating user:', newUser); // Log the user data being passed to MongoDB
    return userCollection.insertOne(newUser)
  }


  
  async function addGoal(habit) {
    return habitsCollection.insertOne(habit);
  }
  async function deleteHabitById(id) {
    return habitsCollection.deleteOne({ id });
  }
  async function getHabits() {
    const habitsCollection = db.collection('habit'); // Ensure this collection matches your MongoDB setup
    return habitsCollection.find().sort({ order: 1 }).toArray(); // Sort by order field
  }

  async function updateHabitOrder(id,order){
    return habitsCollection.updateOne({ id: id }, { $set: { order: order } });
  }
  
  
  module.exports = {
    addGoal,
    deleteHabitById,
    getHabits,
    getUser,
    getUserByToken,
    createUser,
    updateHabitOrder,
  };
  