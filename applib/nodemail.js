//  var nodemailer = require('nodemailer')
// class MailModel 
// {
//     constructor(mailSettings)
//     {
//         this.username = mailSettings.Username;
//         this.password = mailSettings.Password;
//         this.cc = mailSettings.CC;
//         this.sendMail = function(functionContext,requestID,reqUrl,env,dataObject)
//         {
//           SendMail(functionContext,this.username,this.password,this.cc,requestID,reqUrl,env,dataObject);
//         };  
//   }
// }

// async function SendMail(functionContext,username,password,cc,requestID,reqUrl,env,dataObject) {

//   process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

//     var logger = functionContext.logger;

//     logger.logInfo(`SendMail() invoked`);

//   try {

//     var transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: username,
//         pass: password
//       }
//     });
  
//     var subject = `Error in Env : ${env} for  API URL : ${reqUrl} for Request ID : ${requestID}`;
    
//     var message = `Timestamp : ${functionContext.currentTs} \n Error : ${JSON.stringify(dataObject)}`;

//     var mailOptions = {
//       from: username,
//       to: username,
//       cc : JSON.parse(cc),
//       subject: subject,
//       text: message
//     };

//     transporter.sendMail(mailOptions, function (error, info) {

//       if (error) {
//         console.log("SendMail() Error : ", error);
        
//       }
//       else {
//         console.log('Reporting Email sent Successfully : ' + info.response);
        
//       }
//     });

//   } catch (SendErrorReportingEmailErr) {
//     console.log("==> SendMail() Exception  :", SendErrorReportingEmailErr)
  
//   }
// }


// module.exports.MailModel = MailModel;
