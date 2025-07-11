import express from "express";
import * as tasks from "../controllers/task.controller.js";

const router = express.Router();

// Create a new Task
router.post("/", tasks.create);

// Retrieve all Tasks
router.get("/", tasks.findAll);

// Retrieve all completed Tasks
router.get("/completed", tasks.findAllCompleted);

// Retrieve a single Task with id
router.get("/:id", tasks.findOne);

// Update a Task with id
router.put("/:id", tasks.update);

// Delete a Task with id
router.delete("/:id", tasks.deleteTask);

// Delete all Tasks
router.delete("/", tasks.deleteAll);

export default (app) => {
  app.use("/api/tasks", router);
};
