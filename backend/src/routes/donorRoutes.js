const express = require('express');
const { getDonors, addDonor } = require('../controllers/donorController');

const router = express.Router();

router.get("/", getDonors);
router.post("/", addDonor);

module.exports = router;
