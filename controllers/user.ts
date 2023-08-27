import User from "../models/user";

export const createUser = async (
  username: string,
  email: string,
  password: string,
) => {
  try {
    await User.create({ username, email, password });
  } catch (err) {
    throw new Error("Error creating user, Try with another username");
  }
};

export const allUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (err) {
    throw new Error("Error fetching users");
  }
};

export const getUser = async (id: number) => {
  try {
    const user = await User.findByPk(id);
    return user;
  } catch (err) {
    throw new Error("No User found");
  }
};

export const updateUser = async (
  id: number,
  username: string,
  password: string,
  email: string,
) => {
  try {
    const user = await User.findByPk(id);
    if (user != null) {
      user.username = username;
      user.password = password;
      user.email = email;
      await user.save();
    }
    return user;
  } catch (err) {
    throw new Error("Error updating user");
  }
};

export const deleteUser = async (id: number) => {
  try {
    User.destroy({ where: { id: id } });
  } catch (err) {
    throw new Error("Error deleting user");
  }
};
