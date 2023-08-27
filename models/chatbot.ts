import sequelize from ".";
import { Model, DataTypes } from "sequelize";
import Conversation from "./conversation";
import User from "./user";
import EndUser from "./enduser";

class Chatbot extends Model {
  name?: string;
  description?: string;
  defaultMessage?: string;
  static associate(models: {
    User: any;
    Chatbot?: typeof Chatbot;
    Conversation: any;
    EndUser?: EndUser;
  }) {
    Chatbot.belongsTo(models.User, {
      foreignKey: { name: "userId", allowNull: false },
    });
    Chatbot.hasMany(models.Conversation, {
      foreignKey: {
        name: "chatbotId",
        allowNull: false,
      },
    });
  }
}

Chatbot.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    defaultMessage: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { sequelize }
);

Chatbot.sync({ force: true });

export default Chatbot;
