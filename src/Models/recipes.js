import mongoose from "mongoose"

const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ingredients: [{ type: String, required: true }],
    instructions: { type: String, required: true },
    imgUrl: { type: String, required: true },
    cookingTime: { type: Number, required: true },
    userOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
});

export const recipemodel = mongoose.model("recipes", recipeSchema);