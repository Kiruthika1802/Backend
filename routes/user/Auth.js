const express = require('express');
const UserController = require('../../controller/user/UserController');
const router = express.Router();

router.post('/AddDetails', UserController.AddDetails);
router.post('/Validate', UserController.Validate);

router.post('/GetDetails', UserController.GetDetails);
router.get('/GetDetails/:id', UserController.GetDetailsById);
router.patch('/UpdateDetails/:id', UserController.UpdateDetailsById);
router.delete('/DeleteDetails/:id', UserController.DeleteDetailsById);

module.exports = router;
