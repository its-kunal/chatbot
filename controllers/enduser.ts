import EndUser from "../models/enduser";
import Conversation from "../models/conversation";

export const registerEndUser = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    return await EndUser.create({ name, email, password });
  } catch (error) {
    throw new Error("Error creating user");
  }
};

export const getEndUsers = async () => {
  try {
    return await EndUser.findAll();
  } catch (error) {
    throw new Error("Error fetching users");
  }
};

export const getEndUser = async (endUserId: string) => {
  try {
    return {
      ...(await EndUser.findByPk(endUserId)),
      conversations: [
        ...(await Conversation.findAll({ where: { endUserId } })),
      ],
    };
  } catch (error) {
    throw new Error("Error fetching user");
  }
};

export const updateEndUser = async (
  endUserId: string,
  name?: string,
  password?: string,
) => {
  try {
    const endUser = await EndUser.findByPk(endUserId);
    if (endUser != null) {
      if (name != undefined) endUser.name = name;
      if (password != undefined) endUser.password = password;
      await endUser.save();
    }
  } catch (err) {
    throw new Error("Error updating user");
  }
};

export const deleteEndUser = async (endUserId: string) => {
  try {
    await EndUser.destroy({ where: { id: endUserId } });
  } catch (err) {
    throw new Error("Error deleting user");
  }
};
