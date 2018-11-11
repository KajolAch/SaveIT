const express = require("express");
const router = express.Router();
const data = require("../data");
const goalData = data.goals;
const userData = data.users;
const userId = "598a6059-5270-4bfe-9de3-7ad0eb1880bc";
try {
  // router.get("/new", (req, res) => {
  //   console.log("hi");
  //   res.render("goals/new");

  // });

  router.get("/:id", async (req, res) => {
    const goal = await goalData.getgoalById(req.params.id);
    res.render("goals/single", {
      goal: goal
    });
  });

  router.get("/tag/:tag", (req, res) => {
    goalData.getgoalsByTag(req.params.tag).then(goalList => {
      res.render("goals/index", {
        goals: goalList
      });
    });
  });

  router.get("/", async (req, res) => {
    const goalList = await goalData.getAllgoals();
    console.log(goalList.length);
    res.render('./index', {
      goals: goalList
    });
    // res.render("goals/index", {
    //   goals: goalList
    // });
  });

  router.post("/", async (req, res) => {
    let wishGoalData = req.body;
    let errors = [];

    if (!wishGoalData.goal_name) {
      errors.push("No title provided");
    }

    // if (!wishGoalData.body) {
    //   errors.push("No body provided");
    // }
    if (!wishGoalData.gamount) {
      errors.push("No body provided");
    }

    // if (!wishGoalData.userId) {
    // errors.push("No goaler selected");
    // }
    // console.log(errors.length);
    if (errors.length > 0) {
      console.log("hi1");
      res.render("goals/new", {
        errors: errors,
        hasErrors: true,
        goal: wishGoalData
      });
      return;
    }

    try {
      const newgoal = await goalData.addgoal(
        wishGoalData.goal_name,
        // wishGoalData."most important",
        "most important",
        wishGoalData.tags || [],
        userId,
        wishGoalData.gamount,
        wishGoalData.gstatus,
        wishGoalData.gpriority,

      );
      console.log(newgoal);
      // userData.addgoalToUser(userId, newgoal._id, newgoal.gname);

      console.log(newgoal);
      // res.status(200).json(newgoal);
      // res.render('./index',{goals:goalData.getAllgoals()});
      res.redirect('/goals');
    } catch (e) {
      console.log(e);
      res.status(500).json({
        error: e
      });
    }
  });

  router.put("/:id", (req, res) => {
    let updatedData = req.body;

    let getgoal = goalData.getgoalById(req.params.id);

    getgoal
      .then(() => {
        return goalData
          .updategoal(req.params.id, updatedData)
          .then(updatedgoal => {
            res.json(updatedgoal);
          })
          .catch(e => {
            res.status(500).json({
              error: e
            });
          });
      })
      .catch(() => {
        res.status(404).json({
          error: "goal not found"
        });
      });
  });

  router.delete("/:id", (req, res) => {
    let getgoal = goalData.getgoalById(req.params.id);

    getgoal
      .then(() => {
        return goalData
          .removegoal(req.params.id)
          .then(() => {
            res.sendStatus(200);
          })
          .catch(e => {
            res.status(500).json({
              error: e
            });
          });
      })
      .catch(() => {
        res.status(404).json({
          error: "goal not found"
        });
      });
  });

  module.exports = router;
} catch (e) {
  throw "Problem in goals routes";
}