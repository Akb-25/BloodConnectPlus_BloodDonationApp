const admin = require("../config/firebase");

exports.registerUser = async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await admin.auth().createUser({ email, password  });
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        res.status(400).json({ message: "Error registering user", error });
    }
}

exports.loginUser = async( req, res )=> {
    res.status(200).json({ message: "User logged in successfully" });
}