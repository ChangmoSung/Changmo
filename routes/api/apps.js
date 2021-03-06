const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Apps = require("../../models/Apps");

router.post(
  "/",
  [
    check("appName", "App name is required").not().isEmpty(),
    check("appUrl", "App url is required").not().isEmpty(),
    check("fileName", "File name is required").not().isEmpty(),
    check("fileUrl", "File url is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.status(400).json({ errors: errors.array() });

    const { appName, appUrl, fileName, fileUrl = "" } = req.body;

    let app = await Apps.findOne({ appName });
    if (app)
      res.status(400).json({ error: [{ msg: "This app already exists" }] });

    app = new Apps({ appName, appUrl, fileName, fileUrl });

    await app.save();

    res.json(app);
    try {
    } catch ({ message = "", reason = "" }) {
      console.error("Apps router /", message || reason);
      res.status(500).send({ message, reason });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const apps = await Apps.find().sort({ date: -1 });
    res.json(apps);
  } catch ({ message = "", reason = "" }) {
    console.error(message || reason);
    res.status(500).send({ message, reason });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const app = await Apps.findById(req.params.id);
    const { appName = "", appUrl = "", fileName = "", fileUrl = "" } = req.body;

    if (appName) app.appName = appName;
    if (appUrl) app.appUrl = appUrl;
    if (fileName) app.fileName = fileName;
    if (fileUrl) app.fileUrl = fileUrl;

    await app.save();

    res.json(app);
  } catch ({ message = "", reason = "" }) {
    console.error(message || reason);
    res.status(500).send({ message, reason });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const app = await Apps.findById(req.params.id);

    if (!app) res.status(404).json({ msg: "App not found" });

    await app.remove();

    res.json({ msg: "App removed" });
  } catch ({ message = "", reason = "" }) {
    console.error(message || reason);
    res.status(500).send({ message, reason });
  }
});

module.exports = router;
