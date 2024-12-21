import { addIngredient, getIngredients } from "./query.js";

export const fetchIngredients = async (req, res) => {

  try {
    const result = await getIngredients();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addIngredients = async (req, res) => {
    const {id, name} = req.body;
    try {
        await addIngredient({id, name})
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
