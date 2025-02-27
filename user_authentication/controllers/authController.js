import bcrypt from "bcryptjs";// for_hashing_passwords_securely
import jwt from "jsonwebtoken";

import { PrismaClient } from "@prisma/client";// orm_for_database_interaction

import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient(); // create_a_new_prisma_client_instance

/**
 * @desc register_a_new_hospital_staff_member
 * @route post /register
 * @acaccess public
 */

export const register = async (req, res) => {
  const userData = req.body;
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const gender = ["male", "female", "others", "prefer not to say"];
  const roles = ["Doctor", "nurse", "paramedic", "receptionist", "clerk"];
  // check_if_the_username_already_exists
  try {
    const userExists = await prisma.staffDetails.findFirst({
      where: {
        username: userData.username,
      },
    });

    if (userExists) {
      return res.status(400).json({ error: "This username exists" });
    }
    //validate_the_role
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
   //create_a_new_staff_record_in_the_database
    const user = await prisma.staffDetails.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });
    // generate_a_jwt_token_for_authentication
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "60d",
      }
    );
    //return_success_response
    res
      .status(201)
      .json({ message: "Hospital Staff successfully registered", token, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
/**
 * @desc staff_login
 * @route post /login
 * @access public
 */
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
    /**
 * @desc change_staff_password
 * @route post /change-password
 * @access private_(requires_authentication)
 */
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Credentials are not matching" });
    }
    
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "60d",
      }
    );
    
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
  } 
  // handle_errors
  catch (error) {
    res.status(400).json({ error: error.message });
  }
};

