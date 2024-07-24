
import {Router} from "express"
import {createOrders} from "../controllers/orders.controllers.js"
import { authenticateUser } from "../middlewares/auth.middlewares.js"
const router=Router()

router.post("/",authenticateUser,createOrders)
// router.get("/",getAllMeals)
// router.get("/:mealId",getMealById)
// router.patch("/:mealId",updateMeal)
// router.delete("/:mealId",deleteMeal)
export default router