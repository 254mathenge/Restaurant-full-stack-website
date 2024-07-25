import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany({});

    res.json({ users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, emailAddress, password, contact, Role } =
      req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await prisma.users.create({
      data: {
        firstName,
        lastName,
        emailAddress,
        password: hashedPassword,
        contact,
        Role
      },
    });
    // const{password,...user}=newUser
    res.status(201).json({success:true,message:"user created successfully",data:newUser});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const singleUser = await prisma.users.findFirst({
      where: {
        id: id,
      },
    });
    res.status(200).json({ singleUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { emailAddress, password } = req.body;
    // console.log(req.body);
    const user = await prisma.users.findUnique({
      where: {
        emailAddress: emailAddress,
      },
    });
    // console.log(user)

    if (user) {
      const passwordMatch = bcrypt.compareSync(password, user.password);
      // console.log(passwordMatch);
      if (passwordMatch === true) {
        const token = jwt.sign({ id: user.id },process.env.JWT_SECRET, {
          expiresIn: "96h",
        });
       
        res.cookie("restaurant_access_token", token);
        res.status(200).json({ success: true,message:"user logged in",data: {...user,token }});
      } else {
        return res
          .status(401)
          .json({ success: false, message: "Invalid credentials" });
      }
    }
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};
