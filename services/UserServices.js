const Details = require("../models/details");

class UserService {

    async CheckUser(username, email) {
        const user = await Details.findOne({ Username: username, Email: email });
        return user;
    }

    async CheckUserById(id) {
        const user = await Details.findOne({ _id: id });
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
            const existingUser = await Details.findById(userData.id);
            if (!existingUser) {
                throw new Error(`User with ID ${userData.id} not exists.`);
            }

            const updatedUser = await Details.findByIdAndUpdate(
                userData.id,
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