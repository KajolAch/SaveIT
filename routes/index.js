const goalRoutes = require("./goals");
const userRoutes = require("./users");
const path = require("path");

const constructorMethod = app => {
  app.use("/goals", goalRoutes);
  app.use("/users", userRoutes);
  // app.get("/", (req, res) => {
  //   res.render('./index',{})
  // });

  app.use("*", (req, res) => {
    res.redirect("/goals");
  });
};

module.exports = constructorMethod;