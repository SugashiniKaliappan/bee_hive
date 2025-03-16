import { Ward } from "../models/ward.model.js"; // ✅ Ensure correct import

const createWard = async (req, res) => {
    try {
        const ward = new Ward(req.body);
        await ward.save();
        res.status(201).json(ward);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllWards = async (req, res) => {
    try {
        const wards = await Ward.find();
        res.status(200).json(wards);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Export functions correctly
export { createWard, getAllWards };
