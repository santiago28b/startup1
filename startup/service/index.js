const express = require('express');
const uuid = require('uuid');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 3000;


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
app.use(express.json());
let users = {};
let habits = [];
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
  
    if (!habit) {
      return res.status(400).send({ msg: 'Habit is required' });
    }
  
    // Add the new habit to the habits array
    habits.push({ id: uuid.v4(), habit });
  
    // Respond with the updated habits list
    res.status(201).send(habits);
  });
  

