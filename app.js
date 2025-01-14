const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");
require("dotenv").config();

const homeRoutes = require("./routes/homeRoutes");
const loginRoutes = require("./routes/loginRoutes");
const adminRoutes = require("./routes/adminRoutes");
const logoutRoutes = require("./routes/logoutRoutes");
const fileMiddleware = require("./middleware/uploadFile");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname + "/views"));
app.use("/images", express.static(__dirname + "/images"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");
mongoose.set('strictQuery', false);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "savkabakery",
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: new Date(Date.now() + 3600000), // 1 година в мілісекундах що редагує сайт потім треба перезайти(для безпеки)
    },
  })
);

app.use(fileMiddleware.single("avatar"));

app.use("/", homeRoutes);
app.use("/deshychi_vhid", loginRoutes);
app.use("/deshychi_vyhid", logoutRoutes);
app.use("/deshychi_admin", adminRoutes);

const start = async () => {
  try {
    await mongoose.connect(`mongodb+srv://savkabakery:Savka2023@cluster0.rorxbss.mongodb.net/`);

    app.listen(port, () => {
      console.log(`Сервер запущено на порту ${port}\nhttp://localhost:${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
