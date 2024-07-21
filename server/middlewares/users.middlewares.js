export const validateUser= async(req,res,next)=>{
    const {firstName,lastName,emailAddress,password,contact}=req.body
if(!firstName)(res.status(400).json({success:false,message:"firstName required"}))
if(!lastName)(res.status(400).json({success:false,message:"lastName required"}))
if(!emailAddress)(res.status(400).json({success:false,message:"emailAddress required"}))
if(!password)(res.status(400).json({success:false,message:"password required"}))
if(!contact)(res.status(400).json({success:false,message:"contact required"}))  
    const userWithEmail=await Prisma.user.findFirst({
where:{emailAddress:emailAddress}
})  
if (!userWithEmail) res.status(500).json({success:false,message:"email already taken"})             
    next();
}