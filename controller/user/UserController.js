const Details = require("../../models/details");  // Fix import name
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
    async GetDetailsById(req, res) {
        try {
            const GetData = await DetailModel.findById(req.params.id);
            res.status(200).json(GetData);

        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    async UpdateDetailsById(req, res) {
        try {
            const { id } = req.params;
            const { Price } = req.body;
            const updatedDetails = await DetailModel.findByIdAndUpdate(id, { Price }, { new: true });
            if (!updatedDetails) {
                return res.status(404).json({ message: 'Details not found' });
            }
            res.status(200).json({ message: 'Details updated successfully', Details: updatedDetails });

        } catch (error) {
            console.error('Error inserting activity:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    async DeleteDetailsById(req, res) {
        try {
            const { id } = req.params;
            const deletedDetails = await DetailModel.findByIdAndDelete(id);
            if (!deletedDetails) {
                return res.status(404).json({ message: 'Details not found' });
            }
            res.status(200).json({ message: 'Details deleted successfully' });

        } catch (error) {
            console.error('Error inserting activity:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
module.exports = new UserController(); 