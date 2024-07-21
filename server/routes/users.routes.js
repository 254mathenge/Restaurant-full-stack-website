import {Router} from "express"
import { validateUser } from "../middlewares/users.middlewares.js"
import { createUser ,getAllUsers,getSingleUser,loginUser} from "../controllers/users.controllers.js"
import { authenticateUser } from "../middlewares/auth.middlewares.js"
const router=Router()

router.post ("/" ,validateUser,createUser)
router.get("/",getAllUsers)
router.post("/login", loginUser)
router.get("/:id",authenticateUser,getSingleUser)
    
export default router