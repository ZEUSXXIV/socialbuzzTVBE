var express = require("express");
var router = express.Router();

var monitorApi = require("../api/monitorAPI");

router.post("/login", monitorApi.MonitorLogin);
router.post("/fetchmonitordetails", monitorApi.FetchMonitorDetails);
router.get("/fetchmedia", monitorApi.FetchMedia);

module.exports = router;
