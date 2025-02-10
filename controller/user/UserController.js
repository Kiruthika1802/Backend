const Details = require("../../models/details");
const Tasks = require("../../models/tasks");
const UserServices = require("../../services/UserServices");

class UserController {
    async AddDetails(req, res) {
        console.log("Incoming request body:", req.body);

        const { Username, Email, Password } = req.body;

        if (!Username || !Email || !Password) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        try {
            const checkuser = await UserServices.CheckUser(Username, Email);
            if (checkuser) {
                return res.status(409).json({ message: 'User Already Exists. Please Login' });
            }

            const createuser = await UserServices.CreateUser({
                Username: Username,
                Email: Email,
                Password: Password,
            });

            res.status(201).json({ message: 'User Created successfully', data: createuser });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    }
    async Validate(req, res) {
        console.log("Incoming request body:", req.body);

        const { Email, Password } = req.body;

        const validateuser = await UserServices.ValidateUser(Email, Password);
        if (validateuser) {
            res.status(200).send({ message: 'User Exists', data: validateuser });
        }
        else {
            res.status(401).send({ message: 'User Not Found', data: [] });

        }
    }

    async GetDetails(req, res) {
        try {
            console.log("Incoming request body:", req.body);

            const { Email } = req.body;
            const validateuser = await Details.findOne({ Email: Email });
            if (validateuser) {
                const userData = {
                    Username: validateuser.Username,
                    Email: validateuser.Email,
                    Password: validateuser.Password,
                    ProfileImage: validateuser.ProfileImage
                }
                res.status(200).send({ message: 'User Exists', data: userData });
                console.log("Incoming request body:", userData.Username);

            }
            else {
                res.status(401).send({ message: 'User Not Found', data: [] });

            }

        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    async UpdateName(req, res) {
        try {
            console.log("Incoming request body:", req.body);
            const { Username, Email } = req.body;

            const validateuser = await UserServices.CheckUserByEmail(Email);

            if (!validateuser) {
                return res.status(401).json({
                    message: 'UnAuthorized',
                    data: []
                });
            }

            const updateuser = await UserServices.UpdateUser({
                Email: Email,
                updateobj: {
                    Username: Username
                }
            });

            if (updateuser) {
                return res.status(200).json({
                    message: 'User Updated Successfully',
                    data: updateuser
                });
            } else {
                return res.status(400).json({
                    message: 'User Update Failed',
                    data: []
                });
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            return res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            });
        }
    }
    async UpdatePassword(req, res) {
        try {
            console.log("Incoming request body:", req.body);
            const { Password, Email, ConfPassword} = req.body;

            const validateuser = await UserServices.ValidateUser(Email, ConfPassword);

            if (!validateuser) {
                return res.status(401).json({
                    message: 'UnAuthorized',
                    data: []
                });
            }

            const updateuser = await UserServices.UpdateUser({
                Email: Email,
                updateobj: {
                    Password: Password
                }
            });

            if (updateuser) {
                return res.status(200).json({
                    message: 'User Updated Successfully',
                    data: updateuser
                });
            } else {
                return res.status(400).json({
                    message: 'User Update Failed',
                    data: []
                });
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            return res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            });
        }
    }
    
}
module.exports = new UserController();
