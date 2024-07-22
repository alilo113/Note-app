const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
        unique: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    }
});

// Regular function for pre-save middleware
userSchema.pre('save', async function(next) {
    if (!this.isModified('Password')) return next(); // Only hash password if modified

    try {
        const salt = await bcrypt.genSalt(10);
        this.Password = await bcrypt.hash(this.Password, salt);
        next(); // Proceed with saving the document
    } catch (error) {
        next(error); // Pass errors to the next middleware
    }
});

// Define comparePassword as a method
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.Password);
}

const User = mongoose.model("User", userSchema);
module.exports = User;