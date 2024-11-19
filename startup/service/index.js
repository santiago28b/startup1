const express = require('express');
const uuid = require('uuid');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 3000;


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
app.use(express.json());
app.use(express.static('public'));

let users = {};
let habits = [
  { id: uuid.v4(),name: 'exercise for 30 days'},
  { id: uuid.v4(),name: 'save $1000'},
];

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
    const user = users[req.body.email];
    if (user) {
      res.status(409).send({ msg: 'Existing user' });
    } else {
      const user = { email: req.body.email, password: req.body.password, token: uuid.v4() };
      users[user.email] = user;
  
      res.send({ token: user.token });
    }
  });

  // GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
    const user = users[req.body.email];
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

  // GetHabits
apiRouter.get('/habits', (_req, res) => {
    res.send(habits);
  });
  
  // Submit a new habit
apiRouter.post('/habits', (req, res) => {
    const { habit } = req.body;
  
    if (!habit || !habit.name) {
      return res.status(400).send({ msg: 'Habit is required' });
    }
    const newHabit = { id: uuid.v4(), name: habit.name };
    // Add the new habit to the habits array
    habits.push(newHabit);
    // Respond with the updated habits list
    res.status(201).send(habits);
  });

  apiRouter.delete('/habits/:id', (req, res) => {
    const { id } = req.params;
    const habitIndex = habits.findIndex(h => h.id === id);

    if (habitIndex !== -1) {
        habits.splice(habitIndex, 1);
        res.status(200).send(habits);
    } else {
        res.status(404).send({ msg: 'Habit not found' });
    }
});

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
  

