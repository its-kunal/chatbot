import { Sequelize } from "sequelize";
import User from "./user";
import Chatbot from "./chatbot";
import Conversation from "./conversation"; 
import EndUser from "./enduser";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "../db/mydb.db",
});

const db: any = {
  User,
  Chatbot,
  Conversation,
  EndUser,
};

function initDb() {
  User.associate(db);
  Chatbot.associate(db);
  Conversation.associate(db);
  EndUser.associate(db);
}

initDb();

export default sequelize;
