import sequelize from ".";
import { Model, DataTypes } from "sequelize";
import { hashSync } from "bcrypt";
import Conversation from "./conversation";
import Chatbot from "./chatbot";
import User from "./user";

class EndUser extends Model {
  name!: string;
  email!: string;
  password!: string;
  static associate(models: { User?: User; Chatbot?: Chatbot; Conversation: any; EndUser?: typeof EndUser; }) {
    EndUser.hasMany(models.Conversation, {
      foreignKey: "endUserId",
    });
  }
}

EndUser.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize }
);

const hashPassword = async (user: EndUser) => {
  if (user.changed("password")) {
    user.password = hashSync(user.password, 10);
  }
};

EndUser.beforeSave(hashPassword);



EndUser.sync({ force: true });

export default EndUser;
