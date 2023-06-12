const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();
app.use(express.json());
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

app.use(cors());
const db = require("./app/models");
const Role = db.role;

// db.sequelize.sync({ alter: true }).then(() => {
//   console.log("Drop and Resync Db");
//   initial();
// });

// parse requests of content-type - application/json

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "epochs-session",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true,
  })
);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to epochs application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}
