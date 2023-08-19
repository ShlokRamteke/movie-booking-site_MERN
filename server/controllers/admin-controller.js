import Admin from "../models/Admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const addAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  let exisitingAdmin;
  try {
    exisitingAdmin = await Admin.findOne({ email });
  } catch (error) {
    return console.log(error);
  }
  if (exisitingAdmin) {
    return res.status(400).json({ message: "Admin already exisits" });
  }

  let admin;
  const hasedPassword = bcrypt.hashSync(password);
  try {
    admin = new Admin({ email, password: hasedPassword });
    admin = await admin.save();
  } catch (error) {
    return console.log(error);
  }
  if (!admin) {
    return res.status(500).json({ messgae: "Unabel to store admin" });
  }
  return res.status(201).json({ admin });
};

export const adminLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  let exisitingAdmin;
  try {
    exisitingAdmin = await Admin.findOne({ email });
  } catch (error) {
    return console.log(error);
  }
  if (!exisitingAdmin) {
    return res.status(400).json({ message: "Admin not found" });
  }

  const isPasswordCorret = bcrypt.compareSync(
    password,
    exisitingAdmin.password
  );

  if (!isPasswordCorret) {
    return res.status(400).json({ message: "Incorrect Password" });
  }

  const token = jwt.sign({ id: exisitingAdmin._id }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });

  return res
    .status(200)
    .json({ message: "Authenticatio Complete", token, id: exisitingAdmin._id });
};
