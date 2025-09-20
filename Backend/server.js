require("dotenv").config({ quiet: true });
const express = require("express");
const connectDb = require("./Config/db");
const path = require("path");
const passport = require("passport");
const oauthRoute = require("./Routes/oauth.Routes");
const cors = require("cors");
const userRoutes = require("./Routes/user.Routes");
const authRoutes = require("./Routes/auth.Routes");
const paymentRoutes = require("./Routes/payment.Routes");
const cookieParser = require("cookie-parser");
require("./Config/oauth");
const app = express();
const session = require("express-session");
const MongoStore = require("connect-mongo");
const port = process.env.PORT;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
const expressLayouts = require("express-ejs-layouts");
// Layout setup
app.use(expressLayouts);
app.set("layout", "layouts/admin");
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

// Session setup
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "yourSecretKeyHere",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: false,
//       maxAge: 1000 * 60 * 5,
//     },
//   })
// );
app.use(
  session({
    secret: process.env.SESSION_SECRET || "yourSecretKeyHere",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI, // your MongoDB connection string
      collectionName: "sessions", // optional, default is "sessions"
    }),
    cookie: {
      secure: true, // must be true in production (Vercel uses HTTPS)
      httpOnly: true,
      sameSite: "none", // important for cross-site cookies
      maxAge: 1000 * 60 * 5,
    },
  })
);
app.set("view engine", "ejs");

const productRoutes = require("./Routes/product.Routes");
const adminRoutes = require("./Routes/admin.Routes");

// const corsOptions = {
//   origin: "http://localhost:5173",
//   credentials: true, // Allow cookies to be sent with requests
// };
const CLIENT_URL = process.env.CLIENT_URL;
const corsOptions = {
  origin: CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']


   // Allow cookies to be sent with requests
};
app.use(cors(corsOptions));



app.get("/", (req, res) => {
  res.render("authViews/login", {
    layout: false,
  });
});

app.get("/register", (req, res) => {
  res.render("authViews/signup", {
    layout: false,
  });
});
app.use("/admin", adminRoutes);
app.use("/auth", oauthRoute);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/pay", paymentRoutes);

app.use((error, req, res, next) => {
  res.status(404).json({ error: "Path not found" });
});

app.listen(port, () => {
  connectDb();
  console.log(`Server is listening on port ${port}`);
});
