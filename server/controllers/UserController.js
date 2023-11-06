import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// Register / Create a User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(409).json({
        message: "This email is already used. You can use other email.",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login The User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = await generateToken(user);

    res.status(201).json({
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// User Profile
export const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).populate("likes");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
