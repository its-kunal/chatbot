import Chatbot from "../models/chatbot";

export const createChatbot = async (
  userId: string,
  name: string,
  defaultMessage: string,
  description?: string,
) => {
  try {
    if (description != undefined)
      await Chatbot.create({ userId, name, description, defaultMessage });
    else await Chatbot.create({ userId, name, defaultMessage });
  } catch (err) {
    throw new Error("Error creating chatbot");
  }
};

export const getChatbots = async (userId: string) => {
  try {
    return await Chatbot.findAll({ where: { userId } });
  } catch (err) {
    throw new Error("Error fetching chatbots");
  }
};

export const getChatbot = async (chatbotId: string) => {
  try {
    return await Chatbot.findByPk(chatbotId);
  } catch (err) {
    throw new Error("Error fetching chatbot");
  }
};

export const updateChatbot = async (
  chatbotId: string,
  name?: string,
  defaultMessage?: string,
  description?: string,
) => {
  try {
    const chatbot = await Chatbot.findByPk(chatbotId);
    if (chatbot != null) {
      if (name != undefined) chatbot.name = name;
      if (defaultMessage != undefined) chatbot.defaultMessage = defaultMessage;
      if (description != undefined) chatbot.description = description;
      await chatbot.save();
    }
  } catch (err) {
    throw new Error("Error updating chatbot");
  }
};

export const deleteChatbot = async (chatbotId: string) => {
  try {
    await Chatbot.destroy({ where: { id: chatbotId } });
  } catch (err) {
    throw new Error("Error deleting chatbot");
  }
};
