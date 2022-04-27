const express = require("express");
const path = require('path');
const http = require('http');
const port = process.env.PORT || 4000 ;
const cors = require('cors');
const mongoose =require('mongoose');
const cookieParser = require('cookie-parser');
const bparser = require('body-parser')
var csrf = require('csurf')
const fs = require('fs');
const fsr = require('file-stream-rotator');
const yaml = require('yamljs');
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = yaml.load('./swagger.yaml');
const morgan = require('morgan')
const multer = require('multer')
const helmet = require("helmet");



require('dotenv').config();

const app = express();
app.use(cors());
app.use(helmet());

var parseForm = bparser.urlencoded({ extended: false });
var csrfProtect = csrf({ cookie: true })
const jwt = require("jsonwebtoken");

app.use(bparser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(
  "/api",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
)
app.get("/", (req, res) => {
res.send("Hello World!");
});
function generateAccessToken(username) {
  return jwt.sign({ username }, process.env.TOKEN_SECRET, { expiresIn: "1800s", });
}
function validateToken(token){
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
  });
  return true;
}
function getToken(req, res, next){
  email=req.body.email;
  const token = generateAccessToken(email);
  if(validateToken(token)){
    res.redirect("/admin-main")
  }
}
app.post("/post", getToken);


app.listen(port, console.log(`Server started on port ${port}`));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open',()=>{
    // console.log("MongoDb Connection is Successful");
});
let logsinfo = fsr.getStream({ filename: "text.log", frequency: "1h", verbose: true });
app.use(morgan('combined', { stream: logsinfo })) //tiny,dev,common,combined
app.use(express.json())

const FeedRouter = require('./routes/feedroutes')
app.use('/feed', FeedRouter)

const FoodRouter = require('./routes/foodroutes')
app.use('/food', FoodRouter)

const UserRouter = require('./routes/userroutes')
app.use('/users', UserRouter)

const OrganizerRouter = require('./routes/organizerroutes')
app.use('/organizers', OrganizerRouter)

const AdminRouter = require('./routes/adminroutes')
app.use('/admins', AdminRouter)

const BookingRouter = require('./routes/bookingroutes')
app.use('/booking', BookingRouter)

const VenueRouter = require('./routes/venueroutes')
app.use('/venue', VenueRouter)

const EventRouter = require('./routes/eventroutes')
app.use('/events', EventRouter)

module.exports = app;
