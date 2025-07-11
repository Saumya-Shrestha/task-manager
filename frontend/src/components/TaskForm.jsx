import React, { useEffect, useState } from "react";
import { createTask, updateTask } from "../api/tasks";
import { Box, Button, TextField, Typography, Paper, Fade, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import "./TaskForm.css";

const TaskForm = ({ taskToEdit, onTaskSaved, showNotification, onCancel }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    completed: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setTask(taskToEdit || { title: "", description: "", completed: false });
  }, [taskToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (task.id) {
        await updateTask(task.id, task);
        showNotification("success", "Task updated successfully!");
      } else {
        await createTask(task);
        showNotification("success", "Task created successfully!");
      }
      onTaskSaved();
      setTask({ title: "", description: "", completed: false });
    } catch (error) {
      console.error("API Error:", error);
      showNotification("error", task.id ? "Failed to update task" : "Failed to create task");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Fade in={true}>
      <Paper
        elevation={0}
        className="task-form-container"
      >
        <Box className="form-header">
          <Box className="form-title-section">
            {task.id ? <EditIcon className="form-icon" /> : <AddIcon className="form-icon" />}
            <Typography
              variant="h5"
              className="task-form-title"
            >
              {task.id ? "Edit Task" : "Create New Task"}
            </Typography>
          </Box>
          {onCancel && (
            <IconButton
              onClick={onCancel}
              className="close-button"
              size="small"
            >
              <CloseIcon />
            </IconButton>
          )}
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          className="task-form"
        >
          <TextField
            label="Task Title"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            fullWidth
            variant="outlined"
            className="form-field"
            placeholder="Enter a descriptive title for your task"
          />

          <TextField
            label="Description"
            name="description"
            value={task.description}
            onChange={handleChange}
            multiline
            rows={4}
            disabled={isSubmitting}
            fullWidth
            variant="outlined"
            className="form-field"
            placeholder="Add more details about your task (optional)"
          />

          <Box className="form-actions">
            {task.id && onCancel && (
              <Button
                type="button"
                variant="outlined"
                onClick={onCancel}
                disabled={isSubmitting}
                className="cancel-button"
                startIcon={<CloseIcon />}
              >
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting || !task.title.trim()}
              className="submit-button"
              startIcon={isSubmitting ? null : <SaveIcon />}
            >
              {isSubmitting ? "Saving..." : task.id ? "Update Task" : "Create Task"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Fade>
  );
};

export default TaskForm;
