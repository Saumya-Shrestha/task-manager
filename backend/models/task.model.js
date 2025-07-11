const defineTaskModel = (sequelize, Sequelize) => {
  const Task = sequelize.define("task", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    completed: {
      type: Sequelize.BOOLEAN,
    },
  });
  return Task;
};

export default defineTaskModel;
