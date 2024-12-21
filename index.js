import dotenv from "dotenv";
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Using require for consistency
import { ingredientRouter } from "./route.js";

const app = express();
app.use(express.json());
dotenv.config();

// Google API key from environment
const GOOGLE_API_KEY = process.env.API_KEY;

// Initialize Google Generative AI instance
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

// Define the endpoint for generating recipes
app.post("/ingredients", async (req, res) => {
  const { ingredients } = req.body; // Expecting an array of ingredients

  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    return res
      .status(400)
      .json({ error: "Please provide a list of ingredients." });
  }

  // Create a comma-separated list of ingredients
  const ingredientList = ingredients.join(", ");

  // Prompt template
  const prompt = `I want you to suggest some food recipes with the ingredients ${ingredientList}. Make the list comma separated.`;

  try {
    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate content
    const response = await model.generateContent({ prompt });
    console.log(response)
    // Extract and send the response
    res.json({
      recipes: response.output, // Adjust according to API response structure
    });
  } catch (error) {
    console.error(
      "Error generating recipes:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to generate recipes" });
  }
});

app.use('/api/ingredient', ingredientRouter);

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
