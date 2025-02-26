import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { PrismaClient } from "@prisma/client";

import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();

export const register = async (req, res) => {
  const userData = req.body;
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const gender = ["male", "female", "others", "prefer not to say"];
  const roles = ["doctor", "nurse", "paramedic", "receptionist", "clerk"];
  try {
    const userExists = await prisma.staffDetails.findFirst({
      where: {
        username: userData.username,
      },
    });

    if (userExists) {
      return res.status(400).json({ error: "This username exists" });
    }

    if (!roles.includes(userData.role.toLowerCase())) {
      return res.status(400).json({
        message:
          "Please enter either Doctor, Nurse, Paramedic, Receptionist or Clerk as a Role",
      });
    }

    if (userData.gender && !gender.includes(userData.gender.toLowerCase())) {
      return res.status(400).json({
        message:
          "Please enter either male, female, others or prefer not to say",
      });
    }

    const user = await prisma.staffDetails.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );
    res
      .status(201)
      .json({ message: "Hospital Staff successfully registered", token, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.staffDetails.findFirst({
      where: {
        username,
      },
    });

    if (!user) {
      return res
        .status(400)
        .json({ error: "Staff does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Credentials are not matching" });
    }
    //add the role to the token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );
    //added message for clarity
    res
      .status(200)
      .json({ message: "Staff successfully logged", token, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { username, oldPassword, newPassword } = req.body;

    const user = await prisma.staffDetails.findFirst({
      where: {
        username,
      },
    });

    if (!user) {
      return res.status(400).json({ error: "Credentials not matching" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Credentials are not maching" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await prisma.staffDetails.update({
      where: {
        username,
      },
      data: {
        password: hashedPassword,
      },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

