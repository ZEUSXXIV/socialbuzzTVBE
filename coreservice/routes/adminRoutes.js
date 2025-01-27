var express = require("express");
var router = express.Router();

var adminApi = require("../api/adminAPI");

router.post("/savesystemuser", adminApi.SaveSystemUser);
router.post("/savemedia", adminApi.SaveMedia);
router.post("/saveplaylist", adminApi.SavePlaylist);
router.post("/saveschedule", adminApi.SaveSchedule);
router.post("/savemonitor", adminApi.SaveMonitor);
router.get("/componentlist", adminApi.GetAdminComponents);
router.post("/deletecomponentlist", adminApi.DeleteAdminComponents);
router.post(
  "/validatedeletecomponentlist",
  adminApi.ValidateDeleteAdminComponents
);
router.post("/componentdetails", adminApi.GetAdminComponentsDetails);
router.post("/updateallmonitors", adminApi.UpdateAllMonitors);

module.exports = router;
