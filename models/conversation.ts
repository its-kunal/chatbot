import sequelize from ".";
import { Model, DataTypes } from "sequelize";
import Chatbot from "./chatbot";
import EndUser from "./enduser";
import User from "./user";

class Conversation extends Model {
  message?: string;
  static associate(models: { User?: User; Chatbot: any; Conversation?: typeof Conversation; EndUser: any; }) {
    Conversation.belongsTo(models.Chatbot, {
      foreignKey: { name: "chatbotId", allowNull: false },
    });
    Conversation.belongsTo(models.EndUser, {
      foreignKey: { name: "endUserId", allowNull: false },
    });
  }
}

Conversation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize }
);
// Conversation.belongsTo(Chatbot, {
//   foreignKey: { name: "chatbotId", allowNull: false },
// });
// Conversation.belongsTo(EndUser, {
//   foreignKey: { name: "endUserId", allowNull: false },
// });
Conversation.sync({ force: true });

export default Conversation;
