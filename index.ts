import express from "express";
import User from "./models/user";
import userRouter from "./routes/users";
import chatbotRouter from "./routes/chatbots";
import conversationsRouter from "./routes/conversations";
import endUserRouter from "./routes/endusers";
import sequelize from "./models"


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/users", userRouter);
app.use("/chatbots", chatbotRouter);
app.use("/conversations", conversationsRouter);
app.use("/endusers", endUserRouter);

app.get("/", async (req, res) => {
  try {
    const users = await User.findAll();

    res.send(users);
  } catch (err) {
    console.log(err);
    return res.send("Error");
  }
});

app.post("/", async (req, res) => {
  try {
    await User.create({
      username: "kunal112",
      email: "kunal112@gmail",
      password: "kunal112",
    });
    res.send("Created user");
  } catch (err) {
    console.log(err);
    return res.send("Error");
  }
});

sequelize.sync().then(async (v) => {
  try {
    await sequelize.authenticate();
    console.log("Connection Established");
    app.listen(3000);
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
});
