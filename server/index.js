import express from "express";
import cors from "cors"
import CookieParser from "cookie-parser"
import{config} from "dotenv"
import usersRoutes from "./routes/users.routes.js";
import mealsRoutes from "./routes/meals.routes.js"
import ordersRoutes from "./routes/orders.routes.js"
config()
const app = express();
app.use(cors({
  origin:"http://localhost:5173",
  methods: ["POST", "GET", "DELETE", "PATCH"]
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(CookieParser())
app.use("/users",usersRoutes)
app.use("/meals",mealsRoutes)
app.use("/orders",ordersRoutes)

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});