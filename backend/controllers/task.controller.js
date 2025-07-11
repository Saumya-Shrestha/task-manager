import db from "../models/index.js";

const Tasks = db.tasks;
const Op = db.Sequelize.Op;

// Create and Save a new Task
export const create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Title can not be empty!",
    });
    return;
  }
  // Create a Task
  const task = {
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed ? req.body.completed : false,
  };
  // Save task in the database
  Tasks.create(task)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the task.",
      });
    });
};

// Retrieve all Tasks from the database
export const findAll = (req, res) => {
  const title = req.query?.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
  Tasks.findAll({ where: condition, order: [["id", "ASC"]] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tasks.",
      });
    });
};

// Find a single Task with an id
export const findOne = (req, res) => {
  const id = req.params.id;
  Tasks.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Task with id = ${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Task with id=" + id,
      });
    });
};

// Update a Task by the id in the request
export const update = (req, res) => {
  const id = req.params.id;
  Tasks.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Task was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Task with id=${id}. Maybe Task was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Task with id=" + id,
      });
    });
};

// Delete a Task with the specified id in the request
export const deleteTask = (req, res) => {
  const id = req.params.id;
  Tasks.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Task was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Task with id=${id}. Maybe Task was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Task with id=" + id,
      });
    });
};

// Delete all Tasks from the database
export const deleteAll = (req, res) => {
  Tasks.destroy({
    where: {},
    truncate: false,
  }).then((nums) => {
    res
      .send({
        message: `${nums} Tasks were deleted successfully!})`,
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tasks.",
        });
      });
  });
};

// Find all completed Tasks
export const findAllCompleted = (req, res) => {
  Tasks.findAll({ where: { completed: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Tasks.",
      });
    });
};
