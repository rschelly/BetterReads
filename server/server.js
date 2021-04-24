const express = require('express');
const path = require('path');
// const cookieParser = require('cookie-parser');

<<<<<<< HEAD


const userController = require("./controllers/userController");
const cookieController = require("./controllers/cookieController");
=======
// const userController = require("./controllers/userController");
// const cookieController = require("./controllers/cookieController");
>>>>>>> 5738f0c2f65aa56b18c3b03533fc2543e9560fc9
//const sessionController = require("./controllers/sessionController");
// note from kerri - commented out session controller temp due to node errors

const app = express();
const PORT = 3000;

const apiRouter = require('./api/api_router.js');
const libraryRouter = require('./api/libraryRouter.js');

<<<<<<< HEAD
app.use(express.json())
app.use(express.static(path.join(__dirname, './client/html-scss')))


app.get("/", (req, res) => {
  res.render("./../client/html-scss/login")
})


app.get("/home", cookieController.setSSIDCookie, (req, res) => {
    res.render("./../client/html-scss/home")
 })
// note from kerri - commented out cookieController.setCookie temp due to node errors

app.use('/api', apiRouter)
app.use('/db', libraryRouter)

// catch all for requests to unknown route

app.use((req, res) => res.status(400).send('Page Not Found'))
=======
app.use(express.json());
app.use(express.static(path.join(__dirname, './client/html-scss')));

app.get("/", (req, res) => {
    res.redirect((path.join(__dirname, "../client/html-scss/login")));
})
// note from kerri - commented out cookieController.setCookie temp due to node errors

app.get("/login", (res, req) => {
  console.log('login')
  res.sendFile(path.resolve(__dirname, "../client/html-scss/login.html"));
  console.log('login after')
})

// app.use('/api', apiRouter)
app.use('/db', libraryRouter);

// catch all for requests to unknown route

app.use((req, res) => res.status(400).send('Page Not Found'));
>>>>>>> 5738f0c2f65aa56b18c3b03533fc2543e9560fc9

// global error handler

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
<<<<<<< HEAD
    message: {err: 'An error occurred'}
  };

  const errObj = Object.assign({}, defaultErr, err)

  console.log(errObj.log)

  return res.status(errorObj.status).json(errorObj.message)
})


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

=======
    message: { err: 'An error occurred' },
  };

  const errObj = Object.assign({}, defaultErr, err);

  console.log(errObj.log);

  return res.status(errObj.status).json(errObj.message);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
>>>>>>> 5738f0c2f65aa56b18c3b03533fc2543e9560fc9
