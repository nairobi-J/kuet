import { pool } from "./db.js";

export async function addIngredient({
  id,
  name,
}) {
  const [result] = await pool.query(
    "INSERT INTO ingredients(id, name) VALUES(?, ?)",
    [id, name]
  );

}

export async function getIngredients() {
  try {
    const [result] = await pool.query(
      "SELECT * FROM ingredients",
    );
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}