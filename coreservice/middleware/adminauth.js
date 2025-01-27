var appLib = require("applib");
var uuid = appLib.UUID.prototype;
var databaseHelper = require("../helper/databasehelper");
var coreRequestModel = require("../models/coreServiceModel");
var settings = require("../common/settings").Settings;
var constant = require("../common/constant");

exports.AuthenticateRequestAdmin = async function (req, res, next) {
  var requestID = uuid.GetTimeBasedID();
  var logger = new appLib.Logger(req.originalUrl, requestID);

  logger.logInfo(`AuthenticateRequest invoked()!`);

  var functionContext = {
    logger: logger,
    res: res,
  };

  var apiContext = {
    requestID: requestID,
    userType: null,
    userRef: null,
    userID: null,
  };

  res.apiContext = apiContext;

  var validateRequest = new coreRequestModel.ValidateRequestAdmin(req);
  var validateResponse = new coreRequestModel.ValidateResponse(req);
  validateResponse.RequestID = requestID;

  if (!validateRequest.apiUri || !validateRequest.authorization) {
    functionContext.error = new coreRequestModel.ErrorModel(
      constant.ErrorMessage.Invalid_Request,
      constant.ErrorCode.Invalid_Request
    );
    logger.logInfo(
      `AuthenticaRFVTBVTteRequest() Error:: Invalid Request :: ${JSON.stringify(
        validateRequest
      )}`
    );

    validateResponse.Error = functionContext.error;
    appLib.SendHttpResponse(functionContext, validateResponse);
    return;
  }

  var basicAuth = new Buffer(
    settings.APP_KEY + ":" + settings.APP_SECRET
  ).toString("base64");

  if (validateRequest.authorization != basicAuth) {
    functionContext.error = new coreRequestModel.ErrorModel(
      constant.ErrorMessage.Invalid_Authentication,
      constant.ErrorCode.Invalid_Authentication
    );
    logger.logInfo(
      `AuthenticateRequest() Error:: Invalid Authentication :: ${JSON.stringify(
        validateRequest
      )}`
    );
    validateResponse.Error = functionContext.error;
    appLib.SendHttpResponse(functionContext, validateResponse);
    return;
  }
  try {
    let validateRequestResult = await databaseHelper.validateRequest(
      functionContext,
      validateRequest
    );
    apiContext.userType = validateRequestResult.UserType;
    apiContext.userRef = validateRequestResult.UserRef;
    apiContext.userID = validateRequestResult.UserID;

    res.apiContext = apiContext;
    next();
  } catch (errValidateRequest) {
    if (!errValidateRequest.ErrorMessage && !errValidateRequest.ErrorCode) {
      logger.logInfo(`AuthenticateRequest() :: Error :: ${errValidateRequest}`);
      functionContext.error = new coreRequestModel.ErrorModel(
        constant.ErrorMessage.ApplicationError,
        constant.ErrorCode.ApplicationError
      );
    }
    logger.logInfo(
      `AuthenticateRequest() :: Error :: ${JSON.stringify(errValidateRequest)}`
    );
    validateResponse.Error = functionContext.error;
    appLib.SendHttpResponse(functionContext, validateResponse);
  }
};
