import { Router } from "express";
import { UserController } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/roleMiddleware";

const router = Router();
const controller = new UserController();

router.post("/", controller.create);
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  controller.findAll
);

export default router;

router.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  controller.findById
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  controller.update
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  controller.delete
);