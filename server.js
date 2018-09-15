         require("dotenv").config();
const   express       =  require("express");
        app           =  express();
        port          =  process.env.port || 3000;
        mongoose      =  require("mongoose");
        session       =  require("express-session");
        mongoStore    =  require("connect-mongo")(session);
        bodyParser    =  require("body-parser");
        flash         =  require("connect-flash");
      expressLayout   =  require("express-ejs-layouts");
       cookieParser   =  require("cookie-parser");

// set ejs
app.set("view engine" , "ejs");
// set css
app.use(express.static(__dirname + "/public"));
app.use(expressLayout);
// get data 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// set session
app.use(cookieParser());
app.use(session({
   secret: process.env.SECRET,
   resave: true,
   saveUninitialized: true,
   cookie: { maxAge : 8540000 },
   store : new mongoStore({
      mongooseConnection: mongoose.connection
   })
}))
app.use(flash());
// connect mongoose
mongoose.connect(process.env.DB_URI , {useNewUrlParser: true})
// set router
app.use(require("./app/routes"));
//run port 
app.listen(port , () => {
   console.log(`http:localhost:${port}`);
})