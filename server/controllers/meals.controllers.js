import { PrismaClient } from "@prisma/client"
const prisma=new PrismaClient()
export const createMeal= async(req,res)=>{
    try{
        const {imageUrl,name,price,description,category}=req.body
        const newMeal=await prisma.meals.create({
            data:{
                imageUrl,
                name,
                price,
                description,
                category
            }
        })
        res.status(201).json({newMeal})
    }catch(error){
        res.status(500).json({success:false,message:error.message})
    }
}
export const getAllMeals=async(req,res)=>{
    try{
        const meals=await prisma.meals.findMany()
        res.json({meals})
    }catch(error){
        res.status(500).json({success:false,message:error.message})
    }
}
export const getMealById =async(req,res)=>{
    const id=req.params.mealId
    try{
        const meal=await prisma.meals.findFirst({
            where:{
                mealId:id
            }
            
        })
        res.json({meal})
    }catch(error){
        res.status(500).json({success:false,message:error.message})
    }
}
export const deleteMeal= async(req,res)=>{
    const id=req.params.mealId
    console.log("deleting");
    try{
        const deletedMeal=await prisma.meals.delete({
            where:{
                mealId:id
            },
            select:{
                imageUrl:true,
                name:true,
                price:true,
                description:true,
                category:true

            }
        })
        console.log(deletedMeal);
        res.status(204).send({deletedMeal})
    }catch(error){
        res.status(500).json({success:false,message:error.message})
    }
}
