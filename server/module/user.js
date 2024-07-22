const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        unique: true
    }
})

userSchema.pre("save", async function (next) {
    try {
        if (this.isModified("password")) { 
            const salt = await bcrypt.genSalt(10); 
            this.password = await bcrypt.hash(this.password, salt);
        }
        next(); 
    } catch (error) {
        next(error);
    }
});

userSchema.comparePassword = async () => {
    return await bcrypt.compare(password, this.password)
}

const user = mongoose.model("user", userSchema)
module.exports = user