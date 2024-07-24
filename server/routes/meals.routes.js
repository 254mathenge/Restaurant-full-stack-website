
import { Router } from "express";
import { createMeal ,getAllMeals,getMealById,updateMeal,deleteMeal} from "../controllers/meals.controllers.js";
const router=Router()
router.post("/",createMeal)
router.get("/",getAllMeals)
router.get("/:mealId",getMealById)
router.patch("/:mealId",updateMeal)
router.delete("/:mealId",deleteMeal)
export default router
