import express from "express";
import { create, getAll, getOne, remove, update } from "../controller/product";
const router = express.Router();

router.get("/products", getAll);
router.get("/products/:id", getOne);
router.post("/products", create);
router.put("/products/:id", update);
router.delete("/products/:id", remove);

export default router;
