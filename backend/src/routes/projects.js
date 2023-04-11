import express from 'express';
import { create, get, getAll, remove, update, getSlug, getTrash, restore, forceDelete } from '../controller/projects'
import { checkPermission } from '../middlewares/checkPermission';
import uploadCloud from '../middlewares/cloudinary';

const router = express.Router();
router.get("/projects",getAll)
router.get("/project/:slug", getSlug)
router.get("/admin/project/:id", get)
router.get("/admin/projects/trash", getTrash)
router.post("/projects", checkPermission,uploadCloud.single('thumbnail'),create)
router.patch("/project/:id",checkPermission, update)
router.patch("/project/restore/:id", restore)
router.delete("/project/:id",checkPermission, remove)
router.delete("/project/:id/force",checkPermission, forceDelete)

export default router;