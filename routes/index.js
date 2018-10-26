const goalRoutes = require("./goals");
const userRoutes = require("./users");
const path = require("path");

const constructorMethod = app => {
  app.use("/goals", goalRoutes);
  app.use("/users", userRoutes);
  app.get("/about", (req, res) => {
    res.sendFile(path.resolve("static/about.html"));
  });

  app.use("*", (req, res) => {
    res.redirect("/goals");
  });
};

module.exports = constructorMethod;