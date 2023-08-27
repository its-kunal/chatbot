import { Router } from "express";
import {
  deleteEndUser,
  getEndUser,
  getEndUsers,
  registerEndUser,
  updateEndUser,
} from "../controllers/enduser";

const router = Router();

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    await registerEndUser(name, email, password);
    return res.send("Created user");
  } catch (err) {
    return res.status(400).send("Error");
  }
});

router.get("/", async (req, res) => {
  try {
    return res.send(await getEndUsers());
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.get(":endUserId", async (req, res) => {
  const { endUserId } = req.params;
  try {
    return res.send(await getEndUser(endUserId));
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.put("/:endUserId", async (req, res) => {
  const { endUserId } = req.params;
  const { name, password } = req.body;
  try {
    await updateEndUser(endUserId, name, password);
    return res.send("Updated user");
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.delete("/:endUserId", async (req, res) => {
  const { endUserId } = req.params;
  try {
    await deleteEndUser(endUserId);
    return res.send("Deleted user");
  } catch (err) {
    return res.status(400).send(err);
  }
});

export default router;
