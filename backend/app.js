import express from "express";
import initializeCors from "./middleware/cors.middleware.js";
import db from "./models/index.js";
import taskRoutes from "./routes/task.routes.js";
import env from "dotenv";

const PORT = process.env.PORT || 5000;
const app = express();
env.config();

db.sequelize
  .sync()
  .then(() => {
    console.log("Re-sync db with tasks.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.use(initializeCors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to your task manager." });
});

taskRoutes(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
