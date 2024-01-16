const router = require("express").Router();
const { User, Status } = require("../models");
const withAuth = require("../utils/auth");
// i want to make sure that i can see my env vars
require("dotenv").config();

router.get("/", async (req, res) => {
  try {
    res.render("home", {loggedIn: req.session.logged_in});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  try {
    res.render("login", {loggedIn: req.session.logged_in});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile", async (req, res) => {
  try {
    // console.log(req.session.user_id)
    const userData = await User.findAll({
      where: user_id = req.session.user_id,
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Status,
        },
      ],
    });
    // console.log(userData);
    const animes = userData.map((anime) => anime.get({plain: true}));
    // statuses is returning undefined 
    console.log(animes);
    res.render("list", { animes });
    if (!userData) {
      res.status(404).json({
        message: "No user associated with that id",
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/search', async (req,res) => {
  try {
    res.render('browse', {loggedIn: req.session.logged_in})
  }catch (err) {
    res.status(500).json(err)
  }
})

// paramater search is by title
router.get('/search/:title', async (req,res) => {
  try{
      // third party api fetch based on user input
      const response = await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${req.params.title}`)
      // return data from the api fetch 
      const animeData = await response.json();
      res.json(animeData)
  } catch (err) {
      res.status(500).json(err)
  }
})

module.exports = router;
