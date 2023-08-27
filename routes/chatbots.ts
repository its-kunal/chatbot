import {
  deleteChatbot,
  getChatbot,
  updateChatbot,
} from "../controllers/chatbot";
import Chatbot from "../models/chatbot";
import { Router } from "express";

const router = Router();

router.get(":chatbotId", async (req, res) => {
  const { chatbotId } = req.params;
  try {
    return res.send(await getChatbot(chatbotId));
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.put(":chatbotId", async (req, res) => {
  const { chatbotId } = req.params;
  const { name, defaultMessage, description } = req.body;
  try {
    return res.send(
      await updateChatbot(chatbotId, name, defaultMessage, description),
    );
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.delete(":chatbotId", async (req, res) => {
  const { chatbotId } = req.params;
  try {
    return res.send(await deleteChatbot(chatbotId));
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.post(":chatbotId/conversations", async (req, res) => {});
router.get(":chatbotId/conversations", async (req, res) => {});

export default router;
