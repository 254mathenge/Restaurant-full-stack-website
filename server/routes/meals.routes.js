
import { Router } from "express";
import { createMeal ,getAllMeals,getMealById,deleteMeal} from "../controllers/meals.controllers.js";
const router=Router()
router.post("/",createMeal)
router.get("/",getAllMeals)
router.get("/:mealId",getMealById)
router.delete("/:mealId",deleteMeal)
export default router
