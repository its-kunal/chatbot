import { Router } from "express";
import {
  deleteConversation,
  getConversation,
  updateConversation,
} from "../controllers/conversation";

const router = Router();

router.get("/:conversationId", async (req, res) => {
  const { conversationId } = req.params;
  try {
    return res.send(await getConversation(conversationId));
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.put("/:conversationId", async (req, res) => {
  const { conversationId } = req.params;
  const { message } = req.body;
  try {
    return res.send(await updateConversation(conversationId, message));
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.delete("/:conversationId", async (req, res) => {
  const { conversationId } = req.params;
  try {
    return res.send(await deleteConversation(conversationId));
  } catch (err) {
    return res.status(400).send(err);
  }
});

export default router;
