import express from "express"
import { recipemodel } from "../Models/recipes.js";
import { usermodel } from "../Models/users.js";
import { verifyToken } from "./users.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const response = await recipemodel.find({});
        res.json(response);
    }
    catch (err) {
        res.json(err);
    }
})

router.post("/", verifyToken, async (req, res) => {
    const recipe = new recipemodel(req.body);

    try {
        const response = await recipe.save();
        res.json(response);
    }
    catch (err) {
        res.json(err);
    }
})

router.put("/", verifyToken, async (req, res) => {
    try {
        const recipe = await recipemodel.findById(req.body.recipeID);
        const user = await usermodel.findById(req.body.userID);
        user.savedRecipes.push(recipe);
        await user.save();
        res.json({ savedRecipes: user.savedRecipes })
    }
    catch (err) {
        res.json(err);
    }
})

router.get("/savedRecipes/ids/:userID", async (req, res) => {
    try {
        const user = await usermodel.findById(req.params.userID);
        res.json({ savedRecipes: user?.savedRecipes })
    }
    catch (err) {
        res.json(err);
    }
})

router.get("/savedRecipes/:userID", async (req, res) => {
    try {
        const user = await usermodel.findById(req.params.userID);

        const savedRecipes = await recipemodel.find({
            _id: { $in: user.savedRecipes },
        })
        res.json({ savedRecipes });
    }
    catch (err) {
        res.json(err);
    }
})


export { router as recipesRouter };