
import {Router} from "express"
import {createOrders, getAllOrders,deleteOrder} from "../controllers/orders.controllers.js"
import { authenticateUser } from "../middlewares/auth.middlewares.js"
const router=Router()

router.post("/",authenticateUser,createOrders)

router.get("/",getAllOrders)
// router.get("/:mealId",getMealById)
// router.patch("/:mealId",updateMeal)
router.delete("/:orderId",deleteOrder)
export default router