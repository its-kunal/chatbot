import Conversation from "../models/conversation";
import EndUser from "../models/enduser";

export const createConversation = async (
  endUserId: string,
  chatbotId: string,
  message: string,
) => {
  try {
    await Conversation.create({ endUserId, chatbotId, message });
  } catch (err) {
    throw new Error("Error creating conversation");
  }
};

export const getAllConversations = async (chatbotId: string) => {
  try {
    return await Conversation.findAll({
      where: { chatbotId },
      include: [EndUser],
    });
  } catch (err) {
    throw new Error("Error fetching conversations");
  }
};

export const getConversation = async (conversationId: string) => {
  try {
    return await Conversation.findByPk(conversationId);
  } catch (error) {
    throw new Error("Error fetching conversation");
  }
};

export const updateConversation = async (
  conversationId: string,
  message: string,
) => {
  try {
    const conversation = await Conversation.findByPk(conversationId);
    if (conversation != null) {
      conversation.message = message;
      await conversation.save();
    }
  } catch (err) {
    throw new Error("Error updating conversation");
  }
};

export const deleteConversation = async (conversationId: string) => {
  try {
    await Conversation.destroy({ where: { id: conversationId } });
  } catch (err) {
    throw new Error("Error deleting conversation");
  }
};
