const Tasks = require("../models/tasks");

class TaskService {
    async CreateTask(taskData) {
        try {
            const newTask = new Tasks(taskData);
            const savedTask = await newTask.save();
            return savedTask;
        } catch (error) {
            console.error('Error creating task:', error);
            throw error;
        }
    }

}

module.exports = new TaskService();