const express = require('express');
const UserController = require('../../controller/user/UserController');
const TaskController = require('../../controller/user/TaskController');
const router = express.Router();


router.post('/AddDetails', UserController.AddDetails); //user
router.post('/Validate', UserController.Validate);
router.post('/GetDetails', UserController.GetDetails);
router.patch('/UpdateName', UserController.UpdateName);
router.patch('/UpdatePassword', UserController.UpdatePassword);

router.post('/AddTask', TaskController.AddTask); //task
router.get('/GetTask', TaskController.GetTask);
router.patch('/UpdateTask', TaskController.UpdateTask);
router.delete('/DeleteTask', TaskController.DeleteTask);
router.patch('/UpdateStatus', TaskController.UpdateStatus);

module.exports = router;
