const cookieParser = require('cookie-parser');
const express = require('express');
const uuid = require('uuid');
const app = express();
const path = require('path');
const DB = require('./database.js');

const authCookieName = 'token';


const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


let users = {};
let habits = [
  { id: uuid.v4(),name: 'exercise for 30 days'},
  { id: uuid.v4(),name: 'save $1000'},
];

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth a new user without monggo
// apiRouter.post('/auth/create', async (req, res) => {
//     const user = users[req.body.userName];
//     if (user) {
//       res.status(409).send({ msg: 'Existing user' });
//     } else {
//       const user = { userName: req.body.userName, password: req.body.password, token: uuid.v4() };
//       users[user.userName] = user;
  
//       res.send({ token: user.token });
//     }
//   });


//with mongo
apiRouter.post('/auth/create',async (req,res)=> {
  if(await DB.getUser(req.body.user)){
    res.status(409).send({msg: 'Existing user'});
  }else{
    setAuthCookie(res, user.token);
    const user = await DB.createUser(req.body.user,req.body.password);
    
  }
  
})

  // GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
    const user = users[req.body.userName];
    if (user) {
      if (req.body.password === user.password) {
        user.token = uuid.v4();
        res.send({ token: user.token });
        return;
      }
    }
    res.status(401).send({ msg: 'Unauthorized' });
  });

  // DeleteAuth logout a user
apiRouter.delete('/auth/logout', (req, res) => {
    const user = Object.values(users).find((u) => u.token === req.body.token);
    if (user) {
      delete user.token;
    }
    res.status(204).end();
  });
//down you will find mongoDB

// GetHabits
apiRouter.get('/habits', async (_req, res) => {
  try {
    const habits = await DB.getHabits(); // Fetch habits from the database
    res.send(habits); // Send them to the frontend
  } catch (error) {
    console.error('Error fetching habits:', error.message);
    res.status(500).send({ msg: 'Failed to fetch habits' });
  }
});

// Submit a new habit
apiRouter.post('/habits', async (req, res) => {
  const { habit } = req.body;

  if (!habit || !habit.name) {
    return res.status(400).send({ msg: 'Habit is required' });
  }

  const newHabit = { id: uuid.v4(), name: habit.name };
  await DB.addGoal(newHabit);
  const updatedHabits = await DB.getHabits();
  res.status(201).send(updatedHabits);
});

// Delete a habit
apiRouter.delete('/habits/:id', async (req, res) => {
  const { id } = req.params;
  const result = await DB.deleteHabitById(id);

  if (result.deletedCount > 0) {
    const updatedHabits = await DB.getHabits();
    res.status(200).send(updatedHabits);
  } else {
    res.status(404).send({ msg: 'Habit not found' });
  }
});

//this down here is still onmemory storage.

apiRouter.post('/habits/move', (req, res) => {
  const { id, direction } = req.body;

  // Find the index of the habit
  const index = habits.findIndex(h => h.id === id);

  if (index === -1) {
      return res.status(404).send({ msg: 'Habit not found' });
  }

  if (direction === 'up' && index > 0) {
      // Swap with the previous item
      [habits[index - 1], habits[index]] = [habits[index], habits[index - 1]];
  } else if (direction === 'down' && index < habits.length - 1) {
      // Swap with the next item
      [habits[index], habits[index + 1]] = [habits[index + 1], habits[index]];
  }

  res.status(200).send(habits); // Return the updated list
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});