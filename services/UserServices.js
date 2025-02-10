const Details = require("../models/details");

class UserService {

    async CheckUser(username, email) {
        const user = await Details.findOne({ Username: username, Email: email });
        return user;
    }

    async CheckUserByEmail(email) {
        const user = await Details.findOne({ Email: email });
        return user;
    }

    async ValidateUser(email, password) {
        const user = await Details.findOne({ Email: email, Password: password });
        return user;
    }

    async CreateUser(userData) {
        try {
            const existingUser = await Details.findOne({ Email: userData.Email });
            if (existingUser) {
                throw new Error(`User with Email number ${userData.Email} already exists.`);
            }
            const newUser = new Details(userData);
            const savedUser = await newUser.save();
            return savedUser;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    async UpdateUser(userData) {
        try {
            const existingUser = await Details.findOne({ Email: userData.Email });
            if (!existingUser) {
                throw new Error(`User with email ${userData.Email} does not exist.`);
            }

            const updatedUser = await Details.findOneAndUpdate(
                { Email: userData.Email },
                userData.updateobj,
                { new: true }
            );

            if (!updatedUser) {
                throw new Error('Failed to update user. Please try again.');
            }

            return updatedUser;
        } catch (error) {
            console.error('Error updating user:', error.message);
            throw error;
        }
    }
}

module.exports = new UserService();