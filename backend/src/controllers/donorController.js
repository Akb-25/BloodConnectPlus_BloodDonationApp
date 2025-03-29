const admin = require("../config/firebase");

exports.getDonrs = async (req, res) => {
    const donors = await admin.firestore().collection("donors").get();
    res.json(donors);
};

exports.addDonor = async (req, res) => {
    const { name, bloodGroup, contact } = req.body;
    try{
        const addedDonor = await admin.firestore().collection("donors").add({
            name,
            bloodGroup,
            contact,
        });
        res.status(201).json({ message: "Donor added successfully", donorId: addedDonor.id });
    } catch (error) {
        res.status(400).json({ message: "Error adding donor", error });
    }
};