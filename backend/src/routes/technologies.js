import express from 'express';
import { create, get, getAll, remove, update } from '../controller/technologies'
import { checkPermission } from '../middlewares/checkPermission';

const router = express.Router();
router.get("/technologies",getAll)
router.get("/technologies/:id", get)
router.post("/technologies",checkPermission ,create)
router.delete("/technologies/:id",checkPermission, remove)
router.patch("/technologies/:id",checkPermission, update)

export default router;