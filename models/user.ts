import { Model, DataTypes } from "sequelize";
import sequelize from "./index";
import { hashSync } from "bcrypt";
import Chatbot from "./chatbot";
import Conversation from "./conversation";
import EndUser from "./enduser";

class User extends Model {
  password!: string;
  username!: string;
  email!: string;
  static associate(models: { User?: typeof User; Chatbot: any; Conversation?: Conversation; EndUser?: EndUser; }){
    User.hasMany(models.Chatbot, { foreignKey: "chatbotId" });
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
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
  {
    sequelize,
  }
);

const hashPassword = async (user: User) => {
  if (user.changed("password")) {
    user.password = hashSync(user.password, 10);
  }
};

User.beforeSave(hashPassword);
User.hasMany(Chatbot, { foreignKey: "chatbotId" }); 
User.sync({ force: true });
export default User;
