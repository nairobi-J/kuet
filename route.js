import express from "express"
import { addIngredients, fetchIngredients } from "./controllers.js";
export const ingredientRouter = express.Router();

ingredientRouter.post("/add", addIngredients);
ingredientRouter.get("/get", fetchIngredients);

