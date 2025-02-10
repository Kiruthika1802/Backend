const Tasks = require("../../models/tasks");
const TaskServices = require("../../services/TaskServices");

class TaskController {
    async AddTask(req, res) {
        console.log("Incoming request body:", req.body);

        const { title, desc, date, time, prio } = req.body;

        if (!title || !date || !time || !prio) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        try {
            const createtask = await TaskServices.CreateTask({
                title: title,
                desc: desc,
                date: date,
                time: time,
                priority: prio,
                status: "pending"
            });

            res.status(201).json({ message: 'Task Created successfully', data: createtask });
        } catch (error) {
            console.error('Error creating task:', error);
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    }
    async GetTask(req, res) {
        try {
            const tasks = await Tasks.find();
            if (tasks) {
                res.status(200).send({ message: 'Tasks Found', data: tasks });
            }
            else {
                res.status(404).send({ message: 'Tasks Not Found', data: [] });
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    }
    async UpdateTask(req, res) {
        try {
            console.log("Incoming request body:", req.body);
            // {
            //     "title": "Kiruthika",
            //     "updateobj": {
            //         "title": "hi",
            //         "desc": "sd@gmail.com",
            //         "date": "2025-06-06",
            //         "time": "14:00",
            //         "priority": "low"
            //     }
            // }
            const { title, updateobj } = req.body;

            const task = await Tasks.findOne({ title: title });

            const updatetask = await Tasks.findByIdAndUpdate(
                task._id,
                { $set: updateobj },
                { new: true }
            );

            if (!updatetask) {
                return res.status(400).json({
                    message: 'Failed to update task'
                });
            }

            return res.status(200).json({
                message: 'Task updated successfully',
                data: updatetask
            });
        } catch (error) {
            console.error('Error updating task:', error);
            return res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            });
        }
    }
    async DeleteTask(req, res) {
        try {
            console.log("Incoming request body:", req.body);
            const { title } = req.body;

            const task = await Tasks.findOne({ title: title });

            const deletedTask = await Tasks.findByIdAndDelete(task._id);

            if (!deletedTask) {
                return res.status(400).json({
                    message: 'Failed to delete task'
                });
            }

            return res.status(200).json({
                message: 'Task deleted successfully',
                data: deletedTask
            });
        } catch (error) {
            console.error('Error deleting task:', error);
            return res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            });
        }
    }
    async UpdateStatus(req, res) {
        try {
            console.log("Incoming request body:", req.body);
            const { title, status } = req.body;

            const task = await Tasks.findOne({ title: title });

            const updatetask = await Tasks.findByIdAndUpdate(
                task._id,
                { status: status },
                { new: true }
            );

            if (!updatetask) {
                return res.status(400).json({
                    message: 'Failed to update task'
                });
            }

            return res.status(200).json({
                message: 'Task updated successfully',
                data: updatetask
            });
        } catch (error) {
            console.error('Error updating task:', error);
            return res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            });
        }
    }
}
module.exports = new TaskController();
