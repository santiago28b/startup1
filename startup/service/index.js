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
app.set('trust proxy', true);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


let users = {};
let habits = [
  { id: uuid.v4(),name: 'exercise for 30 days'},
  { id: uuid.v4(),name: 'save $1000'},
];

const apiRouter = express.Router();
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


//with mongo before console
// apiRouter.post('/auth/create',async (req,res)=> {
//   if(await DB.getUser(req.body.user)){
//     res.status(409).send({msg: 'Existing user'});
//   }else{
//     const user = await DB.createUser(req.body.user,req.body.password);
//     setAuthCookie(res, user.token);
//     res.send({
//       id: user._id,
//     });
//   }
  
// })

//this is chat:
apiRouter.post('/auth/create', async (req, res) => {
  try {
    const userName = req.body.user || req.body.userName; // Handle `userName` or `user`
    console.log('Request body:', req.body);

    if (!userName || !req.body.password) {
      return res.status(400).send({ msg: 'User and password are required' });
    }

    const existingUser = await DB.getUser(req.body.userName);
    if (existingUser) {
      return res.status(409).send({ msg: 'Existing user' });
    }

    const token = uuid.v4(); // Generate a unique token
    const user = { user: req.body.userName, password: req.body.password, token: token };

    const result = await DB.createUser(userName, user.password,token); // Save the user in the database
    console.log('User created successfully:', user);

    setAuthCookie(res, token); // Set the authentication cookie
    res.send({
      id: result.insertedId, // MongoDB's auto-generated ID
      msg: 'User created successfully',
      token: token, // Optional: include the token for client-side use
    });
  } catch (error) {
    console.error('Error in /auth/create:', error.message);
    res.status(500).send({ msg: 'Internal server error' });
  }
});


  // GetAuth login an existing user without mongo
// apiRouter.post('/auth/login', async (req, res) => {
//     const user = users[req.body.userName];
//     if (user) {
//       if (req.body.password === user.password) {
//         user.token = uuid.v4();
//         res.send({ token: user.token });
//         return;
//       }
//     }
//     res.status(401).send({ msg: 'Unauthorized' });
//   });

apiRouter.post('/auth/login', async (req,res)=>{
  console.log(req.body.userName)
  const user = await DB.getUser(req.body.userName);
  console.log(user);
  if(user){
    if(req.body.password === user.password){
      setAuthCookie(res,user.token);
      res.send({id: user._id})
      return;
    }
  }
  res.status(401).send({msg: 'Unauthorized'});
})


  // DeleteAuth logout a user without mongo
// apiRouter.delete('/auth/logout', (req, res) => {
//     const user = Object.values(users).find((u) => u.token === req.body.token);
//     if (user) {
//       delete user.token;
//     }
//     res.status(204).end();
//   });
//down you will find mongoDB

//with mongo
apiRouter.delete('auth/logout', (req,res)=>{
    res.clearCookie(authCookieName);
    res.status(204).end();
})

const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  const authToken = req.cookies[authCookieName];
  console.log('Auth token from cookie:', authToken);
  if (!authToken) {
    return res.status(401).send({ msg: 'Unauthorized: No token provided' });
  }
  const user = await DB.getUserByToken(authToken);
  console.log(authCookieName," " ,authToken)
  if (user) {
    console.log('User authenticated:', user);
    next();
  } else {
    console.log('No user found for token:', authToken);
    res.status(401).send({ msg: 'Unauthorized' });
  }
});



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
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}