const User = require("../Model/user");
const bcrypt = require("bcrypt");
require("dotenv").config();

const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    console.log("hello");
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(e);
    res.status(500).json("server error");
  }
};

exports.loginUser = async (req, res) => {
  try {
    const checkUser = await User.findOne({ email: req.body.email });
    if (!checkUser) {
      return res.json("No this user");
    }
    const isMatch = await bcrypt.compare(req.body.password, checkUser.password);
    if (!isMatch) {
      return res.json("Password is not matched");
    }
    const user = { id: checkUser._id, email: checkUser.email };
    const assessToken = jwt.sign(user, process.env.ACCESSS_TOKEN_SECRET, {
      expiresIn: "24h",
    });
    res.cookie("token", assessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ assessToken: assessToken, allow: true, id: checkUser._id });
  } catch (e) {
    console.error(e);
    res.status(500).json("An error occurred");
  }
};

exports.userDetails = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    jwt.verify(
      token,
      process.env.ACCESSS_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: "Forbidden: Invalid token" });
        }
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
      }
    );
  } catch (e) {
    console.log(e);
    res.status(500).json("An error occurred");
  }
};

exports.addIncome = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const income = {
      category: req.body.category,
      amount: Number(req.body.amount),
      date: req.body.date,
    };
    user.incomes.push(income);
    await user.save();
    res.status(201).json({ message: "Income added" });
  } catch (e) {
    console.log(e);
    res.status(500).json("An error occurred");
  }
};

exports.addExpense = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const expense = {
      category: req.body.category,
      amount: Number(req.body.amount),
      date: req.body.date,
    };
    user.expenses.push(expense);
    await user.save();
    res.status(201).json({ message: "Expense added" });
  } catch (error) {
    console.log(error);
    res.status(500).json("An error occurred");
  }
};

exports.getIncomesExpenses = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    jwt.verify(
      token,
      process.env.ACCESSS_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: "Forbidden: Invalid token" });
        }
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
      }
    );
  } catch (e) {
    console.log(e);
    res.status(500).json("An error occurred");
  }
};

exports.deleteIncomeItem = async (req, res) => {
  try {
    const userId = req.body.userId;
    const itemId = req.body.itemId;

    // Validate inputs
    if (!userId || !itemId) {
      return res.status(400).json({ error: "User ID and Item ID are required" });
    }

    // Perform the update operation
    const result = await User.updateOne(
      { _id: userId },
      { $pull: { incomes: { _id: itemId } } }
    );

    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ error: "Income item not found or already removed" });
    }

    res.status(200).json({ message: "Income item removed successfully" });
  } catch (e) {
    console.error("Error deleting income item:", e);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteExpenseItem = async (req,res) => {
  try {
    const userId = req.body.userId;
    const itemId = req.body.itemId;

    // Validate inputs
    if (!userId || !itemId) {
      return res.status(400).json({ error: "User ID and Item ID are required" });
    }

    // Perform the update operation
    const result = await User.updateOne(
      { _id: userId },
      { $pull: { expenses: { _id: itemId } } }
    );

    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ error: "Income item not found or already removed" });
    }

    res.status(200).json({ message: "Income item removed successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json("An error occurred");
  }
}

exports.logout = async (req,res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ message: "No token found to log out" });
    }
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    res.status(200).json({message: "Logged Out", allowLogout: true})
  } catch (e) {
    console.log(e);
    res.status(500).json("An error occurred");
  }
}