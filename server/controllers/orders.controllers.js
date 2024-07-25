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
  export const getAllOrders=async(req,res)=>{
    // const customer = req.customer;
    try{
        const orders=await prisma.orders.findMany({
          include: {
        customer: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
            
          
        })
          
          
    
        console.log(orders)
        res.json({orders})
    }catch(error){
        res.status(500).json({success:false,message:error.message})
    }
}
export const deleteOrder= async(req,res)=>{
  const id=req.params.orderId
  console.log("deleting");
  try{
      const deletedOrder=await prisma.orders.delete({
          where:{
              orderId:id
          },
          select:{
           
              title:true,
              createdAt:true,
                customer:true,
                customerId:true
              }
            

          
      })
      console.log(deletedOrder);
      res.status(204).send({deletedOrder})
  }catch(error){
      res.status(500).json({success:false,message:error.message})
  }
}
