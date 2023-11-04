// const express = require("express");
// const User = require("../Schema/userSchema");
// const router = express.Router();
// const { body, validationResult } = require("express-validator");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const fetchuser = require("../middleware/fetchuser");
// const isAdmin = require("../middleware/isAdmin");
// require("dotenv").config();
// const JWT_SECRET = process.env.JWT_SECRET;
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // Register
// router.post(
//   "/register",
//   [
//     body("name", "Enter a valid name").isLength({ min: 2 }),
//     body("email", "Enter a valid email").isEmail(),
//     body("password", "Password must be at least 5 characters").isLength({
//       min: 5,
//     }),
//   ],
//   async (req, res) => {
//     let success = false;
//     let user = await User.findOne({ email: req.body.email });
//     if (user) {
//       return res.status(400).json({ error: "already exists" });
//     }
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//     success = false;

//       return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//       // hashed password
//       const salt = await bcrypt.genSalt(10);
//       const securedPass = await bcrypt.hash(req.body.password, salt);
//       const user = await User.create({
//         name: req.body.name,
//         email: req.body.email,
//         password: securedPass,
//       });
//       //jwt
//       const data = {
//         user: {
//           id: user.id,
//         },
//       };
//       const Authtoken = jwt.sign(data, JWT_SECRET);
//       success = true;
//       res.json({ Authtoken: Authtoken,success:success });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json("Internal Server Error");
//     }
//   }
// );
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //LOGIN ROUTE

// router.post(
//   "/login",
//   [
//     body("email", "Enter a valid email").isEmail(),
//     body("password", "Password Cannot be Blank").exists(),
//   ],
//   async (req, res) => {
//     let success = false;

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     const { email, password } = req.body;
//     try {
//       let user = await User.findOne({ email });
//       if (!user) {
//         success = false;
//         res.status(400).json({ error: "User Does not exists" });
//       }
//       const passwordCompare = await bcrypt.compare(password, user.password);
//       if (!passwordCompare) {
//         success = false;
//         return res.status(400).json({ error: "User Does not exists" });
//       }
//       const payload = {
//         user: {
//           id: user.id,
//         },
//       };
//       const Authtoken = jwt.sign(payload, JWT_SECRET);
//       success=true;
//       res.json({ Authtoken: Authtoken,success:success });
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //GetUserData

// router.get("/getuser", fetchuser, async (req, res) => {
//   try {
//     userId = req.user.id;
//     console.log(req.user)
//     const user = await User.findById(userId).select("-password");
//     res.json(user);
//     console.log(user.role)
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Some Error Occured " });
//   }
// });
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ///all USer
// router.get('/allUsers', isAdmin,async (req, res) => {
//   try {
//       const allUsers = await User.find();
//       const questionCount = allUsers.length;
//       res.json({ count: questionCount, Users: allUsers });
//   } catch (error) {
//       res.status(500).json({ error: 'Error retrieving questions and counting them' });
//   }
// });

// module.exports = router;






const express = require("express");
const User = require("../Schema/userSchema");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const isAdmin = require("../middleware/isAdmin");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

// Register
router.post("/register", [
    body("name", "Enter a valid name").isLength({ min: 2 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
], async (req, res) => {
    try {
        let success = false;
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        const securedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: securedPass,
        });

        await newUser.save();

        const data = {
            user: {
                id: newUser.id,
            },
        };

        const Authtoken = jwt.sign(data, JWT_SECRET);
        success = true;

        res.json({ Authtoken: Authtoken, success: success });
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal Server Error");
    }
});

// LOGIN ROUTE
router.post("/login", [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password Cannot be Blank").exists(),
], async (req, res) => {
    try {
        let success = false;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            success = false;
            return res.status(400).json({ error: "User Does not exist" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ error: "Incorrect password" });
        }

        const payload = {
            user: {
                id: user.id,
            },
        };

        const Authtoken = jwt.sign(payload, JWT_SECRET);
        success = true;

        res.json({ Authtoken: Authtoken, success: success });
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error");
    }
});

// GetUserData
router.get("/getuser", fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Some Error Occurred" });
    }
});

// All Users
router.get('/allUsers', isAdmin, async (req, res) => {
    try {
        const allUsers = await User.find();
        const userCount = allUsers.length;
        res.json({ count: userCount, Users: allUsers });
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving users and counting them' });
    }
});

module.exports = router;
