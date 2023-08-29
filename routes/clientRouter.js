const router = require("express").Router();
const clientCtrl = require("../controllers/clientCtrl");
const requireAuth = require('../middleware/requireAuth')


// router.use(requireAuth)

router.get("/getsingle/:id", clientCtrl.getsingle);


router.delete("/delete/:id", clientCtrl.deleteClient);

router.post("/create", clientCtrl.createClient);

router.put("/minus/:id", clientCtrl.minusAmount);

router.put("/plus/:id", clientCtrl.plusAmount);
router.put("/update/:id", clientCtrl.updateClient);

module.exports = router;