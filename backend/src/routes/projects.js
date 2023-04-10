import express from 'express';
import { create, get, getAll, remove, update, getDeletedProjects } from '../controller/projects'
import { checkPermission } from '../middlewares/checkPermission';
import uploadCloud from '../middlewares/cloudinary';

const router = express.Router();
router.get("/projects",getAll)
router.get("/projects/:id", get)
router.get("/projects/trash", getDeletedProjects)
router.post("/projects", uploadCloud.single('thumbnail') ,checkPermission,create)
router.delete("/projects/:id",checkPermission, remove)
router.patch("/projects/:id",checkPermission, update)

export default router;