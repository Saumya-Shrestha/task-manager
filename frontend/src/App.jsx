import React, { useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { Container, Snackbar, Alert, Typography, CssBaseline, Box, Paper, Fab, Zoom } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./App.css";

const App = () => {
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [notification, setNotification] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const showNotification = (type, message) => {
    setNotification({ type, message });
  };

  const handleTaskSaved = () => {
    setTaskToEdit(null);
    setShowForm(false);
    setRefreshTrigger((prev) => prev + 1);
    showNotification("success", "Task saved successfully!");
  };

  const handleEdit = (task) => {
    setTaskToEdit(task);
    setShowForm(true);
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  return (
    <>
      <CssBaseline />
      <Box className="app-background">
        <Container
          maxWidth="lg"
          className="app-container"
        >
          {/* Header Section */}
          <Paper
            elevation={0}
            className="header-section"
          >
            <Box className="header-content">
              <CheckCircleIcon className="header-icon" />
              <Typography
                variant="h3"
                component="h1"
                className="app-title"
              >
                Task Manager
              </Typography>
              <Typography
                variant="h6"
                className="app-subtitle"
              >
                Stay organized and get things done
              </Typography>
            </Box>
          </Paper>

          {/* Main Content */}
          <Box className="main-content">
            <Zoom in={showForm}>
              <Box className={`form-section ${showForm ? "visible" : "hidden"}`}>
                <TaskForm
                  taskToEdit={taskToEdit}
                  onTaskSaved={handleTaskSaved}
                  showNotification={showNotification}
                  onCancel={() => {
                    setShowForm(false);
                    setTaskToEdit(null);
                  }}
                />
              </Box>
            </Zoom>

            <TaskList
              refreshTrigger={refreshTrigger}
              onEdit={handleEdit}
              showNotification={showNotification}
            />
          </Box>

          {/* Floating Action Button */}
          <Fab
            color="primary"
            className="fab-button"
            onClick={() => setShowForm(true)}
            sx={{ display: showForm ? "none" : "flex" }}
          >
            <AddIcon />
          </Fab>

          {/* Notification */}
          <Snackbar
            open={!!notification}
            autoHideDuration={3000}
            onClose={handleCloseNotification}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              onClose={handleCloseNotification}
              severity={notification?.type}
              className="notification-alert"
              variant="filled"
            >
              {notification?.message}
            </Alert>
          </Snackbar>
        </Container>
      </Box>
    </>
  );
};

export default App;
