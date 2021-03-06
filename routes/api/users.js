const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Users = require("../../models/Users");

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 3 or more characters"
    ).isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;

    try {
      let user = await Users.findOne({ email });
      if (user)
        res.status(400).json({ error: [{ msg: "This user already exists" }] });

      const salt = await bcrypt.genSalt(10);

      user = new Users({ name, email, password });
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch ({ message = "", reason = "" }) {
      console.error("Users router /", message || reason);
      res.status(500).send("Server error - Users router");
    }
  }
);

router.put("/", auth, async (req, res) => {
  try {
    const user = await Users.findById(req.user.id).select("-password");

    const { appName = "", appUrl = "", fileName = "", fileUrl = "" } = req.body;
    const app = {};

    if (appName) app.appName = appName;
    if (appUrl) app.appUrl = appUrl;
    if (fileName) app.fileName = fileName;
    if (fileUrl) app.fileUrl = fileUrl;

    user.apps.push(app);

    await user.save();

    res.json(user);
  } catch ({ message = "", reason = "" }) {
    console.error(message || reason);
    res.status(500).send("Server error");
  }
});

module.exports = router;
