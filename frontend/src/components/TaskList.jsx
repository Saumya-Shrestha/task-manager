import React, { useEffect, useState } from "react";
import { getTasks, deleteTask, updateTask } from "../api/tasks";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import "./TaskList.css";

const TaskList = ({ refreshTrigger, onEdit, showNotification }) => {
  const [tasks, setTasks] = useState([]);
  const [loadingTaskId, setLoadingTaskId] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error("API Error:", error);
        showNotification("error", "Failed to load tasks");
      }
    };
    fetchTasks();
  }, [refreshTrigger, showNotification]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    setLoadingTaskId(id);
    try {
      await deleteTask(id);
      showNotification("success", "Task deleted successfully");
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error("API Error:", error);
      showNotification("error", "Failed to delete task");
    } finally {
      setLoadingTaskId(null);
    }
  };

  const toggleCompleted = async (task) => {
    setLoadingTaskId(task.id);
    try {
      const updatedTask = { ...task, completed: !task.completed };
      await updateTask(task.id, updatedTask);
      setTasks((prev) => prev.map((t) => (t.id === task.id ? updatedTask : t)));
    } catch (error) {
      console.error("API Error:", error);
      showNotification("error", "Failed to update task status");
    } finally {
      setLoadingTaskId(null);
    }
  };

  return (
    <Box className="task-list-container">
      <Typography variant="h5" className="task-list-title">
        Your Tasks
      </Typography>

      {tasks.length === 0 ? (
        <Typography variant="body1" className="empty-state">
          No tasks found. Start by creating a new task!
        </Typography>
      ) : (
        <List className="task-list">
          {tasks.map((task) => (
            <ListItem
              key={task.id}
              className={`task-item ${
                task.completed ? "completed" : "pending"
              }`}
            >
              <ListItemText
                primary={task.title}
                secondary={task.description}
                sx={{ flex: 1 }}
              />

              <Box className="task-actions">
                <Button
                  variant="contained"
                  onClick={() => onEdit(task)}
                  disabled={loadingTaskId === task.id}
                  className="edit-button"
                >
                  Edit
                </Button>

                <Button
                  variant="contained"
                  onClick={() => toggleCompleted(task)}
                  disabled={loadingTaskId === task.id}
                  className={
                    task.completed
                      ? "toggle-button-pending"
                      : "toggle-button-completed"
                  }
                >
                  {task.completed ? "Pending" : "Complete"}
                </Button>

                <Button
                  variant="contained"
                  onClick={() => handleDelete(task.id)}
                  disabled={loadingTaskId === task.id}
                  className="delete-button"
                >
                  Delete
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default TaskList;
