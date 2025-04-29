const OC = require('../models/ocModel');

const createOC = async (req, res) => {
    const { fullname, nickname, age, backstory, personality, likes, dislikes, imageUrl } = req.body;

    if (!fullname) {
    res.status(400);
    throw new Error('Fullname is required');
    }

    try {
    const oc = await OC.create({
        user: req.user._id,
        fullname,
        nickname,
        age,
        backstory,
        personality,
        likes,
        dislikes,
        imageUrl
    });

    res.status(201).json(oc);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOCs = async (req, res) => {
    try {
        const ocs = await OC.find();
        res.status(200).json(ocs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOCById = async (req, res) => {
    const { id } = req.params;

    try {
        const oc = await OC.findById(id);

        if (!oc) {
        return res.status(404).json({ message: 'OC not found' });
        }

        res.status(200).json(oc);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOCByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const ocs = await OC.find({ user: userId });

        if (!ocs || ocs.length === 0) {
            return res.status(404).json({ message: 'No OCs found for this user' });
        }

        res.status(200).json(ocs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateOC = async (req, res) => {
    const { id } = req.params;
    const { fullname, nickname, age, backstory, personality, likes, dislikes, imageUrl } = req.body;

    try {
        const oc = await OC.findById(id);

        if (!oc) {
        return res.status(404).json({ message: 'OC not found' });
        }

        // Update fields
        oc.fullname = fullname || oc.fullname;
        oc.nickname = nickname || oc.nickname;
        oc.age = age || oc.age;
        oc.backstory = backstory || oc.backstory;
        oc.personality = personality || oc.personality;
        oc.likes = likes || oc.likes;
        oc.dislikes = dislikes || oc.dislikes;
        oc.imageUrl = imageUrl || oc.imageUrl;

        const updatedOC = await oc.save();

        res.status(200).json(updatedOC);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteOC = async (req, res) => {
    const { id } = req.params;

    try {
        const oc = await OC.findById(id);

        if (!oc) {
        return res.status(404).json({ message: 'OC not found' });
        }

        // Use findByIdAndDelete instead of remove
        await OC.findByIdAndDelete(id);

        res.status(200).json({ message: 'OC removed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Export
module.exports = { createOC, getOCs, getOCById, getOCByUserId, updateOC, deleteOC };
