// import {PrismaClient} from "@prisma/client"

// const prisma= new PrismaClient

// export const validateUser= async(req,res,next)=>{
//     const {firstName,lastName,emailAddress,password,contact}=req.body
// if(!firstName)(res.status(400).json({success:false,message:"firstName required"}))
// if(!lastName)(res.status(400).json({success:false,message:"lastName required"}))
// if(!emailAddress)(res.status(400).json({success:false,message:"emailAddress required"}))
// if(!password)(res.status(400).json({success:false,message:"password required"}))
// if(!contact)(res.status(400).json({success:false,message:"contact required"}))  
//     const userWithEmail=await prisma.users.findFirst({
// where:{emailAddress:emailAddress}
// })  
// if (!userWithEmail) res.status(500).json({success:false,message:"email already taken"})             
//     next();
// }
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const validateUser = async (req, res, next) => {
  const { firstName, lastName, emailAddress, password, contact } = req.body;

  if (!firstName) {
    return res.status(400).json({ success: false, message: "First name required" });
  }
  if (!lastName) {
    return res.status(400).json({ success: false, message: "Last name required" });
  }
  if (!emailAddress) {
    return res.status(400).json({ success: false, message: "Email address required" });
  }
  if (!password) {
    return res.status(400).json({ success: false, message: "Password required" });
  }
  if (!contact) {
    return res.status(400).json({ success: false, message: "Contact required" });
  }

  const userWithEmail = await prisma.users.findFirst({
    where: { emailAddress: emailAddress }
  });

  if (userWithEmail) {
    return res.status(500).json({ success: false, message: "Email already taken" });
  }

  next();
};
