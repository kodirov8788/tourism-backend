const router = require("express").Router();
const archivesCtrl = require("../controllers/archivesCtrl");
const requireAuth = require('../middleware/requireAuth')


// router.use(requireAuth)

router.get("/get", archivesCtrl.getArchives);
router.get("/getsingle/:id", archivesCtrl.getsingle);
router.delete("/delete/:id", archivesCtrl.deleteArchive);
router.post("/create", archivesCtrl.createArichives);


module.exports = router;