const Splitter = require('./lib/splitter');
const express = require('express');
const uploadRouter = require('./routes/upload') ;

const app = express();
const PORT = 4000;

// calling the router
app.use('/upload', uploadRouter);

// use the EJS engines
app.set('view engine', 'ejs');

// Call the splitter
// Splitter.splitImage('./img/underwater.png', 2, 2);


app.listen(PORT, () => {console.log(`Listening on port ${PORT}`)});