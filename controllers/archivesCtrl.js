const Archives = require('../models/archivesModel');


const archivesCtrl = {
    getArchives: async (req, res) => {
        try {
            const archive = await Archives.find();
            const reverseArchive = archive.reverse()
            res.send(reverseArchive);
            res.send(archive);
        } catch (error) {
            console.error(error);
            res.status(500).send("Error retrieving users");
        }
    },
    createArichives: async (req, res) => {
        try {
            const { archive } = req.body;

            console.log(archive)

            const newclient = new Archives({
                archive: archive
            });

            await newclient.save();
            res.status(201).send("client created");
        } catch (error) {
            console.error(error);
            res.status(500).send("Error creating client");
        }
    },
    getsingle: async (req, res) => {
        try {
            const archiveID = req.params.id;

            if (!archiveID) {
                return res.status(400).send("Invalid client ID");
            }

            const archive = await Archives.findById(archiveID);

            if (!archive) {
                return res.status(404).send("client not found");
            }

            res.status(200).send(archive);
        } catch (error) {
            console.error(error);
            res.status(500).send("Error retrieving client");
        }
    },
    deleteArchive: async (req, res) => {
        try {
            const archiveId = req.params.id;

            if (!archiveId) {
                return res.status(400).send("Invalid archive ID");
            }

            const archive = await Archives.findByIdAndDelete(archiveId);

            if (!archive) {
                return res.status(404).send("archive not found");
            }

            res.status(200).send(`archive deleted: ${archive}`);
        } catch (error) {
            console.error(error);
            res.status(500).send("Error deleting archive");
        }
    },

}

module.exports = archivesCtrl;