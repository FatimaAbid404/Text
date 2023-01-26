const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Keywords = require('../models/Keywords');
const { body, validationResult } = require('express-validator');


const mediaController = require("../controllers/mediaController");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("public")) {
      fs.mkdirSync("public");
    }

    if (!fs.existsSync("public/videos")) {
      fs.mkdirSync("public/videos");
    }

    cb(null, "public/videos");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    var ext = path.extname(file.originalname);

    if (ext !== ".mkv" && ext !== ".mp4") {
      return cb(new Error("Only videos are allowed!"));
    }

    cb(null, true);
  },
});
//route1:Add a new keywords "/api/auth/fetchallkeywords"
router.get('/fetchallkeywords', fetchuser, async (req, res) => {
    try {
        const keywords = await Keywords.find({ user: req.user.id });
        res.json(keywords)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }

})

//route2:add the keywords 
router.post('/addkeywords', fetchuser, upload.fields([
    {
      name: "videos",
      maxCount: 5,
    },
  ]), async (req, res) => {
    try {


   let videosPaths = [];

  

//   try {
//     const createdMedia = await Media.create({
//       name,
//       videos: videosPaths,
//     });

//     res.json({ message: "Media created successfully", createdMedia });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json(error);
//   }

        const { title, description, tag,videos } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        if (Array.isArray(req.files.videos) && req.files.videos.length > 0) {
            for (let video of req.files.videos) {
              videosPaths.push("/" + video.path);
            }
          }
        const keywords = new Keywords({
            title, description, tag, user: req.user.id,videos: videosPaths
        })
        const savedKeyword = await keywords.save()

        res.json(savedKeyword)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");

    }
})

//route3:update keywords
// router.put('/updatekeyword/:id', fetchuser, async (req, res) => {
//     const { title, description, tag } = req.body;
//     //create new keyword
//     const newKeyword = {};
//     if (title) { newKeyword.title = title };
//     if (description) { newKeyword.description = description };
//     if (tag) { newKeyword.tag = tag };
//     //Find the keyword to be updated and update
//     let keyword = await Keywords.findById(req.params.id);
//     if (!keyword) { return res.status(404).send("Not Found") }

//     if (keyword.user.toString()!== req.user.id) {
//         return res.status(401).send("Not Allowed");
//     }
//     keyword = await Keywords.findByIdAndUpdate(req.params.id, { $set: newKeyword }, { new: true })
//     res.json({keyword})


// })

module.exports = router