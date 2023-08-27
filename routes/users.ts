import { Router } from "express";
import {
  allUsers,
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/user";
import { createChatbot, getChatbots } from "../controllers/chatbot";

const router = Router();

router.post("/", async (req, res) => {
  // retrieve data from request
  const { username, password, email } = req.body;
  try {
    await createUser(username, email, password);
    return res.send("User created");
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.get("/", async (req, res) => {
  try {
    return res.send(await allUsers());
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    res.send(await getUser(Number(id)));
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.put("/:id", async (req, res) => {
  // retrieve data from request
  const { id } = req.params;
  const { username, password, email } = req.body;
  try {
    await updateUser(Number(id), username, password, email);
    return res.send("User updated");
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.delete("/:id", async (req, res) => {
  // retrieve data from request
  const { id } = req.params;
  try {
    await deleteUser(Number(id));
    return res.send("User deleted");
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.post(":userId/chatbots", async (req, res) => {
  const { userId } = req.params;
  const { name, description, defaultMessage } = req.body;
  try {
    await createChatbot(userId, name, defaultMessage, description);
    return res.send("Chatbot created successfully");
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.get("/:userId/chatbots", async (req, res) => {
  const { userId } = req.params;
  try {
    return res.send(await getChatbots(userId));
  } catch (err) {
    return res.status(400).send(err);
  }
});

export default router;
