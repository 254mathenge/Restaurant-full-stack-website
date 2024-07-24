import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const createOrders = async (req, res) => {
  const customer = req.customer;
  console.log("creating");
    try {
      const {title,createdAt} =req.body
      const newOrder = await prisma.orders.create({
        data: {
          title,
          createdAt,
          customerId: req.user.id,
        },
          include:{
            customer:true
          }
        

      });
      console.log(newOrder);
      res.status(201).json({success:true,message:"order created successfully",data:newOrder});
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };