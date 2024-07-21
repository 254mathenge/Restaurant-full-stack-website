import express from "express";
import cors from "cors"
import{config} from "dotenv"
import usersRoutes from "./routes/users.routes.js";
import mealsRoutes from "./routes/meals.routes.js"
config()
const app = express();
app.use(cors({
  origin:"http://localhost:5173",
  methods: ["POST", "GET", "DELETE", "PATCH"]
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/users",usersRoutes)
app.use("/meals",mealsRoutes)
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});